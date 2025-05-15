# Documentación de Implementación: Módulos de Facturación y Validación DIAN

## Resumen del Proyecto

Este documento describe la implementación de dos módulos críticos para Armorum Financial Partners dentro del dashboard `material-dashboard-react`:

1. **Módulo de Procesamiento y Transformación de Facturación (Módulo 2)**
2. **Módulo de Validación Automatizada de Terceros - DIAN (Módulo 3)**

## Estructura Implementada

La implementación incluye los siguientes componentes y archivos:

### Servicios API
- `/src/services/api.js`: Implementa funciones para comunicación con la API Backend (incluye datos mock temporales)

### Gestión de Estado
- `/src/contexts/FacturasContext.jsx`: Contexto para gestionar el estado del módulo de facturas
- `/src/contexts/TercerosContext.jsx`: Contexto para gestionar el estado del módulo de validación de terceros

### Componentes del Módulo de Facturas
- `/src/components/Facturas/CargaArchivo.jsx`: Componente para subir archivos
- `/src/components/Facturas/TablaLotes.jsx`: Tabla para visualizar lotes de procesamiento
- `/src/components/Facturas/DetallesLote.jsx`: Modal para ver detalles de un lote
- `/src/components/Facturas/ErroresValidacion.jsx`: Modal para ver errores de validación
- `/src/pages/facturas/ProcesamientoFacturas.jsx`: Página principal del módulo de facturas

### Componentes del Módulo de Validación de Terceros
- `/src/components/Terceros/TablaExcepciones.jsx`: Tabla para visualizar excepciones DIAN
- `/src/components/Terceros/AccionesTercero.jsx`: Componente para gestionar acciones sobre excepciones
- `/src/pages/terceros/ValidacionTerceros.jsx`: Página principal del módulo de validación de terceros

### Integraciones
- Actualizado `Sidebar.jsx` para incluir nuevos elementos de menú
- Actualizado `App.jsx` para incluir nuevas rutas y providers

## Flujos de Trabajo Implementados

### Procesamiento de Facturas
1. Usuario selecciona un cliente y carga un archivo de facturación
2. Sistema valida formato del archivo y muestra feedback
3. Sistema procesa el archivo (simulado) y actualiza la lista de lotes
4. Usuario puede ver detalles del lote, incluyendo logs de procesamiento
5. Si hay errores, el usuario puede verlos para tomar acciones correctivas
6. Si el lote está completado, el usuario puede descargar la plantilla Comiagro

### Validación de Terceros
1. Sistema muestra excepciones de validación DIAN
2. Usuario puede gestionar cada excepción:
   - Marcar como corregida (si ha actualizado la información)
   - Marcar para creación manual
   - Ignorar (si no es crítica)
3. Sistema actualiza el estado de las excepciones

## Funcionalidades por Componente

### CargaArchivo.jsx
- Selección de cliente desde lista desplegable
- Carga de archivos mediante drag & drop o selector
- Validación básica de formato de archivo
- Envío del archivo al backend para procesamiento

### TablaLotes.jsx
- Visualización de lotes en formato tabular
- Columnas: ID, Nombre Archivo, Fecha, Cliente, Estado, Registros, Errores
- Acciones disponibles según el estado del lote
- Integración con modales para detalles y errores

### DetallesLote.jsx
- Visualización completa de información de un lote
- Sección de información básica
- Visualización de logs de procesamiento
- Interfaz en formato modal

### ErroresValidacion.jsx
- Visualización de errores detectados durante el procesamiento
- Tabla con detalle por fila, campo y descripción del error
- Opciones para exportar los errores
- Notas sobre consecuencias de los errores

### ProcesamientoFacturas.jsx
- Integración de componentes del módulo de facturas
- Gestión de mensajes informativos/error
- Estructura principal de la página

### TablaExcepciones.jsx
- Visualización de excepciones DIAN en formato tabular
- Columnas: ID Lote, Fila, Documento, Nombre, Estado, Fecha, Notas
- Acciones disponibles según el estado de la excepción
- Integración con modal para gestionar acciones

### AccionesTercero.jsx
- Formulario para gestionar una excepción
- Opciones: Corregir, Crear manualmente, Ignorar
- Campo para notas adicionales
- Interfaz en formato modal

### ValidacionTerceros.jsx
- Integración de componentes del módulo de terceros
- Información explicativa sobre el proceso de validación
- Estructura principal de la página

## Notas Técnicas

### 1. Datos Mock
La implementación actual utiliza datos mock para simular las respuestas de la API:
- Los lotes se muestran con estados diversos (Procesando, Error, Completado)
- Las excepciones de terceros tienen datos representativos
- Las funciones simulan tiempos de respuesta para una experiencia realista

### 2. Comunicación Frontend-Backend
La arquitectura está diseñada para una clara separación:
- El frontend se enfoca en la interfaz y experiencia de usuario
- El backend (pendiente) manejará toda la lógica pesada
- Se han definido endpoints claros en el servicio API

### 3. Manejo de Estado
- Context API maneja el estado de cada módulo
- Los providers en App.jsx proporcionan el estado a toda la aplicación
- Se utilizan efectos para simular la carga periódica de datos

## Información para el Equipo de Backend

La implementación del frontend asume que el backend proporcionará las siguientes APIs:

### Módulo de Facturas
- `POST /api/facturas/cargar`: Para subir archivos de facturación
  - Input: FormData con archivo y clienteId
  - Output: Detalles del lote creado

- `GET /api/facturas/lotes`: Para obtener lista de lotes procesados
  - Output: Array de lotes con sus estados

- `GET /api/facturas/lotes/{id}`: Para obtener detalles de un lote específico
  - Output: Detalles completos incluyendo logs y errores

- `GET /api/facturas/lotes/{id}/descargar`: Para descargar la plantilla Comiagro
  - Output: Archivo Excel (blob)

### Módulo de Terceros
- `GET /api/terceros/excepciones`: Para obtener lista de excepciones DIAN
  - Output: Array de excepciones con sus estados

- `POST /api/terceros/excepciones/{id}/{accion}`: Para actualizar estado de una excepción
  - Input: Datos adicionales (ej. notas)
  - Output: Confirmación de actualización

## Próximos Pasos

1. Implementar autenticación para proteger las rutas y APIs
2. Desarrollar pruebas unitarias para los componentes
3. Mejorar la experiencia móvil (responsive design)
4. Integrar con un backend real
5. Implementar el Módulo 1 (Homologación de Códigos BMC)

---

## Instrucciones para Desarrolladores

Para continuar con el desarrollo de este proyecto:

1. Revisar la estructura de componentes implementada
2. Verificar el funcionamiento con datos mock
3. Desarrollar el backend siguiendo las especificaciones de API
4. Reemplazar las llamadas mock por llamadas reales
5. Probar la integración completa

La arquitectura está diseñada para facilitar esta transición con cambios mínimos en el frontend.
