#!/bin/bash

# Schnelles Update ohne ausführliche Checks
# Für häufige Updates während der Entwicklung

echo "⚡ SCHNELLES UPDATE"
echo "=================="

# Git pull
echo "📡 Hole Updates..."
git pull

# Docker rebuild und restart in einem Schritt
echo "🐳 Rebuilde und starte neu..."
docker-compose up -d --build

echo "⏳ Kurze Pause..."
sleep 10

# Schneller Status-Check
echo "📊 Status:"
docker-compose ps

echo "✅ Schnelles Update abgeschlossen!"
echo "🌐 Website: http://$(hostname -I | awk '{print $1}'):5000"