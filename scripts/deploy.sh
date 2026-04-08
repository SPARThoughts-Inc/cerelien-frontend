#!/usr/bin/env bash
set -euo pipefail

echo "=== Cerelien Frontend Deployment ==="

echo "1. Running tests..."
npm run test

echo "2. Building..."
npm run build

echo "3. Firebase login (opening browser)..."
firebase login --reauth

echo "4. Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "=== Deployment complete ==="
echo "Site URL: https://cerelien-ai.web.app"
