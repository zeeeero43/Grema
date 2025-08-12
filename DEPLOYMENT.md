# Docker Deployment Tutorial: Grema Website

Einfache Anleitung zur Bereitstellung der Grema Gebäudeservice Website mit Docker auf einem Ubuntu 22.04 VPS.

**Docker-basiert** - Einfacher, schneller, zuverlässiger!

## Voraussetzungen

- Frischer Ubuntu 22.04 VPS mit Root-Zugang
- GitHub Repository URL (bereits vorhanden und öffentlich)
- Optional: Domain-Name für die Website (wird später konfiguriert)

## 1. VPS Grundkonfiguration

### System Updates und Docker Installation
```bash
# System Update
sudo apt update && sudo apt upgrade -y

# Docker Installation
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Docker Compose Installation
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Firewall Setup
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Reboot für Docker Gruppe
sudo reboot
```

Nach dem Reboot wieder einloggen und weitermachen.

## 2. Projekt Setup

### Repository klonen
```bash
# Öffentliches Repository klonen (funktioniert für root und normale User)
cd $HOME
git clone https://github.com/IHR-USERNAME/grema-website.git
cd grema-website
```

### Environment Variables konfigurieren
```bash
# .env Datei erstellen
nano .env
```

Inhalt für `.env`:
```env
# API Keys - Ihre echten Keys hier eintragen
DEEPSEEK_API_KEY=your_deepseek_api_key_here
RUNWARE_API_KEY=your_runware_api_key_here
# Optional: Für echte Google Reviews (sonst werden Fallback-Daten verwendet)
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

### Docker Build und Start
```bash
# Container bauen und starten
docker-compose up -d --build

# Logs ansehen
docker-compose logs -f

# Database Migration
docker-compose exec app npm run db:push
```

## 3. Automatisches Deployment Script

### Deploy Script erstellen
```bash
nano deploy.sh
chmod +x deploy.sh
```

Inhalt für `deploy.sh`:
```bash
#!/bin/bash

echo "🚀 Starting Docker deployment..."

# Git pull
echo "📥 Pulling latest changes..."
git pull origin main

# Rebuild and restart containers
echo "🔨 Rebuilding containers..."
docker-compose down
docker-compose up -d --build

# Database migration
echo "🗃️  Running database migrations..."
docker-compose exec app npm run db:push

echo "✅ Docker deployment completed!"
```

### GitHub Webhook für automatisches Deployment (optional)
```bash
# Webhook Script erstellen
nano webhook.sh
chmod +x webhook.sh
```

Inhalt für `webhook.sh`:
```bash
#!/bin/bash
# Simple webhook listener für GitHub
cd $HOME/grema-website

while true; do
  # Prüfe alle 5 Minuten auf Updates
  git fetch origin main
  if [ $(git rev-list HEAD...origin/main --count) != 0 ]; then
    echo "🔄 Updates found, deploying..."
    ./deploy.sh
  fi
  sleep 300
done
```

Als Service starten:
```bash
# Screen session für Webhook
screen -dmS webhook bash -c 'cd $HOME/grema-website && ./webhook.sh'

# Oder als Docker Service hinzufügen (erweiterte Option)
```

## 4. Monitoring und Management

### Docker Container Monitoring
```bash
# Container Status
docker-compose ps

# Logs ansehen
docker-compose logs app
docker-compose logs db
docker-compose logs nginx

# Live Logs
docker-compose logs -f

# Container Statistiken
docker stats

# Einzelne Container verwalten
docker-compose restart app
docker-compose restart db
```

### System Monitoring
```bash
# Docker System Info
docker system df
docker system prune  # Cleanup

# Database Backup
docker-compose exec db pg_dump -U grema_user grema_website > backup_$(date +%Y%m%d).sql
```

## 5. Backup Setup

### Docker Backup Script
```bash
nano backup.sh
chmod +x backup.sh
```

Inhalt für `backup.sh`:
```bash
#!/bin/bash
BACKUP_DIR="./backups"
DATE=$(date +"%Y%m%d_%H%M%S")

mkdir -p $BACKUP_DIR

# Database backup
docker-compose exec -T db pg_dump -U grema_user grema_website > $BACKUP_DIR/db_backup_$DATE.sql

# Volume backup (optional)
docker run --rm -v grema-website_postgres_data:/data -v $(pwd)/backups:/backup alpine tar czf /backup/postgres_volume_$DATE.tar.gz -C /data .

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

### Crontab für automatische Backups
```bash
crontab -e

# Tägliches Backup um 3:00 Uhr
# 0 3 * * * cd $HOME/grema-website && ./backup.sh
```

## 6. Zugriff und erste Tests

### Website testen
```bash
# Container Status prüfen
docker-compose ps

# Website über IP aufrufen
curl -I http://IHRE_SERVER_IP

# In Browser öffnen:
# http://IHRE_SERVER_IP
```

Ihre Website sollte jetzt über die Server-IP erreichbar sein!

### Troubleshooting
```bash
# Container neustarten
docker-compose restart

# Logs bei Problemen
docker-compose logs app

# Database Connection testen
docker-compose exec app npm run db:push

# Nginx Config testen
docker-compose exec nginx nginx -t
```

## 7. Wartung und Updates

### Regelmäßige Wartung
```bash
# Updates deployen
./deploy.sh

# Docker System aufräumen
docker system prune -f

# Backups erstellen
./backup.sh

# Container Status prüfen
docker-compose ps

# Logs prüfen
docker-compose logs --tail=100
```

### Performance Monitoring
```bash
# Resource Usage
docker stats

# Disk Usage
docker system df

# Load Test (optional)
sudo apt install apache2-utils -y
ab -n 100 -c 10 http://IHRE_SERVER_IP/
```

## Häufig verwendete Befehle

```bash
# === Docker Management ===
docker-compose up -d          # Alle Services starten
docker-compose down           # Alle Services stoppen
docker-compose restart        # Alle Services neustarten
docker-compose logs -f        # Live Logs aller Services

# === Einzelne Services ===
docker-compose restart app    # Nur App neustarten
docker-compose logs app       # App Logs
docker-compose exec app bash  # App Container betreten

# === Database ===
docker-compose exec db psql -U grema_user grema_website  # Database Console
docker-compose exec app npm run db:push                   # Migration

# === Deployment ===
./deploy.sh                   # Update von GitHub
./backup.sh                   # Backup erstellen

# === Monitoring ===
docker stats                  # Live Resource Usage
docker system df              # Disk Usage
docker-compose ps             # Service Status

# === Cleanup ===
docker system prune -f        # Cleanup unused data
docker-compose down --volumes # Alles löschen (ACHTUNG!)
```

## Troubleshooting

### Häufige Probleme

1. **Container startet nicht**
```bash
docker-compose logs app
docker-compose up --build app
```

2. **Database connection failed**
```bash
docker-compose logs db
docker-compose restart db
docker-compose exec app npm run db:push
```

3. **Website nicht erreichbar**
```bash
docker-compose ps
docker-compose logs nginx
curl -I http://localhost:80
```

4. **Build Fehler**
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

5. **Speicher voll**
```bash
docker system prune -f
docker volume prune
```

## Setup Checkliste

- [ ] Docker und Docker Compose installiert
- [ ] Repository geklont
- [ ] .env Datei mit API Keys konfiguriert
- [ ] Docker Container gestartet
- [ ] Database Migration durchgeführt
- [ ] Website über IP erreichbar
- [ ] Deploy Script funktioniert
- [ ] Backup Script eingerichtet

## Backup und Restore

### Vollständiges Backup erstellen
```bash
# Automated backup script
./backup.sh

# Manual database backup
docker-compose exec -T db pg_dump -U grema_user grema_website > manual_backup.sql

# Manual volume backup
docker run --rm -v grema-website_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/volume_backup.tar.gz -C /data .
```

### Restore aus Backup
```bash
# Database restore
docker-compose exec -T db psql -U grema_user grema_website < backup_YYYYMMDD.sql

# Volume restore (falls nötig)
docker-compose down
docker volume rm grema-website_postgres_data
docker volume create grema-website_postgres_data
docker run --rm -v grema-website_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/volume_backup.tar.gz -C /data
docker-compose up -d
```

---

## Schnellstart für erfahrene Nutzer

Docker-basiertes Deployment in unter 10 Minuten:

```bash
# 1. Docker Installation
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout/Login für Docker Gruppe

# 2. Project Setup
cd $HOME
git clone https://github.com/IHR-USERNAME/grema-website.git
cd grema-website

# 3. Environment Setup
echo "DEEPSEEK_API_KEY=your_key_here
RUNWARE_API_KEY=your_key_here
# Optional: Für echte Google Reviews
GOOGLE_PLACES_API_KEY=your_key_here" > .env

# 4. Deploy
docker-compose up -d --build
docker-compose exec app npm run db:push

# 5. Test
curl -I http://localhost
```

**Fertig!** Website läuft auf http://IHRE_SERVER_IP

---

---

# Domain und SSL Setup (Optional)

Wenn Sie später eine Domain hinzufügen möchten:

## Domain konfigurieren

### DNS Records einrichten
- A-Record: `@` → `IHRE_SERVER_IP`
- A-Record: `www` → `IHRE_SERVER_IP`

### Nginx für Domain konfigurieren
```bash
# nginx.conf bearbeiten
nano nginx.conf
```

In der nginx.conf den HTTP server Block ändern:
```nginx
server {
    listen 80;
    server_name ihre-domain.de www.ihre-domain.de;
    
    # Rest bleibt gleich...
}
```

### SSL Certificate mit Let's Encrypt
```bash
# Certbot Container
docker run -it --rm \
  -v $(pwd)/nginx/ssl:/etc/letsencrypt \
  certbot/certbot certonly \
  --standalone \
  -d ihre-domain.de \
  -d www.ihre-domain.de

# SSL Block in nginx.conf aktivieren
# HTTPS server section uncommentieren und anpassen
```

### Container neustarten
```bash
docker-compose restart nginx
```

---

## Zusammenfassung

Nach diesem Tutorial haben Sie:
- ✅ Docker-basierte Deployment Pipeline
- ✅ PostgreSQL Database in Container
- ✅ Nginx Reverse Proxy
- ✅ Automatische Deployments über GitHub
- ✅ Backup und Monitoring Setup
- ✅ Zero-Downtime Updates
- ✅ Professional Production Environment

**Vorteile gegenüber traditionellem Setup:**
- 🚀 **Schneller**: Deployment in unter 10 Minuten
- 🔧 **Einfacher**: Weniger manuelle Konfiguration
- 🛡️ **Sicherer**: Isolierte Container
- 📦 **Portabel**: Läuft überall gleich
- 🔄 **Zuverlässiger**: Konsistente Umgebung

Die Website läuft nun stabil und professionell über Docker!