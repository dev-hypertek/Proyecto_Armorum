# 🔧 SOLUCIONAR PERMISOS CLOUD RUN

## Opción 1: IAM en Google Cloud Console
1. Ve a: https://console.cloud.google.com/iam-admin/iam?project=armorum-financiero
2. Busca: hypertek.founders@gmail.com
3. Agrega roles:
   - Cloud Build Service Account
   - Cloud Run Developer
   - Storage Admin
   - Service Account User

## Opción 2: Usar cuenta con más permisos
Si tienes otra cuenta de Google con owner access:
1. `gcloud auth login [otra-cuenta@gmail.com]`
2. Volver a ejecutar `./deploy-cloud-run.sh`

## Opción 3: Usar diferente deployment method
Deploy directo sin Cloud Build:

```bash
# Build local y push
docker build -t armorum-backend .
docker tag armorum-backend gcr.io/armorum-financiero/armorum-backend
docker push gcr.io/armorum-financiero/armorum-backend

# Deploy
gcloud run deploy armorum-backend \
  --image gcr.io/armorum-financiero/armorum-backend \
  --region us-central1 \
  --allow-unauthenticated
```

## Nota
Por ahora el backend local funciona perfectamente. 
Solucionaremos Cloud Run después del test completo.
