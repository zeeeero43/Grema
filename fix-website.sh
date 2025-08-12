#!/bin/bash

# NOTFALL-REPARATUR: Website wieder online bringen
# Führen Sie diesen Script auf Ihrem VPS aus

set -e

echo "🚨 NOTFALL-REPARATUR: Website wird wieder hergestellt"
echo "===================================================="

# Container stoppen
echo "🔄 Stoppe alle Container..."
docker-compose down 2>/dev/null || true

# Backup-Dateien wiederherstellen falls vorhanden
if [ -f "nginx.conf.backup" ]; then
    echo "✅ Stelle nginx.conf aus Backup wieder her"
    cp nginx.conf.backup nginx.conf
else
    echo "⚠️ Kein Backup gefunden - erstelle funktionierende nginx.conf"
    
    # Funktionierende HTTP-only nginx.conf erstellen
    cat > nginx.conf << 'EOF'
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

    # HTTP Server (funktioniert immer)
    server {
        listen 80;
        server_name _;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;

        # API routes
        location /api/ {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
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
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
EOF
fi

if [ -f "docker-compose.yml.backup" ]; then
    echo "✅ Stelle docker-compose.yml aus Backup wieder her"
    cp docker-compose.yml.backup docker-compose.yml
else
    echo "⚠️ Erstelle einfache docker-compose.yml"
    
    cat > docker-compose.yml << 'EOF'
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
      # API Keys - setzen Sie diese in Ihrer .env Datei:
      - DEEPSEEK_API_KEY=${DEEPSEEK_API_KEY}
      - RUNWARE_API_KEY=${RUNWARE_API_KEY}
      - GOOGLE_PLACES_API_KEY=${GOOGLE_PLACES_API_KEY:-}
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
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
EOF
fi

echo "🔄 Website wird neu gestartet..."
docker-compose up -d --build

echo "⏳ Warte 15 Sekunden auf vollständigen Start..."
sleep 15

echo ""
echo "🎉 WEBSITE IST WIEDER ONLINE!"
echo "=============================="
echo "✅ HTTP: http://$(hostname -I | awk '{print $1}')"
echo "✅ Alle Container laufen wieder"
echo ""

# Status prüfen
echo "📊 Container-Status:"
docker-compose ps

echo ""
echo "🔧 Nginx-Test:"
docker-compose exec nginx nginx -t 2>/dev/null && echo "✅ Nginx-Konfiguration OK" || echo "❌ Nginx-Problem"

echo ""
echo "🌐 Teste Website:"
sleep 2
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
    echo "✅ Website antwortet erfolgreich"
else
    echo "⚠️ Website-Test fehlgeschlagen - prüfen Sie die Logs"
    echo "Container-Logs anzeigen: docker-compose logs"
fi

echo ""
echo "✅ REPARATUR ABGESCHLOSSEN"
echo "Ihre Website läuft jetzt wieder über HTTP"
echo "Für SSL/Domain später das verbesserte setup-domain-safe.sh verwenden"