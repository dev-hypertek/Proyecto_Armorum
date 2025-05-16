# PLAN DE TESTING INTEGRAL - SISTEMA ARMORUM

## 🎯 OBJETIVOS DEL TESTING

1. **Verificar funcionalidad end-to-end** de todos los módulos
2. **Identificar y documentar bugs** en el flujo de procesamiento
3. **Validar la robustez** del sistema con diferentes tipos de archivos
4. **Comprobar la UI/UX** y experiencia del usuario
5. **Evaluar el rendimiento** del sistema bajo carga
6. **Verificar la integridad** de la integración Frontend-Backend-Firestore

## 📋 FASE 1: TESTING DE FORMATOS DE ARCHIVO

### A. Testing de Detección Automática de Formato
**Objetivo**: Verificar que el sistema detecte correctamente todos los formatos

#### Test Cases:
1. **TC_F1_001**: Cargar archivo XML válido
   - **Input**: `facturas_ejemplo_dian.xml`
   - **Expected**: Detección como "XML", procesamiento exitoso
   - **Validar**: 
     - Estado del lote: "Procesando" → "Completado/Completado con Advertencias"
     - Registros procesados > 0
     - Logs de procesamiento correctos

2. **TC_F1_002**: Cargar archivo CSV válido
   - **Input**: `facturas_ejemplo_panaderia.csv`
   - **Expected**: Detección como "CSV/Excel", procesamiento exitoso
   - **Validar**: Columnas detectadas correctamente

3. **TC_F1_003**: Cargar archivo Excel (.xls/.xlsx)
   - **Input**: `ENTRADA_Formato_Cliente.xls`
   - **Expected**: Detección como "CSV/Excel", procesamiento exitoso

4. **TC_F1_004**: Cargar archivo TXT
   - **Input**: `facturas_ejemplo_txt.txt`
   - **Expected**: Detección como "TXT", análisis de estructura

5. **TC_F1_005**: Cargar archivo con extensión incorrecta
   - **Input**: Archivo XML con extensión .csv
   - **Expected**: Detección automática por contenido, no por extensión

### B. Testing de Límites y Validaciones
6. **TC_F1_006**: Archivo muy grande (>50MB)
   - **Expected**: Error HTTP 413 "Archivo muy grande"

7. **TC_F1_007**: Archivo corrupto/no válido
   - **Expected**: Error en procesamiento, estado "Error"

8. **TC_F1_008**: Archivo vacío
   - **Expected**: Error "El archivo no contiene datos"

## 📊 FASE 2: TESTING DE FUNCIONALIDADES BACKEND

### A. Endpoints API Testing
**Objetivo**: Verificar que todos los endpoints respondan correctamente

#### Test Cases:
9. **TC_B1_001**: GET `/` - Health Check
   - **Expected**: `{"message": "Armorum API funcionando en Firebase"}`

10. **TC_B1_002**: POST `/api/facturas/cargar` - Carga completa
    - **Input**: Archivo + clienteId + formatoArchivo
    - **Validar**: 
      - Respuesta exitosa con loteId
      - Lote creado en Firestore
      - Logs iniciales generados

11. **TC_B1_003**: GET `/api/facturas/lotes` - Paginación
    - **Test**: page=1, limit=10
    - **Validar**: Estructura de respuesta correcta, paginación funcional

12. **TC_B1_004**: GET `/api/facturas/lotes/{id}` - Detalle de lote
    - **Validar**: 
      - Información completa del lote
      - Logs asociados
      - Errores categorizados

13. **TC_B1_005**: GET `/api/facturas/lotes/{id}/descargar` - Descarga plantilla
    - **Prerequisito**: Lote en estado "Completado" o "Completado con Advertencias"
    - **Validar**: Archivo Excel descargado con estructura correcta

### B. Testing de Simulación IA y DIAN
14. **TC_B2_001**: Simulación de errores de IA (productos sin BMC)
    - **Expected**: ~5% de errores tipo "PRODUCTO"
    - **Validar**: Errores distribuidos aleatoriamente

15. **TC_B2_002**: Simulación de errores DIAN (NITs no encontrados)
    - **Expected**: ~5% de errores tipo "NIT_COMPRADOR"
    - **Validar**: Excepciones DIAN creadas correctamente

16. **TC_B2_003**: Testing de excepciones DIAN
    - **Endpoints**: 
      - GET `/api/terceros/excepciones`
      - POST `/api/terceros/excepciones/{id}/{action}`
    - **Validar**: Estados correctos (Pendiente, Corregida, etc.)

## 🖼️ FASE 3: TESTING DE FRONTEND E INTERFAZ

### A. Testing de UI/UX
**Objetivo**: Verificar la experiencia completa del usuario

#### Test Cases:
17. **TC_UI_001**: Navegación inicial
    - **Validar**: Dashboard carga correctamente
    - **Acceso**: https://armorum-financiero.web.app/

18. **TC_UI_002**: Carga de archivo por drag & drop
    - **Validar**: Feedback visual inmediato
    - **Validar**: Progreso de carga visible

19. **TC_UI_003**: Selección de cliente
    - **Validar**: Lista desplegable funciona correctamente
    - **Validar**: Clientes: Comiagro, Olímpica, Cliente Regional

20. **TC_UI_004**: Tabla de lotes
    - **Validar**: 
      - Columnas visibles: ID, Archivo, Fecha, Cliente, Estado, Registros, Errores
      - Estados con colores diferentes
      - Acciones disponibles según estado

21. **TC_UI_005**: Modal de detalles de lote
    - **Validar**: 
      - Información completa
      - Logs en orden cronológico
      - Errores agrupados por tipo

22. **TC_UI_006**: Modal de errores de validación
    - **Validar**: Tabla con errores detallados
    - **Validar**: Filtros por tipo de error

### B. Testing de Responsive Design
23. **TC_UI_007**: Vista en dispositivos móviles
24. **TC_UI_008**: Vista en tablets
25. **TC_UI_009**: Vista en desktop (diferentes resoluciones)

## 🔄 FASE 4: TESTING DE INTEGRACIÓN E2E

### A. Flujo Completo de Procesamiento
**Objetivo**: Verificar el flujo end-to-end completo

#### Test Cases:
26. **TC_E2E_001**: Flujo completo exitoso
    - **Pasos**:
      1. Cargar archivo CSV válido
      2. Seleccionar cliente "Comiagro"
      3. Esperar procesamiento completo
      4. Verificar estado "Completado con Advertencias"
      5. Descargar plantilla generada
    - **Validar**: Cada paso completa exitosamente

27. **TC_E2E_002**: Flujo con errores críticos
    - **Pasos**:
      1. Cargar archivo corrupto
      2. Verificar estado "Error"
      3. Revisar logs de error
      4. Confirmar que descarga no está disponible

28. **TC_E2E_003**: Gestión de excepciones DIAN
    - **Pasos**:
      1. Procesar archivo que genere excepciones DIAN
      2. Ir a módulo de validación de terceros
      3. Gestionar una excepción (corregir, crear, ignorar)
      4. Verificar cambio de estado

### B. Testing de Concurrencia
29. **TC_E2E_004**: Múltiples cargas simultáneas
    - **Test**: Cargar 3-5 archivos simultáneamente
    - **Validar**: Todos se procesan correctamente

30. **TC_E2E_005**: Navegación durante procesamiento
    - **Test**: Cambiar de página mientras se procesa archivo
    - **Validar**: Estado persiste correctamente

## ⚡ FASE 5: TESTING DE RENDIMIENTO Y CARGA

### A. Testing de Performance
**Objetivo**: Evaluar el rendimiento bajo diferentes cargas

#### Test Cases:
31. **TC_PERF_001**: Archivo grande (máximo permitido)
    - **Input**: Archivo de ~49MB
    - **Validar**: Tiempo de procesamiento razonable (<2 min)

32. **TC_PERF_002**: Archivo con muchos registros
    - **Input**: CSV con 10,000+ filas
    - **Validar**: Sistema maneja sin crash

33. **TC_PERF_003**: Múltiples usuarios simultáneos
    - **Simular**: 10 usuarios cargando archivos simultáneamente
    - **Validar**: Auto-scaling de Cloud Run funciona

### B. Testing de Memoria y Recursos
34. **TC_PERF_004**: Monitoreo de memoria
    - **Validar**: No hay memory leaks en frontend
    - **Validar**: Backend libera recursos correctamente

## 🔒 FASE 6: TESTING DE SEGURIDAD Y CONFIGURACIÓN

### A. Testing de Seguridad
**Objetivo**: Verificar aspectos de seguridad básicos

#### Test Cases:
35. **TC_SEC_001**: CORS Configuration
    - **Validar**: Solo dominios permitidos pueden acceder
    - **Test**: Llamadas desde dominios no autorizados

36. **TC_SEC_002**: File Upload Security
    - **Test**: Intentar cargar scripts maliciosos
    - **Expected**: Solo archivos permitidos pasan validación

37. **TC_SEC_003**: SQL Injection Simulation
    - **Test**: Intentar inyección en nombres de archivo
    - **Expected**: Sistema sanitiza inputs correctamente

### B. Testing de Configuración
38. **TC_CONF_001**: Variables de entorno
    - **Validar**: `.env` configurado correctamente
    - **Validar**: URLs de API apuntan a ambiente correcto

39. **TC_CONF_002**: Firebase Configuration
    - **Validar**: Conexión Firestore exitosa
    - **Validar**: Reglas de seguridad funcionando

40. **TC_CONF_003**: Cloud Run Configuration
    - **Validar**: Auto-scaling configurado
    - **Validar**: Health checks respondiendo

## 📝 CRITERIOS DE ACEPTACIÓN

### ✅ Criterios de Éxito:
- **100% de test cases críticos** (TC_F1_001-005, TC_B1_001-005, TC_E2E_001-003) pasan
- **>95% de test cases totales** pasan exitosamente
- **Tiempo de respuesta** < 3 segundos para archivos < 5MB
- **Zero crashes** durante testing de carga
- **UI funcional** en Chrome, Firefox, Safari
- **Mobile responsive** sin problemas críticos

### 🚨 Criterios de Fallo Crítico:
- Sistema no procesa archivos de ejemplo correctamente
- Errores 500 en endpoints principales
- Pérdida de datos en Firestore
- Frontend no carga o presenta errores JavaScript críticos
- Descarga de plantillas genera archivos corruptos

## 🐛 PROTOCOLO DE REPORTE DE BUGS

Para cada bug encontrado, documentar:

```markdown
## Bug #[ID]
**Severidad**: Crítico/Alto/Medio/Bajo
**Módulo**: [Frontend/Backend/Integración]
**Test Case**: TC_X_XXX
**Descripción**: [Descripción concisa del problema]
**Pasos para Reproducir**:
1. Paso 1
2. Paso 2
3. Paso 3
**Resultado Esperado**: [Lo que debería ocurrir]
**Resultado Actual**: [Lo que realmente ocurre]
**Evidencias**: [Screenshots, logs, etc.]
**Impacto**: [Cómo afecta al usuario/sistema]
**Workaround**: [Solución temporal si existe]
```

## 📊 HERRAMIENTAS DE TESTING

1. **Manual Testing**: Para flujos E2E y UI/UX
2. **Postman/Insomnia**: Para testing de APIs
3. **Browser DevTools**: Para debugging y performance
4. **Firebase Console**: Para verificar datos en Firestore
5. **Google Cloud Console**: Para monitorar Cloud Run
6. **Network Throttling**: Para simular conexiones lentas

## 🚀 EJECUCIÓN DEL PLAN

1. **Preparación** (1 día):
   - Setup de ambiente de testing
   - Preparación de archivos de prueba
   - Configuración de herramientas

2. **Ejecución por Fases** (5 días):
   - Fase 1-2: 1 día
   - Fase 3-4: 2 días  
   - Fase 5-6: 1 día
   - Documentación de bugs: 1 día

3. **Análisis y Reporte** (1 día):
   - Consolidación de resultados
   - Priorización de bugs
   - Recomendaciones de mejora

## 📈 MÉTRICAS DE ÉXITO

- **Coverage**: % de funcionalidades probadas
- **Pass Rate**: % de tests exitosos
- **Bug Rate**: Bugs encontrados por hora de testing
- **Severity Distribution**: Distribución de bugs por severidad
- **Performance Baseline**: Métricas de rendimiento establecidas