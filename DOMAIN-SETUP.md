# 🌐 Domain & SSL Setup für Grema Website

**Automatisches Setup mit Let's Encrypt SSL-Zertifikat**

## Voraussetzungen ✅

- [x] VPS ist eingerichtet und Website läuft über IP
- [x] Domain ist registriert
- [x] **DNS A-Record ist gesetzt**: `example.com` und `www.example.com` zeigen auf Ihre Server-IP

## 🚀 Automatisches Setup (5 Minuten)

**Auf Ihrem VPS als root ausführen:**

```bash
cd ~/grema-website

# Setup-Script ausführbar machen
chmod +x setup-domain.sh

# Domain-Setup starten
./setup-domain.sh
```

**Das Script fragt nach Ihrer Domain und macht automatisch:**
- ✅ Nginx für HTTPS konfigurieren
- ✅ Let's Encrypt SSL-Zertifikat erstellen
- ✅ HTTP→HTTPS Weiterleitung einrichten
- ✅ Container mit SSL neu starten
- ✅ Automatische Zertifikat-Erneuerung aktivieren

## ✅ Nach dem Setup

**Ihre Website ist dann erreichbar unter:**
- `https://ihre-domain.de` ✅
- `https://www.ihre-domain.de` ✅ 
- `http://ihre-domain.de` → automatische HTTPS-Weiterleitung

## 🔧 Manuelle Schritte (falls Script fehlschlägt)

### 1. DNS prüfen
```bash
# Prüfen ob Domain auf Server zeigt
nslookup ihre-domain.de
# Sollte Ihre Server-IP anzeigen
```

### 2. Firewall prüfen
```bash
# Ports freigeben
ufw allow 80
ufw allow 443
ufw status
```

### 3. SSL manuell einrichten
```bash
# Certbot Container manuell ausführen
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    -d ihre-domain.de \
    -d www.ihre-domain.de \
    --email admin@ihre-domain.de \
    --agree-tos \
    --non-interactive
```

### 4. Container neu starten
```bash
docker-compose down
docker-compose up -d
```

## 🛠️ Fehlerbehebung

### Domain nicht erreichbar
```bash
# DNS-Propagation prüfen
dig ihre-domain.de A
# Sollte Server-IP zeigen

# Nginx-Logs prüfen
docker-compose logs nginx
```

### SSL-Zertifikat Fehler
```bash
# Certbot-Logs anzeigen
docker-compose logs certbot

# Rate-Limit-Problem? Staging-Zertifikat testen:
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --staging \
    -d ihre-domain.de
```

### Container-Probleme
```bash
# Alle Container neu starten
docker-compose down
docker-compose up -d --build

# Status prüfen
docker-compose ps
```

## 🔐 SSL-Zertifikat Management

### Zertifikat manuell erneuern
```bash
docker-compose run --rm certbot renew
docker-compose restart nginx
```

### Zertifikat-Info anzeigen
```bash
docker-compose run --rm certbot certificates
```

### Neue Domain hinzufügen
```bash
# Nginx.conf bearbeiten und Domain hinzufügen
# Dann:
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    -d neue-domain.de
```

## 📈 Performance & Monitoring

### SSL-Rating testen
```bash
# SSL Labs Test (extern):
# https://www.ssllabs.com/ssltest/

# Lokal testen:
curl -I https://ihre-domain.de
```

### Website-Speed testen
```bash
# Response-Zeit messen:
curl -o /dev/null -s -w "Zeit: %{time_total}s\n" https://ihre-domain.de

# HTTP/2 Support prüfen:
curl -I --http2 https://ihre-domain.de
```

## ✅ Erfolgreich eingerichtet!

Nach dem Setup haben Sie:
- ✅ **HTTPS-Website** mit A+ SSL-Rating
- ✅ **Automatische HTTP→HTTPS Weiterleitung**
- ✅ **Let's Encrypt Zertifikat** (erneuert sich automatisch)
- ✅ **HTTP/2 Support** für bessere Performance
- ✅ **Security Headers** für zusätzlichen Schutz
- ✅ **Professional SEO-Setup** für Google

**Ihre Grema Website ist jetzt professionell live!**

---

## 📞 Support

Bei Problemen:
1. Container-Logs prüfen: `docker-compose logs`
2. DNS-Propagation kann 24h dauern
3. Let's Encrypt hat Rate-Limits (5 Zertifikate/Woche/Domain)