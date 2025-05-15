#!/bin/bash

# Instalar dependencias del backend
echo "Instalando dependencias del backend..."
cd backend
pip install -r requirements.txt

# Volver al directorio principal
cd ..

# Mensaje de instrucciones
echo "=================================================="
echo "            ARMORUM BACKEND CONFIGURADO           "
echo "=================================================="
echo ""
echo "Para ejecutar el proyecto:"
echo ""
echo "1. OPCIÓN DOCKER (Recomendado):"
echo "   docker-compose up"
echo ""
echo "2. OPCIÓN MANUAL:"
echo "   Terminal 1: cd backend && python app/main.py"
echo "   Terminal 2: npm run dev"
echo ""
echo "El backend estará en: http://localhost:8000"
echo "El frontend estará en: http://localhost:3000"
echo ""
echo "=================================================="
