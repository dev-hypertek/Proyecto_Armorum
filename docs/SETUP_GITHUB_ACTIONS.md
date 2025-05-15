# 🔑 SETUP GITHUB ACTIONS - GUÍA MANUAL

## Paso 1: Obtener Service Account Firebase

1. **Ve a Firebase Console:**
   ```
   https://console.firebase.google.com/project/armorum-financiero
   ```

2. **Project Settings > Service Accounts:**
   - Click "Generate new private key"
   - Descargar JSON file

3. **Copiar TODO el JSON como secret en GitHub**

## Paso 2: Configurar Secrets en GitHub

Ve a: `https://github.com/dev-hypertek/Proyecto_Armorum/settings/secrets/actions`

**Crear estos secrets:**

### Secrets de Firebase
```
FIREBASE_SERVICE_ACCOUNT = [TODO EL JSON DEL SERVICE ACCOUNT]
```

### Secrets del Frontend
```
VITE_FIREBASE_API_KEY = "tu-api-key"
VITE_FIREBASE_AUTH_DOMAIN = "armorum-financiero.firebaseapp.com"  
VITE_FIREBASE_PROJECT_ID = "armorum-financiero"
VITE_FIREBASE_STORAGE_BUCKET = "armorum-financiero.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID = "123456789"
VITE_FIREBASE_APP_ID = "1:123456789:web:abc123"
VITE_API_URL = "https://tu-cloud-run-url.run.app"
```

## Paso 3: Verificar Workflow

Los workflows ya están en `.github/workflows/`
- `firebase-hosting.yml` (main branch → producción)
- `firebase-hosting-dev.yml` (develop branch → desarrollo)

## Paso 4: Test

```bash
# 1. Commit cualquier cambio
git add .
git commit -m "test: deploy automatico"
git push origin main

# 2. Ve a GitHub Actions tab
# Debería ejecutarse automáticamente
```

## Notas Importantes

### Obtener Firebase Config
```bash
# En Firebase Console > Project Settings
# Scroll down to "Your apps" section
# Select Web app
# Copy config object
```

### URLs resultantes
- **Producción**: https://armorum-financiero.web.app
- **Desarrollo**: https://develop--armorum-financiero.web.app
