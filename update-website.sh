#!/bin/bash

# Grema Website Update Script
# Zieht neueste Version aus Git und rebuildet Docker Container

set -e

echo "🚀 GREMA WEBSITE UPDATE"
echo "======================"
echo "Datum: $(date)"
echo ""

# Variablen
BACKUP_DIR="./backups/update-$(date +%Y%m%d-%H%M%S)"
GIT_BRANCH="main"

# Prüfe ob wir in Git-Repository sind
if [ ! -d ".git" ]; then
    echo "❌ Fehler: Nicht in Git-Repository!"
    echo "Führen Sie das Script im Grema-Verzeichnis aus"
    exit 1
fi

# Backup erstellen
echo "💾 Erstelle Backup..."
mkdir -p "$BACKUP_DIR"
cp -r .env* "$BACKUP_DIR/" 2>/dev/null || true
cp docker-compose.yml "$BACKUP_DIR/" 2>/dev/null || true
cp nginx.conf "$BACKUP_DIR/" 2>/dev/null || true

# Datenbank-Backup
echo "🗄️ Erstelle Datenbank-Backup..."
if docker-compose ps | grep -q "grema-db-1.*Up"; then
    docker-compose exec -T db pg_dump -U grema_user grema_website > "$BACKUP_DIR/database-backup.sql"
    echo "✅ Datenbank-Backup: $BACKUP_DIR/database-backup.sql"
else
    echo "⚠️ Datenbank läuft nicht - überspringe DB-Backup"
fi

echo "✅ Backup erstellt: $BACKUP_DIR"
echo ""

# Git Status prüfen
echo "🔍 Prüfe Git-Status..."
git status --porcelain
if [ $? -ne 0 ]; then
    echo "❌ Git-Status Fehler!"
    exit 1
fi

echo ""
echo "📡 Hole neueste Änderungen aus Git..."

# Stash lokale Änderungen (falls vorhanden)
if [ -n "$(git status --porcelain)" ]; then
    echo "💾 Sichere lokale Änderungen..."
    git stash push -m "Auto-stash before update $(date)"
fi

# Aktuelle Branch anzeigen
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Aktuelle Branch: $CURRENT_BRANCH"

# Remote updates holen
git fetch origin

# Prüfe ob Updates verfügbar sind
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/$GIT_BRANCH)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "✅ Repository ist bereits aktuell!"
    echo "🔄 Rebuilde trotzdem Docker Images..."
else
    echo "📥 Updates verfügbar..."
    echo "   Lokal:  ${LOCAL:0:8}"
    echo "   Remote: ${REMOTE:0:8}"
    
    # Pull neueste Version
    echo "⬇️ Ziehe Updates..."
    git pull origin $GIT_BRANCH
    
    if [ $? -ne 0 ]; then
        echo "❌ Git pull fehlgeschlagen!"
        echo "🔄 Versuche lokale Änderungen wiederherzustellen..."
        git stash pop 2>/dev/null || true
        exit 1
    fi
    
    echo "✅ Updates erfolgreich gezogen"
fi

echo ""
echo "🐳 Docker Update..."

# Container-Status vor Update
echo "📊 Container-Status vor Update:"
docker-compose ps

echo ""
echo "⏹️ Stoppe Container graceful..."
docker-compose down --timeout 30

# Docker Images neu builden
echo "🔨 Rebuilde Docker Images..."
docker-compose build --no-cache --pull

# Prune alte Images (optional, spart Speicher)
echo "🧹 Entferne alte Docker Images..."
docker image prune -f

# Container neu starten
echo "🚀 Starte Container neu..."
docker-compose up -d

# Warte auf Container-Start
echo "⏳ Warte auf Container-Start..."
sleep 20

# Gesundheitsprüfung
echo ""
echo "🔍 GESUNDHEITSPRÜFUNG"
echo "===================="

# Container-Status prüfen
echo "📊 Container-Status:"
docker-compose ps

# App-Gesundheit prüfen
echo ""
echo "🌐 Teste Website..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:5000 | grep -q "200"; then
    echo "✅ Website antwortet (HTTP)"
else
    echo "❌ Website antwortet nicht auf HTTP"
fi

# SSL-Test (falls HTTPS konfiguriert)
if [ -f "/etc/letsencrypt/live/gremagebaeudeservicegmbh.de/fullchain.pem" ]; then
    echo "🔒 Teste HTTPS..."
    if curl -s -o /dev/null -w "%{http_code}" https://gremagebaeudeservicegmbh.de | grep -q "200"; then
        echo "✅ HTTPS funktioniert"
    else
        echo "⚠️ HTTPS-Problem - prüfe SSL-Konfiguration"
    fi
fi

# Datenbank-Test
echo "🗄️ Teste Datenbank..."
if docker-compose exec -T db pg_isready -U grema_user -d grema_website > /dev/null; then
    echo "✅ Datenbank läuft"
else
    echo "❌ Datenbank-Problem"
fi

# Logs prüfen (letzte 10 Zeilen)
echo ""
echo "📋 Aktuelle Logs (letzte 10 Zeilen):"
docker-compose logs --tail=10 app

echo ""
echo "🎉 UPDATE ABGESCHLOSSEN!"
echo "======================="
echo "✅ Git: Neueste Version"
echo "✅ Docker: Images rebuilt"
echo "✅ Container: Neu gestartet"
echo ""
echo "📊 Status-Übersicht:"
echo "   Website: http://$(hostname -I | awk '{print $1}'):5000"
if [ -f "/etc/letsencrypt/live/gremagebaeudeservicegmbh.de/fullchain.pem" ]; then
    echo "   HTTPS: https://gremagebaeudeservicegmbh.de"
fi
echo "   Backup: $BACKUP_DIR"
echo ""

# Backup-Info
echo "💾 BACKUP-INFORMATIONEN:"
echo "Backup erstellt: $BACKUP_DIR"
echo "Wiederherstellung falls nötig:"
echo "   cp $BACKUP_DIR/.env* ."
echo "   cp $BACKUP_DIR/docker-compose.yml ."
echo "   cp $BACKUP_DIR/nginx.conf ."
echo "   docker-compose down && docker-compose up -d"
echo ""

# Cleanup-Suggestion
echo "🧹 WARTUNG (optional):"
echo "docker system prune -f  # Entfernt ungenutzte Docker-Daten"
echo "docker volume prune -f  # Entfernt ungenutzte Volumes (VORSICHT!)"
echo ""

echo "🚀 Update erfolgreich abgeschlossen!"
echo "Ihre Website läuft mit der neuesten Version."