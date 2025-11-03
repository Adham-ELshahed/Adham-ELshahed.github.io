#!/bin/bash
set -e

echo "Building for GitHub Pages with base path /PowerQueryGuide/"

# Build frontend with base path
cd client
npx vite build --base=/PowerQueryGuide/ --outDir=../dist/public --emptyOutDir
cd ..

# Copy JSON data files to dist/public
cp scripts/processed-functions.json dist/public/functions.json
cp scripts/processed-categories.json dist/public/categories.json

# Create .nojekyll file
touch dist/public/.nojekyll

# Create 404.html for SPA routing
cp dist/public/index.html dist/public/404.html

# Build server (optional, not needed for GitHub Pages)
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outDir=dist

echo "Build complete! Files are in dist/public/"
