#!/bin/bash

# quick-deploy.sh
# Deploy rápido sin GitHub Actions

echo "🚀 Deploy rápido a Firebase..."

# 1. Asegurar que estés loggeado
firebase login

# 2. Seleccionar proyecto
firebase use armorum-financiero

# 3. Install dependencies
npm install

# 4. Build
npm run build

# 5. Deploy
firebase deploy --only hosting

# 6. Mostrar URL
echo "✅ Deploy completado!"
echo "🌐 URL: https://armorum-financiero.firebaseapp.com"
