# backend/deploy-cloud-run.sh
#!/bin/bash

# Variables de configuración
PROJECT_ID="armorum-financiero"
SERVICE_NAME="armorum-backend"
REGION="us-central1"

echo "🚀 Desplegando backend a Cloud Run..."

# 1. Configurar proyecto
gcloud config set project $PROJECT_ID

# 2. Build con Cloud Build
echo "🏗️ Building con Cloud Build..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

# 3. Deploy a Cloud Run
echo "☁️ Deploying a Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0 \
  --port 8080 \
  --set-env-vars "PROJECT_ID=$PROJECT_ID"

# 4. Obtener URL
echo "✅ Deployment completado!"
URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format='value(status.url)')
echo "🌐 Backend URL: $URL"
echo "📝 Actualiza VITE_API_URL en .env y GitHub secrets con: $URL"
