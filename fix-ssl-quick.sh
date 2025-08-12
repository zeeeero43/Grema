#!/bin/bash

# Schnelle SSL-Reparatur
# Behebt häufige SSL-Probleme automatisch

set -e

echo "🚨 SCHNELLE SSL-REPARATUR"
echo "========================="

# Domain abfragen
read -p "Ihre Domain eingeben: " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "❌ Domain ist erforderlich!"
    exit 1
fi

echo "🔧 Prüfe und repariere SSL für $DOMAIN..."

# Container-Status prüfen
if ! docker-compose ps | grep -q "Up"; then
    echo "🔄 Starte Container..."
    docker-compose up -d
    sleep 10
fi

# Firewall prüfen und öffnen
echo "🔥 Öffne Firewall-Ports..."
ufw allow 80 2>/dev/null || true
ufw allow 443 2>/dev/null || true

# SSL-Verzeichnisse sicherstellen
echo "📁 Bereite SSL-Verzeichnisse vor..."
sudo mkdir -p /etc/letsencrypt /var/www/certbot 2>/dev/null || true

# Nginx-Konfiguration für ACME-Challenge optimieren
echo "🔧 Optimiere Nginx-Konfiguration..."
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

    # HTTP Server
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN _;

        # ACME Challenge - immer erlauben
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
            try_files \$uri =404;
        }

        # App-Traffic weiterleiten
        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }
    }
}
EOF

echo "🔄 Nginx neu laden..."
docker-compose restart nginx
sleep 5

# SSL-Zertifikat mit mehreren Versuchen erstellen
echo "🔐 Erstelle SSL-Zertifikat..."

# Erst mit Staging testen (Rate-Limits vermeiden)
echo "🧪 Teste mit Staging-Zertifikat..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email admin@$DOMAIN \
    --agree-tos \
    --non-interactive \
    --staging \
    --force-renewal \
    -d $DOMAIN -d www.$DOMAIN

if [ $? -eq 0 ]; then
    echo "✅ Staging-Test erfolgreich"
    
    # Echtes Zertifikat erstellen
    echo "🔐 Erstelle echtes Zertifikat..."
    docker-compose run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email admin@$DOMAIN \
        --agree-tos \
        --non-interactive \
        --force-renewal \
        -d $DOMAIN -d www.$DOMAIN
    
    if [ $? -eq 0 ]; then
        echo "✅ SSL-Zertifikat erfolgreich erstellt!"
        
        # HTTPS-Konfiguration aktivieren
        echo "🔧 Aktiviere HTTPS..."
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

    # HTTP - Redirect zu HTTPS
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

    # HTTP für IP-Zugriff (Fallback)
    server {
        listen 80 default_server;
        server_name _;
        
        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }
    }

    # HTTPS Server
    server {
        listen 443 ssl http2;
        server_name $DOMAIN www.$DOMAIN;

        ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
        
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

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
        
        echo "🔄 Finale Nginx-Konfiguration laden..."
        docker-compose restart nginx
        sleep 10
        
        echo ""
        echo "🎉 SSL-REPARATUR ERFOLGREICH!"
        echo "============================="
        echo "✅ HTTPS: https://$DOMAIN"
        echo "✅ HTTPS: https://www.$DOMAIN"
        echo "✅ HTTP→HTTPS Weiterleitung aktiv"
        echo ""
        
        # Test
        echo "🧪 Teste HTTPS..."
        if curl -s -o /dev/null https://$DOMAIN; then
            echo "✅ HTTPS funktioniert!"
        else
            echo "⚠️ HTTPS-Test fehlgeschlagen - DNS-Propagation kann bis zu 24h dauern"
        fi
        
    else
        echo "❌ Echtes Zertifikat fehlgeschlagen - DNS oder Rate-Limit Problem"
        echo "Warten Sie 1 Stunde und versuchen Sie es erneut"
    fi
else
    echo "❌ Staging-Test fehlgeschlagen"
    echo "Prüfen Sie:"
    echo "- DNS A-Record: $DOMAIN → $(hostname -I | awk '{print $1}')"
    echo "- Firewall: Port 80 und 443 offen"
    echo "- Container laufen: docker-compose ps"
fi

echo ""
echo "📊 Finale Container-Status:"
docker-compose ps