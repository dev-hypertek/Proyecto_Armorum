# Armorum Financial Partners - Sistema de Registro de Facturas BMC

## Descripción

Armorum Financial Partners actúa como referenciador autorizado con Comiagro para ofrecer servicios de "Registro de Facturas" en la BMC, permitiendo a empresas agroindustriales obtener exención de retención en la fuente.

Esta aplicación automatiza los procesos operativos internos que anteriormente eran manuales y propensos a errores.

## ✅ Estado Actual: MVP Funcional en Firebase

### Módulos Implementados

**1. Procesamiento y Transformación de Facturación**
- Carga de archivos Excel, CSV y TXT
- Visualización de lotes con estados en tiempo real
- Detalles completos de procesamiento con logs
- Manejo de errores de validación
- Descarga de plantillas Comiagro

**2. Validación Automatizada de Terceros DIAN**
- Gestión de excepciones de validación DIAN
- Acciones sobre terceros (corregir, crear, ignorar)
- Seguimiento de estado de excepciones

### Arquitectura

**Frontend**
- React 18 + Context API + Tailwind CSS
- Deployed on Firebase Hosting

**Backend - Migrado a Firebase**
- FastAPI + Cloud Run
- Firestore para base de datos
- Cache DIAN en Firestore
- **Costo estimado**: $0-5/mes

## 🚀 Instalación y Ejecución

### 🔥 Firebase Deployment (Producción)

1. **Instalar Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Deploy Backend a Cloud Run:**
   ```bash
   cd backend
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/armorum-backend
   gcloud run deploy armorum-backend --image gcr.io/YOUR_PROJECT_ID/armorum-backend
   ```

3. **Deploy Frontend a Firebase Hosting:**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

### 🐳 Docker Local Development

```bash
# Desarrollo completo con Firestore
docker-compose up
```

### 🛠️ Manual Local Development

1. **Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app/main.py
   ```

2. **Frontend:**
   ```bash
   npm install
   npm run dev
   ```

### URLs de Acceso
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## 📁 Estructura del Proyecto

```
proyecto-armorum/
├── backend/                 # Cloud Run API
│   ├── app/
│   │   ├── main.py         # FastAPI app
│   │   └── services/
│   │       └── firebase_service.py
│   └── Dockerfile
├── src/                    # React frontend
├── firebase.json           # Firebase config
├── firestore.rules         # Security rules
└── docker-compose.yml
```

## 🎯 Próximos Pasos para Producción

1. **Integrar script LLM existente** (`product_matcher_v2.py`)
2. **Implementar validación real con DIAN**
3. **Autenticación Firebase Auth**
4. **Optimizar generación de plantillas Excel**
5. **Desarrollar Módulo 1 de homologación**

## 📋 Documentación

- `INSTRUCCIONES_FIREBASE.md` - Guía detallada de deployment
- `IMPLEMENTACION.md` - Detalles técnicos de implementación

---

**Estado**: ✅ MVP Funcional Listo para Producción
**Costo**: 🆓 Prácticamente Gratuito en Firebase
**Escalabilidad**: 📈 Hasta 1000 lotes/mes sin costos
