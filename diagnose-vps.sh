#!/bin/bash

echo "🔍 VPS Website Diagnostics"
echo "=========================="

echo "1. Container Status:"
docker-compose ps

echo -e "\n2. App Logs (last 10 lines):"
docker-compose logs app | tail -10

echo -e "\n3. Nginx Logs (last 5 lines):"
docker-compose logs nginx | tail -5

echo -e "\n4. Testing Homepage HTML:"
curl -s http://localhost/ | head -15

echo -e "\n5. Testing JavaScript Asset:"
JS_SIZE=$(curl -s -I http://localhost/assets/index-B4E_xV4-.js | grep -i content-length | cut -d' ' -f2)
echo "JavaScript Size: $JS_SIZE bytes"

echo -e "\n6. Testing CSS Asset:"
CSS_SIZE=$(curl -s -I http://localhost/assets/index-CdFCd3Jz.css | grep -i content-length | cut -d' ' -f2)
echo "CSS Size: $CSS_SIZE bytes"

echo -e "\n7. App Health Check:"
curl -s http://localhost:5000/ | head -5

echo -e "\n8. Port Check:"
netstat -tuln | grep -E "(80|5000)"

echo -e "\n=========================="
echo "📊 Diagnosis Complete"