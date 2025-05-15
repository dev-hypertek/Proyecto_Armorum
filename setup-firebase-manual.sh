#!/bin/bash

# setup-firebase-manual.sh
# Setup Firebase sin depender de GitHub integration automática

echo "🔥 Configurando Firebase manualmente..."

# 1. Initialize Firebase en el proyecto
echo "📦 Inicializando Firebase..."
firebase init firestore hosting --project armorum-financiero

# 2. Confirmar estructura
echo "📁 Verificando estructura..."
cat firebase.json

# 3. Build y test local
echo "🏗️ Build del proyecto..."
npm install
npm run build

# 4. Deploy manual
echo "🚀 Deploy a Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Setup completado!"
echo "🌐 Tu app estará en: https://armorum-financiero.web.app"
