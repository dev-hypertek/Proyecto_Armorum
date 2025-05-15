#!/bin/bash

# Armorum Cloud Run Deployment Script

# Variables
PROJECT_ID="armorum-project"  # Replace with your Firebase project ID
SERVICE_NAME="armorum-backend"
REGION="us-central1"

echo "Deploying Armorum Backend to Google Cloud Run..."

# Build and deploy to Cloud Run
gcloud builds submit --tag gcr.io/${PROJECT_ID}/${SERVICE_NAME} .

# Deploy to Cloud Run
gcloud run deploy ${SERVICE_NAME} \
    --image gcr.io/${PROJECT_ID}/${SERVICE_NAME} \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 100 \
    --set-env-vars="FIREBASE_PROJECT_ID=${PROJECT_ID}"

echo "Deployment complete!"
echo "Service URL: https://${SERVICE_NAME}-${REGION}.a.run.app"
