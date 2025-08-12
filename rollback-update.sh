#!/bin/bash

# Rollback zum vorherigen Stand nach fehlgeschlagenem Update

echo "🔄 ROLLBACK UPDATE"
echo "=================="

# Letztes Backup finden
LATEST_BACKUP=$(ls -1t backups/update-* 2>/dev/null | head -n1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "❌ Kein Backup gefunden!"
    echo "Verfügbare Backups:"
    ls -la backups/ 2>/dev/null || echo "Keine Backups vorhanden"
    exit 1
fi

echo "📂 Verwende Backup: $LATEST_BACKUP"

# Backup-Inhalt anzeigen
echo "📋 Backup-Inhalt:"
ls -la "$LATEST_BACKUP"

read -p "❓ Rollback durchführen? (j/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Jj]$ ]]; then
    echo "❌ Rollback abgebrochen"
    exit 1
fi

echo "🔄 Führe Rollback durch..."

# Container stoppen
docker-compose down

# Konfiguration wiederherstellen
echo "📁 Stelle Konfiguration wieder her..."
cp "$LATEST_BACKUP"/.env* . 2>/dev/null || true
cp "$LATEST_BACKUP"/docker-compose.yml . 2>/dev/null || true
cp "$LATEST_BACKUP"/nginx.conf . 2>/dev/null || true

# Datenbank wiederherstellen (falls vorhanden)
if [ -f "$LATEST_BACKUP/database-backup.sql" ]; then
    echo "🗄️ Stelle Datenbank wieder her..."
    docker-compose up -d db
    sleep 10
    docker-compose exec -T db psql -U grema_user -d grema_website < "$LATEST_BACKUP/database-backup.sql"
fi

# Container neu starten
echo "🚀 Starte Container..."
docker-compose up -d

sleep 15

echo "✅ Rollback abgeschlossen!"
echo "🌐 Website: http://$(hostname -I | awk '{print $1}'):5000"