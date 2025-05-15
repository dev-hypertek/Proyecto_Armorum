#!/bin/bash

# deploy.sh - Script para deployment manual

echo "🔥 Iniciando deployment de Armorum..."

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 2. Build del frontend
echo "🏗️ Building frontend..."
npm run build

# 3. Deploy a Firebase Hosting
echo "🚀 Deploying a Firebase Hosting..."
firebase deploy --only hosting

# 4. Obtener URL
echo "✅ Deployment completado!"
echo "🌐 URL: https://armorum-financiero.web.app"
