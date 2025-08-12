# Deployment Tutorial: Grema Website auf Ubuntu 22.04 VPS

Komplette Anleitung zur Bereitstellung der Grema Gebäudeservice Website auf einem Ubuntu 22.04 VPS mit GitHub Integration.

**Optimiert für öffentliche GitHub Repositories** - keine SSH Keys erforderlich!

## Voraussetzungen

- Frischer Ubuntu 22.04 VPS mit Root-Zugang
- Domain-Name für die Website
- GitHub Repository URL (bereits vorhanden und öffentlich)

## 1. VPS Grundkonfiguration

### System Updates
```bash
# Als root user
sudo apt update && sudo apt upgrade -y
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
```

### User erstellen
```bash
# Deployment User erstellen
sudo adduser deploy
sudo usermod -aG sudo deploy
sudo mkdir -p /home/deploy/.ssh
sudo cp ~/.ssh/authorized_keys /home/deploy/.ssh/
sudo chown -R deploy:deploy /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo chmod 600 /home/deploy/.ssh/authorized_keys

# Als deploy user einloggen
su - deploy
```

## 2. Node.js Installation

### Node.js 20 installieren
```bash
# NodeSource Repository hinzufügen
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Versions prüfen
node --version  # sollte v20.x.x sein
npm --version
```

### PM2 Global installieren
```bash
sudo npm install -g pm2
```

## 3. PostgreSQL Installation

### PostgreSQL installieren
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Database und User erstellen
```bash
sudo -u postgres psql

-- In PostgreSQL Console:
CREATE DATABASE grema_website;
CREATE USER grema_user WITH ENCRYPTED PASSWORD 'IHR_SICHERES_PASSWORT';
GRANT ALL PRIVILEGES ON DATABASE grema_website TO grema_user;
\q
```

### PostgreSQL für externe Verbindungen konfigurieren
```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
# Finde und ändere:
# listen_addresses = 'localhost'

sudo nano /etc/postgresql/14/main/pg_hba.conf
# Füge hinzu:
# local   grema_website    grema_user                     md5

sudo systemctl restart postgresql
```

## 4. Nginx Installation

### Nginx installieren
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Nginx Konfiguration
```bash
sudo nano /etc/nginx/sites-available/grema-website
```

Inhalt für `/etc/nginx/sites-available/grema-website`:
```nginx
server {
    listen 80;
    server_name ihre-domain.de www.ihre-domain.de;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ihre-domain.de www.ihre-domain.de;

    # SSL Configuration (wird später durch Certbot konfiguriert)
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Static files
    location /assets/ {
        root /home/deploy/grema-website/dist/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API routes
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend routes
    location / {
        proxy_pass http://localhost:5000;
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
```

### Site aktivieren
```bash
sudo ln -s /etc/nginx/sites-available/grema-website /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 5. SSL Certificate mit Let's Encrypt

### Certbot installieren
```bash
sudo apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### SSL Certificate erstellen
```bash
sudo certbot --nginx -d ihre-domain.de -d www.ihre-domain.de
```

### Auto-Renewal testen
```bash
sudo certbot renew --dry-run
```

## 6. Projekt Deployment

### Repository klonen
```bash
cd /home/deploy

# Öffentliches Repository klonen (HTTPS - kein SSH Key benötigt)
git clone https://github.com/DEIN-USERNAME/grema-website.git
cd grema-website

# Für automatische Deployments (optional): Deploy Key einrichten
# ssh-keygen -t ed25519 -f ~/.ssh/deploy_key -N ""
# cat ~/.ssh/deploy_key.pub
# Public Key zu GitHub → Settings → Deploy keys hinzufügen
```

### Environment Variables
```bash
nano .env
```

Inhalt für `.env`:
```env
NODE_ENV=production
DATABASE_URL=postgresql://grema_user:IHR_SICHERES_PASSWORT@localhost:5432/grema_website
DEEPSEEK_API_KEY=YOUR_DEEPSEEK_API_KEY
RUNWARE_API_KEY=YOUR_RUNWARE_API_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_PLACES_API_KEY

# PostgreSQL einzeln
PGHOST=localhost
PGPORT=5432
PGDATABASE=grema_website
PGUSER=grema_user
PGPASSWORD=IHR_SICHERES_PASSWORT
```

### Dependencies installieren und Build
```bash
npm install
npm run build
npm run db:push
```

### PM2 App starten
```bash
# PM2 Ecosystem File erstellen
nano ecosystem.config.js
```

Inhalt für `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'grema-website',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### Logs Verzeichnis und App starten
```bash
mkdir logs
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

## 7. Automatisches Deployment Script

### Deploy Script erstellen
```bash
nano deploy.sh
chmod +x deploy.sh
```

Inhalt für `deploy.sh`:
```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Git pull (für öffentliche Repositories)
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build application
echo "🔨 Building application..."
npm run build

# Database migration
echo "🗃️  Running database migrations..."
npm run db:push

# Restart PM2
echo "🔄 Restarting application..."
pm2 restart grema-website

echo "✅ Deployment completed!"
```

### GitHub Actions Webhook (optional)
Da das Repository öffentlich ist, können Sie auch einen Webhook einrichten:

#### Webhook Script erstellen
```bash
nano /home/deploy/webhook-listener.js
```

Inhalt für `webhook-listener.js`:
```javascript
const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const SECRET = 'IHR_WEBHOOK_SECRET';
const PORT = 9000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      // Webhook Secret validieren (optional)
      const signature = req.headers['x-hub-signature-256'];
      if (signature) {
        const expectedSignature = crypto
          .createHmac('sha256', SECRET)
          .update(body, 'utf8')
          .digest('hex');
        
        if (`sha256=${expectedSignature}` !== signature) {
          res.statusCode = 401;
          res.end('Unauthorized');
          return;
        }
      }

      // Deployment ausführen
      exec('cd /home/deploy/grema-website && ./deploy.sh', (error, stdout, stderr) => {
        console.log('Deployment triggered:', stdout);
        if (error) console.error('Deployment error:', error);
      });
      
      res.statusCode = 200;
      res.end('OK');
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Webhook listener running on port ${PORT}`);
});
```

#### Webhook als Service einrichten
```bash
# PM2 für Webhook
pm2 start /home/deploy/webhook-listener.js --name webhook

# Nginx Konfiguration erweitern
sudo nano /etc/nginx/sites-available/grema-website
# In der server{} Sektion hinzufügen:
# location /webhook {
#   proxy_pass http://localhost:9000;
#   proxy_set_header Host $host;
#   proxy_set_header X-Real-IP $remote_addr;
# }

# GitHub Repository → Settings → Webhooks → Add webhook
# Payload URL: https://ihre-domain.de/webhook  
# Content type: application/json
# Secret: IHR_WEBHOOK_SECRET
# Events: Just the push event
```

## 8. Monitoring Setup

### PM2 Monitoring
```bash
# Status checken
pm2 status
pm2 logs grema-website
pm2 monit
```

### System Monitoring
```bash
# Logrotate für PM2 logs
sudo nano /etc/logrotate.d/pm2-deploy

# Inhalt:
# /home/deploy/grema-website/logs/*.log {
#   daily
#   rotate 10
#   copytruncate
#   delaycompress
#   compress
#   notifempty
#   create 0640 deploy deploy
# }
```

## 9. Backup Setup

### Database Backup Script
```bash
nano backup-db.sh
chmod +x backup-db.sh
```

Inhalt für `backup-db.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/home/deploy/backups"
DATE=$(date +"%Y%m%d_%H%M%S")

mkdir -p $BACKUP_DIR

# Database backup
pg_dump -U grema_user -h localhost grema_website > $BACKUP_DIR/db_backup_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +7 -delete

echo "Backup completed: db_backup_$DATE.sql"
```

### Crontab für automatische Backups
```bash
crontab -e

# Tägliches Backup um 3:00 Uhr
# 0 3 * * * /home/deploy/grema-website/backup-db.sh
```

## 10. Security Hardening

### Fail2ban Installation
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban

# Nginx jail konfigurieren
sudo nano /etc/fail2ban/jail.local
```

Inhalt für `/etc/fail2ban/jail.local`:
```ini
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[nginx-http-auth]
enabled = true

[nginx-noscript]
enabled = true

[nginx-badbots]
enabled = true
```

### Automatische Updates
```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure unattended-upgrades
```

## 11. Finale Checks

### Services Status prüfen
```bash
# Alle Services prüfen
sudo systemctl status nginx
sudo systemctl status postgresql
pm2 status
sudo systemctl status fail2ban

# Website testen
curl -I https://ihre-domain.de
```

### Performance Test
```bash
# Optional: Load testing tool installieren
sudo apt install apache2-utils -y

# Simple Load test (100 requests, 10 concurrent)
ab -n 100 -c 10 https://ihre-domain.de/
```

## 12. Maintenance Befehle

### Häufig verwendete Befehle
```bash
# Logs ansehen
pm2 logs grema-website --lines 100

# App neustarten
pm2 restart grema-website

# Zero-downtime reload
pm2 reload grema-website

# Manual deployment
cd /home/deploy/grema-website && ./deploy.sh

# Database console
psql -U grema_user -d grema_website -h localhost

# Nginx config testen
sudo nginx -t && sudo systemctl reload nginx

# SSL certificate renewal
sudo certbot renew

# System resources
htop
df -h
free -h
```

## Troubleshooting

### Häufige Probleme

1. **Port 5000 bereits verwendet**
```bash
sudo lsof -i :5000
pm2 delete all
pm2 start ecosystem.config.js
```

2. **Database connection failed**
```bash
sudo systemctl status postgresql
psql -U grema_user -d grema_website -h localhost
```

3. **Nginx 502 Bad Gateway**
```bash
sudo nginx -t
pm2 status
pm2 logs grema-website
```

4. **SSL Certificate Probleme**
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

## Domain Setup Checkliste

- [ ] Domain A-Record zeigt auf VPS IP
- [ ] Domain CNAME für www zeigt auf Hauptdomain
- [ ] DNS Propagation abwarten (bis 48h)
- [ ] SSL Certificate funktioniert
- [ ] Website erreichbar über HTTPS
- [ ] Auto-Redirect von HTTP zu HTTPS

## Backup und Restore

### Vollständiges Backup erstellen
```bash
# Code + Database backup
tar -czf grema_backup_$(date +%Y%m%d).tar.gz \
  /home/deploy/grema-website \
  --exclude="node_modules" \
  --exclude="dist" \
  --exclude="logs"

# Database backup
pg_dump -U grema_user grema_website > grema_db_$(date +%Y%m%d).sql
```

### Restore aus Backup
```bash
# Code restore
tar -xzf grema_backup_YYYYMMDD.tar.gz -C /

# Database restore
psql -U grema_user -d grema_website < grema_db_YYYYMMDD.sql

# Rebuild und restart
cd /home/deploy/grema-website
npm install
npm run build
pm2 restart grema-website
```

---

## Schnellstart für erfahrene Nutzer

Für Nutzer, die schnell deployen möchten (öffentliches GitHub Repository):

```bash
# 1. System Setup
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx postgresql postgresql-contrib
sudo npm install -g pm2

# 2. User Setup
sudo adduser deploy
sudo usermod -aG sudo deploy
su - deploy

# 3. Database Setup  
sudo -u postgres createuser -P grema_user
sudo -u postgres createdb -O grema_user grema_website

# 4. Clone und Deploy (öffentliches Repository)
cd /home/deploy
git clone https://github.com/IHR-USERNAME/grema-website.git
cd grema-website

# 5. Environment Setup
cp .env.example .env
nano .env  # DATABASE_URL und API Keys konfigurieren

# 6. Build und Start
npm install && npm run build && npm run db:push
pm2 start ecosystem.config.js && pm2 startup && pm2 save

# 7. SSL
sudo snap install --classic certbot
sudo certbot --nginx -d ihre-domain.de
```

**Wichtig**: Ersetzen Sie `IHR-USERNAME` mit dem tatsächlichen GitHub Username!

---

## Zusammenfassung

Nach diesem Tutorial haben Sie:
- ✅ Ubuntu 22.04 VPS vollständig konfiguriert
- ✅ Node.js, PostgreSQL, Nginx installiert
- ✅ SSL Certificate mit automatischer Erneuerung
- ✅ PM2 Process Management mit Clustering
- ✅ Automatische Deployments über GitHub
- ✅ Monitoring und Logging Setup
- ✅ Security Hardening mit Fail2ban
- ✅ Automated Backups
- ✅ Professional Production Environment

Die Website ist nun produktionsbereit und läuft stabil auf dem VPS!