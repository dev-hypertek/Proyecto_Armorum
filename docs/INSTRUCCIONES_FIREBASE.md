# ARMORUM - MIGRACIÓN A FIREBASE 🔥

## ✅ Cambios Realizados para Firebase

### 1. **Backend Migrado a Firestore**
- Eliminada dependencia de PostgreSQL
- Implementado `FirebaseService` con Firestore
- Todos los datos ahora se almacenan en Firestore
- Cache DIAN implementado en Firestore

### 2. **Preparado para Cloud Run**
- Dockerfile optimizado para Cloud Run
- Puerto 8080 (requerido por Cloud Run)
- Variables de entorno configuradas
- Logs estructurados

### 3. **Frontend Listo para Firebase Hosting**
- `firebase.json` configurado
- Variables de entorno para API URL
- Build optimizado para producción

## 🚀 Deployment a Firebase (Casi Gratis)

### Paso 1: Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### Paso 2: Configurar Firebase Project
```bash
# Login a Firebase
firebase login

# Inicializar proyecto
firebase init

# Seleccionar:
# ✅ Firestore
# ✅ Hosting  
# ✅ Functions (opcional)
```

### Paso 3: Deploy Backend a Cloud Run
```bash
cd backend

# Build and deploy (replace PROJECT_ID)
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/armorum-backend
gcloud run deploy armorum-backend \
  --image gcr.io/YOUR_PROJECT_ID/armorum-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --max-instances 100
```

### Paso 4: Deploy Frontend a Firebase Hosting
```bash
# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Paso 5: Configurar Variables de Entorno
```bash
# Obtener URL de Cloud Run
export REACT_APP_API_URL="https://armorum-backend-xxx.run.app"

# Rebuild y redeploy
npm run build
firebase deploy --only hosting
```

## 💰 Costos Estimados (Casi Gratis)

### Firebase Free Tier
- **Firestore**: 1 GB storage, 50k reads/day, 20k writes/day
- **Cloud Run**: 2M requests/month, 360k GB-seconds compute
- **Hosting**: 10 GB storage, 10 GB transfer/month
- **Functions**: 2M invocations/month

### Para MVP de Armorum:
- **Estimado mensual**: $0 - $5 USD
- **Escalabilidad**: Hasta 1000 lotes/mes sin costos
- **100% en Google Cloud**: Sin dependencias externas

## 🔧 Desarrollo Local con Docker

```bash
# Iniciar stack completa
docker-compose up

# URLs:
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
```

## 📁 Estructura Final del Proyecto

```
proyecto-armorum/
├── backend/                 # Cloud Run API
│   ├── app/
│   │   ├── main.py         # FastAPI app
│   │   ├── services/
│   │   │   └── firebase_service.py
│   │   └── config.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── deploy.sh
├── src/                    # React frontend
├── firebase.json           # Firebase config
├── firestore.rules         # Security rules
├── firestore.indexes.json  # DB indexes
└── docker-compose.yml
```

## 🚨 Consideraciones Importantes

### 1. **Firestore Security Rules**
Actualmente están **ABIERTAS** para MVP. En producción:
```javascript
// Implementar autenticación
match /{document=**} {
  allow read, write: if request.auth != null;
}
```

### 2. **Límites del Free Tier**
- **Reads**: 50k/day → ~1600 lotes/día
- **Writes**: 20k/day → ~650 nuevos lotes/día  
- **Storage**: 1GB → ~100k documentos

### 3. **Monitoreo Recomendado**
```bash
# Ver usage en Firebase Console
firebase console
# → Usage and billing
```

## 📝 Próximos Pasos Post-MVP

1. **Autenticación Firebase Auth**
   - Login/logout usuarios
   - Roles y permisos

2. **Integración Script LLM**
   - Cloud Functions para procesar productos
   - Integrar `product_matcher_v2.py`

3. **DIAN Real**
   - API oficial DIAN
   - Web scraping robusto

4. **Optimizaciones**
   - Cache inteligente
   - Batch processing
   - Background jobs

## ✅ Estado Final MVP Firebase

- **✅ Backend**: Cloud Run + Firestore
- **✅ Frontend**: Firebase Hosting
- **✅ Database**: Firestore (NoSQL)
- **✅ Files**: Cloud Storage (para archivos grandes)
- **✅ Logs**: Firestore collections
- **✅ Cache DIAN**: Firestore con TTL
- **✅ Deployment**: Scripts automatizados
- **✅ Costo**: ~$0-5/mes para MVP

¡El proyecto está **listo para deploy en Firebase** con costos mínimos! 🎉
