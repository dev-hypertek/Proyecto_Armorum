# Firebase Project ID (replace with your actual project ID)
FIREBASE_PROJECT_ID = "armorum-project"

# Firestore Collections
COLLECTIONS = {
    "LOTES": "lotes",
    "LOGS": "logs", 
    "ERRORES": "errores",
    "EXCEPCIONES_DIAN": "excepciones_dian",
    "DIAN_CACHE": "dian_cache"
}

# DIAN Cache TTL (days)
DIAN_CACHE_TTL_DAYS = 30

# File upload settings
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB
ALLOWED_EXTENSIONS = ['.xlsx', '.xls', '.csv', '.txt']
