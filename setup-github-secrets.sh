#!/bin/bash

# setup-github-secrets.sh
# Script para configurar secrets de GitHub via CLI

echo "🔑 Configurando GitHub Secrets para Firebase..."

# Variables necesarias - REEMPLAZA CON TUS VALORES REALES
REPO="brandowleon/Proyecto_Armorum"
FIREBASE_API_KEY="tu-api-key-aqui"
FIREBASE_AUTH_DOMAIN="armorum-financiero.firebaseapp.com"
FIREBASE_PROJECT_ID="armorum-financiero"
FIREBASE_STORAGE_BUCKET="armorum-financiero.appspot.com"
FIREBASE_MESSAGING_SENDER_ID="123456789"
FIREBASE_APP_ID="1:123456789:web:abcdef123456"
API_URL="https://tu-cloud-run-url.run.app"

# Configurar secrets (requiere GitHub CLI)
gh secret set VITE_FIREBASE_API_KEY -b"$FIREBASE_API_KEY" -R "$REPO"
gh secret set VITE_FIREBASE_AUTH_DOMAIN -b"$FIREBASE_AUTH_DOMAIN" -R "$REPO"
gh secret set VITE_FIREBASE_PROJECT_ID -b"$FIREBASE_PROJECT_ID" -R "$REPO"
gh secret set VITE_FIREBASE_STORAGE_BUCKET -b"$FIREBASE_STORAGE_BUCKET" -R "$REPO"
gh secret set VITE_FIREBASE_MESSAGING_SENDER_ID -b"$FIREBASE_MESSAGING_SENDER_ID" -R "$REPO"
gh secret set VITE_FIREBASE_APP_ID -b"$FIREBASE_APP_ID" -R "$REPO"
gh secret set VITE_API_URL -b"$API_URL" -R "$REPO"

echo "✅ Secrets configurados en GitHub!"

# Para obtener el service account:
echo "📝 Siguiente paso: Configurar FIREBASE_SERVICE_ACCOUNT"
echo "1. Ve a Firebase Console > Project Settings"
echo "2. Service Accounts > Generate new private key"
echo "3. Copia el JSON completo como secret FIREBASE_SERVICE_ACCOUNT"
