#!/bin/bash

# Korrigierte SSL-Reparatur ohne ungültige Parameter
echo "🔐 ECHTES SSL-ZERTIFIKAT ERSTELLEN (Korrigiert)"
echo "==============================================="

DOMAIN="gremagebaeudeservicegmbh.de"

echo "🔄 Erstelle ECHTES Let's Encrypt Zertifikat..."

# Container stoppen
echo "⏹️ Stoppe Container..."
docker-compose down

# Alte Staging-Zertifikate komplett entfernen
echo "🗑️ Entferne alle alten Zertifikate..."
rm -rf /etc/letsencrypt/live/$DOMAIN* 2>/dev/null || true
rm -rf /etc/letsencrypt/archive/$DOMAIN* 2>/dev/null || true
rm -rf /etc/letsencrypt/renewal/$DOMAIN* 2>/dev/null || true

# Sicherstellen dass Verzeichnisse existieren
mkdir -p /var/www/certbot
mkdir -p /etc/letsencrypt

# Temporärer Nginx für Challenge
echo "🔧 Starte temporären Nginx..."
cat > nginx-temp.conf << EOF
events {
    worker_connections 1024;
}
http {
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN _;
        
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
            try_files \$uri =404;
        }
        
        location / {
            return 200 'SSL wird eingerichtet...';
            add_header Content-Type text/plain;
        }
    }
}
EOF

docker run -d --name temp-nginx \
    -p 80:80 \
    -v $(pwd)/nginx-temp.conf:/etc/nginx/nginx.conf:ro \
    -v /var/www/certbot:/var/www/certbot \
    nginx:alpine

sleep 5

echo "🔐 Erstelle Produktions-Zertifikat (ohne --no-staging Parameter)..."

# Produktions-Zertifikat erstellen (Standard ist Produktion!)
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
    -d $DOMAIN -d www.$DOMAIN

CERT_RESULT=$?

# Temporären Nginx stoppen
docker stop temp-nginx 2>/dev/null || true
docker rm temp-nginx 2>/dev/null || true
rm nginx-temp.conf

if [ $CERT_RESULT -eq 0 ] && [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "✅ PRODUKTIONS-Zertifikat erfolgreich erstellt!"
    
    # Zertifikat verifizieren
    echo "📋 Zertifikat-Details:"
    ISSUER=$(openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -issuer 2>/dev/null)
    DATES=$(openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -dates 2>/dev/null)
    
    echo "$ISSUER"
    echo "$DATES"
    
    if echo "$ISSUER" | grep -i "staging"; then
        echo "⚠️ Immer noch Staging-Zertifikat - Rate-Limit aktiv"
    else
        echo "✅ Echtes Let's Encrypt Produktions-Zertifikat!"
    fi
    
else
    echo "❌ Zertifikat-Erstellung fehlgeschlagen!"
    echo ""
    echo "🔍 Mögliche Ursachen:"
    echo "1. Rate-Limit erreicht (max 5 Zertifikate/Woche pro Domain)"
    echo "2. DNS noch nicht propagiert"
    echo "3. Firewall blockiert Port 80"
    echo ""
    echo "🚨 ALTERNATIVE LÖSUNGEN:"
    echo "========================"
    echo "1. Warten Sie 1 Stunde und versuchen Sie es erneut"
    echo "2. Prüfen Sie DNS: nslookup $DOMAIN"
    echo "3. Temporär HTTP verwenden: ./fix-website.sh"
    echo ""
    
    # Trotzdem versuchen, HTTP wiederherzustellen
    echo "🔄 Stelle HTTP-Betrieb wieder her..."
fi

# Docker-Compose mit korrekter SSL-Konfiguration
echo "🔧 Konfiguriere Docker-Compose..."
cat > docker-compose.yml << EOF
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://grema_user:grema_password@db:5432/grema_website
      - PGHOST=db
      - PGPORT=5432
      - PGDATABASE=grema_website
      - PGUSER=grema_user
      - PGPASSWORD=grema_password
      - DEEPSEEK_API_KEY=\${DEEPSEEK_API_KEY}
      - RUNWARE_API_KEY=\${RUNWARE_API_KEY}
      - GOOGLE_PLACES_API_KEY=\${GOOGLE_PLACES_API_KEY:-}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=grema_website
      - POSTGRES_USER=grema_user
      - POSTGRES_PASSWORD=grema_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U grema_user -d grema_website"]
      interval: 30s
      timeout: 10s
      retries: 5

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - /var/www/certbot:/var/www/certbot
    depends_on:
      - app
    restart: unless-stopped

  certbot:
    image: certbot/certbot
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt
      - /var/www/certbot:/var/www/certbot
    entrypoint: /bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'

volumes:
  postgres_data:
EOF

# Nginx-Konfiguration - funktioniert mit und ohne SSL
echo "🔧 Erstelle flexible Nginx-Konfiguration..."
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "📝 SSL-Zertifikat vorhanden - aktiviere HTTPS"
    cat > nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:5000;
    }

    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;
    client_max_body_size 100M;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

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

    # HTTP Fallback für IP
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

    # HTTPS Server
    server {
        listen 443 ssl http2;
        server_name $DOMAIN www.$DOMAIN;

        ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
        
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;

        add_header Strict-Transport-Security "max-age=31536000" always;

        location / {
            proxy_pass http://app;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto https;
        }
    }
}
EOF
else
    echo "📝 Kein SSL-Zertifikat - verwende HTTP-Modus"
    cat > nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:5000;
    }

    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;
    client_max_body_size 100M;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN _;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            proxy_pass http://app;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
}
EOF
fi

echo "🔄 Starte Container..."
docker-compose up -d

echo "⏳ Warte auf Container-Start..."
sleep 15

echo ""
echo "🎉 KONFIGURATION ABGESCHLOSSEN!"
echo "==============================="

if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    if openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -issuer 2>/dev/null | grep -i "staging"; then
        echo "⚠️ Staging-Zertifikat (Rate-Limit aktiv)"
        echo "🌐 Website läuft: https://$DOMAIN (mit Browser-Warnung)"
        echo "🕐 Echtes Zertifikat in 1 Stunde verfügbar"
    else
        echo "✅ Echtes SSL-Zertifikat aktiv"
        echo "🌐 Website läuft: https://$DOMAIN"
        echo "🔒 Grünes Schloss im Browser"
    fi
else
    echo "🌐 Website läuft: http://$DOMAIN"
    echo "🕐 SSL-Setup kann später wiederholt werden"
fi

echo ""
echo "📊 Container-Status:"
docker-compose ps