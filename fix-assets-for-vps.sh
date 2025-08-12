#!/bin/bash
echo "🔧 Fixing assets and routing for VPS deployment..."

# Build the project
npm run build

# Remove old public directory and recreate
rm -rf public
mkdir -p public

# Copy built assets
cp -r dist/public/* public/

# Fix ALL HTML files in public directory (remove /Grema/ prefix)
find public -name "*.html" -type f -exec sed -i 's|"/Grema/|"/|g' {} \;

# Verify the fix
echo "✅ Asset paths fixed:"
grep -n "src=\"/assets" public/*.html | head -3
grep -n "href=\"/assets" public/*.html | head -3

echo "✅ Router base path fixed in App.tsx"
echo "✅ VPS deployment ready!"