#!/bin/bash

# Grema Website - Domain & SSL Setup Script
# Führen Sie diesen Script auf Ihrem VPS aus, nachdem Sie die Domain per DNS verbunden haben

set -e

echo "🌐 Grema Website - Domain & SSL Setup"
echo "====================================="

# Domain abfragen
read -p "🔹 Ihre Domain eingeben (z.B. grema-service.de): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "❌ Fehler: Domain ist erforderlich!"
    exit 1
fi

echo "🔹 Domain: $DOMAIN"
echo "🔹 Wird konfiguriert mit automatischem SSL-Zertifikat"

# Backup der aktuellen nginx.conf
cp nginx.conf nginx.conf.backup
echo "✅ Backup der nginx.conf erstellt"

# Neue nginx.conf mit Domain und SSL generieren
cat > nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:5000;
    }

    # Basic settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 100M;

    # MIME types
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Logs
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # HTTP Server - Redirect to HTTPS
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN;
        
        # Allow Let's Encrypt challenges
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        # Redirect all other HTTP traffic to HTTPS
        location / {
            return 301 https://\$server_name\$request_uri;
        }
    }

    # HTTPS Server
    server {
        listen 443 ssl http2;
        server_name $DOMAIN www.$DOMAIN;

        # SSL Configuration
        ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
        
        # SSL Security Settings
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # API routes
        location /api/ {
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

        # Static assets with caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            proxy_pass http://app;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Frontend routes
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

echo "✅ Nginx-Konfiguration für $DOMAIN erstellt"

# Docker Compose für SSL erweitern
cp docker-compose.yml docker-compose.yml.backup

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
      # Add your API keys here:
      - DEEPSEEK_API_KEY=\${DEEPSEEK_API_KEY}
      - RUNWARE_API_KEY=\${RUNWARE_API_KEY}
      # Optional: Google Places API for live reviews (fallback data available)
      - GOOGLE_PLACES_API_KEY=\${GOOGLE_PLACES_API_KEY:-}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=grema_website
      - POSTGRES_USER=grema_user
      - POSTGRES_PASSWORD=grema_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
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
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait; done;'"

volumes:
  postgres_data:
EOF

echo "✅ Docker-Compose für SSL konfiguriert"

# Container stoppen für Rekonfiguration
echo "🔄 Container werden neu gestartet..."
docker-compose down

# Certbot-Ordner erstellen
mkdir -p /var/www/certbot
mkdir -p /etc/letsencrypt

echo "🔄 Container mit neuer Konfiguration starten..."
docker-compose up -d

echo "⏳ Warte 10 Sekunden auf Container-Start..."
sleep 10

echo "🔐 SSL-Zertifikat wird erstellt..."

# SSL-Zertifikat erstellen
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --email admin@$DOMAIN \
    --agree-tos \
    --non-interactive

if [ $? -eq 0 ]; then
    echo "✅ SSL-Zertifikat erfolgreich erstellt!"
    
    # Container neu starten um SSL zu aktivieren
    echo "🔄 Container werden mit SSL neu gestartet..."
    docker-compose down
    docker-compose up -d
    
    echo ""
    echo "🎉 DOMAIN-SETUP ERFOLGREICH!"
    echo "=========================="
    echo "✅ Domain: https://$DOMAIN"
    echo "✅ SSL-Zertifikat installiert"
    echo "✅ Automatische HTTP->HTTPS Weiterleitung"
    echo "✅ Website ist live!"
    echo ""
    echo "🔧 Zertifikat erneuert sich automatisch alle 12 Stunden"
    echo ""
    echo "Testen Sie jetzt: https://$DOMAIN"
    
else
    echo "❌ SSL-Zertifikat konnte nicht erstellt werden!"
    echo "Prüfen Sie:"
    echo "- DNS A-Record zeigt auf diese Server-IP"
    echo "- Domain ist von außen erreichbar"
    echo "- Firewall erlaubt Port 80 und 443"
    echo ""
    echo "🔧 Fallback: Container laufen weiter mit HTTP"
fi

echo ""
echo "📊 Container-Status:"
docker-compose ps
EOF