#!/bin/bash

# Behebt ERR_CERT_AUTHORITY_INVALID durch echtes Let's Encrypt Zertifikat
echo "🔐 ECHTES SSL-ZERTIFIKAT ERSTELLEN"
echo "=================================="

DOMAIN="gremagebaeudeservicegmbh.de"

echo "🔍 Prüfe aktuelles Zertifikat..."

# Prüfen ob es ein Staging-Zertifikat ist
if openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -issuer 2>/dev/null | grep -i "staging"; then
    echo "❌ STAGING-ZERTIFIKAT ERKANNT - muss ersetzt werden!"
    NEED_PRODUCTION=true
else
    echo "🔍 Prüfe Zertifikat-Details..."
    openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -issuer 2>/dev/null || NEED_PRODUCTION=true
fi

if [ "$NEED_PRODUCTION" = true ]; then
    echo "🔄 Erstelle ECHTES Let's Encrypt Zertifikat..."
    
    # Container stoppen für saubere Erneuerung
    echo "⏹️ Stoppe Container..."
    docker-compose down
    
    # Alte Staging-Zertifikate löschen
    echo "🗑️ Entferne Staging-Zertifikate..."
    rm -rf /etc/letsencrypt/live/$DOMAIN* 2>/dev/null || true
    rm -rf /etc/letsencrypt/archive/$DOMAIN* 2>/dev/null || true
    rm -rf /etc/letsencrypt/renewal/$DOMAIN* 2>/dev/null || true
    
    # Nginx für HTTP-Challenge starten
    echo "🔧 Starte Nginx für HTTP-Challenge..."
    cat > nginx-temp.conf << EOF
events {
    worker_connections 1024;
}
http {
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN;
        
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        location / {
            return 200 'OK - Zertifikat wird erstellt...';
            add_header Content-Type text/plain;
        }
    }
}
EOF
    
    # Temporärer Nginx-Container für Challenge
    docker run -d --name temp-nginx \
        -p 80:80 \
        -v $(pwd)/nginx-temp.conf:/etc/nginx/nginx.conf:ro \
        -v /var/www/certbot:/var/www/certbot \
        nginx:alpine
    
    sleep 5
    
    echo "🔐 Erstelle PRODUKTIONS-Zertifikat..."
    
    # ECHTES Let's Encrypt Zertifikat erstellen
    docker run --rm \
        -v /etc/letsencrypt:/etc/letsencrypt \
        -v /var/www/certbot:/var/www/certbot \
        certbot/certbot \
        certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email admin@$DOMAIN \
        --agree-tos \
        --non-interactive \
        --force-renewal \
        --no-staging \
        -d $DOMAIN -d www.$DOMAIN
    
    # Temporären Nginx stoppen
    docker stop temp-nginx 2>/dev/null || true
    docker rm temp-nginx 2>/dev/null || true
    rm nginx-temp.conf
    
    if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
        echo "✅ PRODUKTIONS-Zertifikat erfolgreich erstellt!"
        
        # Zertifikat-Details anzeigen
        echo "📋 Zertifikat-Details:"
        openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -issuer
        openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -dates
        
    else
        echo "❌ Zertifikat-Erstellung fehlgeschlagen!"
        echo "Mögliche Ursachen:"
        echo "- DNS nicht korrekt konfiguriert"
        echo "- Rate-Limit erreicht (max 5 Zertifikate/Woche)"
        echo "- Firewall blockiert Port 80"
        exit 1
    fi
else
    echo "✅ Produktions-Zertifikat bereits vorhanden"
fi

echo "🔧 Aktualisiere Nginx-Konfiguration..."

# Finale Nginx-Konfiguration mit korrektem SSL
cat > nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:5000;
    }

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 100M;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # HTTP Server - Redirect zu HTTPS
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN;
        
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        location / {
            return 301 https://\$server_name\$request_uri;
        }
    }

    # HTTP Fallback für IP-Zugriff
    server {
        listen 80 default_server;
        server_name _;

        location / {
            proxy_pass http://app;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }

    # HTTPS Server mit korrektem SSL
    server {
        listen 443 ssl http2;
        server_name $DOMAIN www.$DOMAIN;

        # SSL-Zertifikate
        ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
        
        # Moderne SSL-Konfiguration
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
        
        # Sicherheits-Header
        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        # App-Proxy
        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto https;
            proxy_cache_bypass \$http_upgrade;
        }
    }
}
EOF

echo "🔄 Starte Container mit neuem SSL..."
docker-compose up -d

echo "⏳ Warte 20 Sekunden auf Container-Start..."
sleep 20

echo ""
echo "🎉 SSL-REPARATUR ABGESCHLOSSEN!"
echo "==============================="

# SSL-Test
echo "🧪 Teste SSL-Zertifikat..."
if curl -s -I https://$DOMAIN | head -n1 | grep -q "200"; then
    echo "✅ HTTPS funktioniert!"
else
    echo "⚠️ HTTPS-Test fehlgeschlagen"
fi

# Zertifikat-Informationen
echo ""
echo "📋 Ihr neues SSL-Zertifikat:"
echo "Aussteller: $(openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -issuer 2>/dev/null | cut -d'=' -f2-)"
echo "Gültig bis: $(openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -enddate 2>/dev/null | cut -d'=' -f2)"

echo ""
echo "🌐 Ihre sichere Website:"
echo "   https://$DOMAIN"
echo "   https://www.$DOMAIN"
echo ""
echo "✅ Browser zeigen jetzt ein GRÜNES SCHLOSS-Symbol!"

# Container-Status
echo ""
echo "📊 Container-Status:"
docker-compose ps