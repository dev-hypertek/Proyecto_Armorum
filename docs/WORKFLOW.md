# WORKFLOW DE DESARROLLO

## Estrategia de Branches

```
main (producción)
 ↑
develop (desarrollo)
 ↑
feature/nueva-funcionalidad
```

## Proceso de Mejoras

### 1. Desarrollo Local
```bash
# Crear feature branch
git checkout -b feature/integracion-llm

# Realizar cambios y commits
git add .
git commit -m "feat: integrar product_matcher_v2.py"

# Push a GitHub
git push origin feature/integracion-llm
```

### 2. Pull Request
- Crear PR de feature → develop
- Review de código
- Tests automáticos (si están configurados)

### 3. Deploy a Development
```bash
# Merge a develop activa deployment automático a:
# - Frontend: https://develop--armorum-financiero.web.app
# - Backend: desarrollo en Cloud Run
```

### 4. Deploy a Producción
```bash
# Merge develop → main activa deployment a:
# - Frontend: https://armorum-financiero.web.app  
# - Backend: producción en Cloud Run
```

## Scripts de Desarrollo

### Desarrollo Local (watch mode)
```bash
# Terminal 1: Backend
cd backend && python app/main.py

# Terminal 2: Frontend  
npm run dev

# Ambos con hot reload automático
```

### Build y Test
```bash
# Test build local
npm run build && npm run preview

# Deploy manual (solo si necesario)
./deploy.sh
```
