# Armorum Financial Partners - Sistema de Registro de Facturas BMC

Este proyecto implementa una interfaz de usuario para la gestión de registro de facturas en la Bolsa Mercantil de Colombia (BMC) para Armorum Financial Partners.

## Descripción

Armorum Financial Partners actúa como referenciador autorizado en colaboración con la firma comisionista Comiagro, ofreciendo a sus clientes el servicio de "Registro de Facturas" en la BMC. Este servicio permite a empresas agroindustriales obtener exención de retención en la fuente para sus facturas de productos registrados.

Esta aplicación automatiza y sistematiza los procesos operativos internos de Armorum que anteriormente eran manuales y propensos a errores.

## Módulos Implementados

### 1. Módulo de Procesamiento y Transformación de Facturación (Módulo 2)

Este módulo permite:
- Cargar archivos de facturación desde diferentes formatos (Excel, CSV, texto plano)
- Ver el historial de lotes procesados y su estado
- Ver detalles específicos de cada lote
- Identificar errores de validación
- Descargar la plantilla final en formato Comiagro

### 2. Módulo de Validación Automatizada de Terceros - DIAN (Módulo 3)

Este módulo permite:
- Ver excepciones de validación de terceros ante la DIAN
- Gestionar las excepciones (marcar como corregidas, para creación manual o ignorar)
- Dar seguimiento al estado de las excepciones

## Arquitectura

La aplicación se divide en dos partes:

### Frontend
- Implementado con React y Material-UI
- Utiliza Context API para la gestión del estado
- Interfaces de usuario para la carga, visualización y gestión de datos

### Backend (Pendiente por implementar)
- API RESTful para la lógica de procesamiento
- Análisis de archivos y extracción de datos
- Validación de datos y reglas de negocio
- Conexión con la DIAN para validación de terceros
- Generación de plantillas Comiagro

## Puntos Destacados

- **Trazabilidad**: Logs detallados del procesamiento de cada lote
- **Validación**: Identificación temprana de errores para evitar problemas con la DIAN
- **Automatización**: Reducción drástica del tiempo de procesamiento
- **Escalabilidad**: Capacidad para manejar grandes volúmenes de facturación

## Requisitos Técnicos

- Node.js 16+
- npm o yarn
- React 18+
- Material-UI 5+

## Instalación

1. Clonar este repositorio
2. Instalar dependencias:
   ```
   npm install
   ```
3. Iniciar la aplicación:
   ```
   npm run dev
   ```

## Estado Actual

El proyecto se encuentra en fase de desarrollo. Los componentes frontend están implementados con datos mock para pruebas, pendiente por integrar con el backend real una vez se desarrolle.

## Próximos Pasos

1. Desarrollar el backend API RESTful
2. Implementar la autenticación y autorización
3. Integrar con el sistema de la DIAN para validación de terceros
4. Desarrollar el Módulo 1 para la homologación de códigos BMC

## Documentación

Para más información sobre el proyecto, consultar el archivo `IMPLEMENTACION.md` que contiene detalles sobre los componentes implementados y la integración con el backend.
