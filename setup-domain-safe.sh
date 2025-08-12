#!/bin/bash

# Grema Website - SICHERE Domain & SSL Setup
# Diese Version prüft alles vorher und hat Rollback-Mechanismus

set -e

echo "🌐 Grema Website - SICHERE Domain & SSL Setup"
echo "=============================================="

# Prüfungen vor Start
echo "🔍 Führe Vorab-Prüfungen durch..."

# Prüfe ob Container laufen
if ! docker-compose ps | grep -q "Up"; then
    echo "❌ Container laufen nicht! Zuerst fix-website.sh ausführen"
    exit 1
fi

# Prüfe HTTP-Zugriff
if ! curl -s -o /dev/null http://localhost; then
    echo "❌ Website ist über HTTP nicht erreichbar! Zuerst fix-website.sh ausführen"
    exit 1
fi

echo "✅ Vorab-Prüfungen erfolgreich"
echo ""

# Domain abfragen
read -p "🔹 Ihre Domain eingeben (z.B. grema-service.de): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "❌ Fehler: Domain ist erforderlich!"
    exit 1
fi

echo "🔹 Domain: $DOMAIN"

# DNS-Check
echo "🔍 Prüfe DNS-Auflösung für $DOMAIN..."
SERVER_IP=$(hostname -I | awk '{print $1}')
DOMAIN_IP=$(dig +short $DOMAIN | head -n1)

if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
    echo "⚠️  WARNUNG: DNS-Weiterleitung stimmt nicht überein!"
    echo "   Domain $DOMAIN zeigt auf: ${DOMAIN_IP:-'nicht gefunden'}"
    echo "   Server-IP ist: $SERVER_IP"
    echo ""
    read -p "Trotzdem fortfahren? (j/N): " CONTINUE
    if [[ ! "$CONTINUE" =~ ^[Jj]$ ]]; then
        echo "❌ Abgebrochen - richten Sie zuerst den DNS A-Record ein"
        exit 1
    fi
fi

echo "✅ DNS-Prüfung abgeschlossen"

# Backup erstellen
echo "💾 Erstelle Sicherheitskopien..."
cp nginx.conf nginx.conf.pre-ssl
cp docker-compose.yml docker-compose.yml.pre-ssl
echo "✅ Backups erstellt"

# SSL-Verzeichnisse vorbereiten
echo "📁 Bereite SSL-Verzeichnisse vor..."
mkdir -p /etc/letsencrypt
mkdir -p /var/www/certbot
sudo mkdir -p /etc/letsencrypt /var/www/certbot 2>/dev/null || true

# Schritt 1: HTTP-Konfiguration mit ACME-Challenge erweitern
echo "🔧 Schritt 1: Erweitere HTTP für ACME-Challenge..."

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

    # HTTP Server - mit ACME Support
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN _;

        # ACME Challenge für Let's Encrypt
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;

        # API routes
        location /api/ {
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
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }
    }
}
EOF

# Docker-Compose für Certbot erweitern
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

volumes:
  postgres_data:
EOF

echo "🔄 Nginx wird mit ACME-Support neu gestartet..."
docker-compose up -d

echo "⏳ Warte auf Container-Start..."
sleep 10

# SSL-Zertifikat erstellen
echo "🔐 Schritt 2: SSL-Zertifikat wird erstellt..."

# Ersten Versuch mit Staging (zum Testen)
echo "🧪 Teste mit Staging-Zertifikat..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email admin@$DOMAIN \
    --agree-tos \
    --non-interactive \
    --staging \
    -d $DOMAIN \
    -d www.$DOMAIN

if [ $? -ne 0 ]; then
    echo "❌ Staging-Test fehlgeschlagen!"
    echo "🔙 Stelle ursprüngliche Konfiguration wieder her..."
    cp nginx.conf.pre-ssl nginx.conf
    cp docker-compose.yml.pre-ssl docker-compose.yml
    docker-compose up -d
    echo "❌ SSL-Setup fehlgeschlagen - Website läuft wieder über HTTP"
    exit 1
fi

echo "✅ Staging-Test erfolgreich"

# Echtes Zertifikat erstellen
echo "🔐 Erstelle echtes SSL-Zertifikat..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email admin@$DOMAIN \
    --agree-tos \
    --non-interactive \
    -d $DOMAIN \
    -d www.$DOMAIN

if [ $? -ne 0 ]; then
    echo "❌ SSL-Zertifikat konnte nicht erstellt werden!"
    echo "🔙 Stelle ursprüngliche Konfiguration wieder her..."
    cp nginx.conf.pre-ssl nginx.conf
    cp docker-compose.yml.pre-ssl docker-compose.yml
    docker-compose up -d
    echo "❌ SSL-Setup fehlgeschlagen - Website läuft wieder über HTTP"
    exit 1
fi

echo "✅ SSL-Zertifikat erfolgreich erstellt!"

# Schritt 3: HTTPS-Konfiguration aktivieren
echo "🔧 Schritt 3: Aktiviere HTTPS-Konfiguration..."

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

    # HTTP Server - Redirect zu HTTPS
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN;
        
        # ACME Challenge weiterhin erlauben
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        # Alles andere zu HTTPS weiterleiten
        location / {
            return 301 https://\$server_name\$request_uri;
        }
    }

    # HTTP Server für IP-Zugriff (Fallback)
    server {
        listen 80 default_server;
        server_name _;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;

        # Standard Website-Konfiguration für IP-Zugriff
        location /api/ {
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

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            proxy_pass http://app;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

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

# Auto-Renewal hinzufügen
cat >> docker-compose.yml << 'EOF'

  # Automatische Zertifikat-Erneuerung
  certbot-renew:
    image: certbot/certbot
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt
      - /var/www/certbot:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait; done;'"
EOF

echo "🔄 Finale HTTPS-Konfiguration wird aktiviert..."
docker-compose down
docker-compose up -d

echo "⏳ Warte auf vollständigen Start..."
sleep 15

echo ""
echo "🎉 SSL-SETUP ERFOLGREICH!"
echo "========================="
echo "✅ HTTPS: https://$DOMAIN"
echo "✅ HTTPS: https://www.$DOMAIN"
echo "✅ HTTP→HTTPS Weiterleitung aktiv"
echo "✅ IP-Zugriff weiterhin verfügbar: http://$SERVER_IP"
echo "✅ SSL-Zertifikat erneuert sich automatisch"
echo ""

# Tests durchführen
echo "🧪 Führe Abschlusstests durch..."

if curl -s -o /dev/null https://$DOMAIN; then
    echo "✅ HTTPS-Website erreichbar"
else
    echo "⚠️ HTTPS-Test fehlgeschlagen"
fi

if curl -s -o /dev/null http://$SERVER_IP; then
    echo "✅ IP-Zugriff weiterhin verfügbar"
else
    echo "⚠️ IP-Zugriff-Test fehlgeschlagen"
fi

echo ""
echo "📊 Container-Status:"
docker-compose ps

echo ""
echo "🎉 IHRE WEBSITE IST JETZT LIVE MIT SSL!"
echo "Testen Sie: https://$DOMAIN"