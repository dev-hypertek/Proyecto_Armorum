#!/bin/bash

# deploy-alternative.sh - Deploy alternativo con Docker

echo "🚀 Deploy alternativo a Cloud Run usando Docker..."

# Variables
PROJECT_ID="armorum-financiero"
SERVICE_NAME="armorum-backend"
REGION="us-central1"

# 1. Build imagen local
echo "🏗️ Building imagen Docker local..."
docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME .

# 2. Push usando docker
echo "📤 Pushing imagen a Registry..."
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME

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
