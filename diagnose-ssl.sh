#!/bin/bash

# SSL-Diagnose und Reparatur-Script
# Führen Sie dies auf Ihrem VPS aus

echo "🔍 SSL-DIAGNOSE LÄUFT..."
echo "======================"

# Container-Status prüfen
echo "📊 Container-Status:"
docker-compose ps

echo ""
echo "🔧 Nginx-Konfiguration testen:"
if docker-compose exec -T nginx nginx -t; then
    echo "✅ Nginx-Konfiguration ist gültig"
else
    echo "❌ Nginx-Konfiguration fehlerhaft!"
fi

echo ""
echo "📁 SSL-Zertifikat-Status:"
if [ -d "/etc/letsencrypt/live" ]; then
    echo "✅ /etc/letsencrypt/live existiert"
    ls -la /etc/letsencrypt/live/ 2>/dev/null || echo "⚠️ Keine Zertifikate gefunden"
else
    echo "❌ /etc/letsencrypt/live nicht gefunden"
fi

echo ""
echo "🌐 Port-Check:"
if netstat -tulpn | grep ":80 " > /dev/null; then
    echo "✅ Port 80 ist offen"
else
    echo "❌ Port 80 ist nicht offen"
fi

if netstat -tulpn | grep ":443 " > /dev/null; then
    echo "✅ Port 443 ist offen"
else
    echo "❌ Port 443 ist nicht offen"
fi

echo ""
echo "🔐 SSL-Test (falls Domain angegeben wurde):"
read -p "Ihre Domain eingeben (oder Enter für lokalen Test): " DOMAIN

if [ -n "$DOMAIN" ]; then
    echo "🧪 Teste HTTPS-Verbindung zu $DOMAIN..."
    if curl -k -s -I https://$DOMAIN | head -n1; then
        echo "✅ HTTPS-Verbindung funktioniert"
    else
        echo "❌ HTTPS-Verbindung fehlgeschlagen"
    fi
    
    echo "🧪 Teste HTTP-Weiterleitung..."
    if curl -s -I http://$DOMAIN | grep -q "301"; then
        echo "✅ HTTP→HTTPS Weiterleitung aktiv"
    else
        echo "⚠️ Keine HTTP→HTTPS Weiterleitung"
    fi
fi

echo ""
echo "📋 Nginx-Logs (letzte 20 Zeilen):"
docker-compose logs --tail=20 nginx

echo ""
echo "📋 Certbot-Logs (falls vorhanden):"
docker-compose logs --tail=10 certbot 2>/dev/null || echo "Keine Certbot-Logs"

echo ""
echo "🔧 EMPFOHLENE LÖSUNGEN:"
echo "======================"

if ! docker-compose ps | grep -q "nginx.*Up"; then
    echo "❌ Nginx läuft nicht - Container neu starten:"
    echo "   docker-compose restart nginx"
fi

if [ ! -d "/etc/letsencrypt/live" ] || [ -z "$(ls -A /etc/letsencrypt/live 2>/dev/null)" ]; then
    echo "❌ Keine SSL-Zertifikate - SSL-Setup wiederholen:"
    echo "   ./setup-domain-safe.sh"
fi

if ! netstat -tulpn | grep ":443 " > /dev/null; then
    echo "❌ Port 443 nicht offen - Firewall prüfen:"
    echo "   ufw allow 443"
    echo "   ufw status"
fi

echo ""
echo "🚨 SCHNELL-REPARATUR (falls SSL komplett fehlgeschlagen):"
echo "========================================================="
echo "./fix-website.sh  # Stellt HTTP-Betrieb wieder her"
echo ""
echo "Danach für SSL-Setup:"
echo "./setup-domain-safe.sh  # Sicherere SSL-Installation"