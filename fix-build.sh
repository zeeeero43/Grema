#!/bin/bash
# Fix build assets for VPS deployment
echo "🔧 Fixing build assets for VPS deployment..."

# Build the project
npm run build

# Copy assets to public directory
mkdir -p public
cp -r dist/public/* public/

# Fix asset paths in index.html (remove /Grema/ prefix)
sed -i 's|"/Grema/|"/|g' public/index.html

echo "✅ Build fix complete - assets ready for VPS deployment"