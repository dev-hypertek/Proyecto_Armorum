FROM python:3.11-slim

WORKDIR /app

# Variable de entorno para el puerto
ENV PORT 8080
ENV PYTHONUNBUFFERED True

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Exponer puerto 8080 (requerido por Cloud Run)
EXPOSE 8080

# Comando optimizado para Cloud Run
CMD exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
