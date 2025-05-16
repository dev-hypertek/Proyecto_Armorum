# 📚 Generador de Datos de Prueba - Sistema Armorum

## 🎯 Descripción

Este script genera datos de prueba realistas para el sistema Armorum, incluyendo:
- Catálogo de productos BMC
- Base de datos de terceros
- Facturas en múltiples formatos (CSV, XML, TXT)
- Escenarios específicos de testing
- Validaciones DIAN simuladas

## 🚀 Instalación

### Requisitos
```bash
pip install pandas faker openpyxl sqlite3
```

### Ejecución Rápida
```bash
python generate_test_data.py
```

## 📁 Archivos Generados

### Archivos Maestros
- `productos_bmc.csv` - Catálogo completo de productos BMC
- `terceros.csv` - Base de datos de terceros validados 
- `formas_pago.csv` - Códigos de formas de pago

### Facturas de Prueba
- `facturas_olimpica_test.csv` - 50 facturas estilo Olímpica
- `facturas_cliente_regional.csv` - 30 facturas cliente regional
- `facturas_comiagro_test.csv` - 40 facturas Comiagro
- `facturas_dian_test.xml` - 20 facturas formato XML DIAN
- `facturas_plano_test.txt` - 25 facturas formato texto plano

### Escenarios de Testing
- `escenario_exitoso.csv` - 100% homologación exitosa
- `escenario_advertencias.csv` - Productos que requieren revisión
- `escenario_errores.csv` - Productos sin homologar

### Base de Datos
- `armorum_test.db` - SQLite con todos los datos estructurados
- `terceros_dian_validation.json` - Respuestas simuladas de DIAN

## 🔧 Uso Avanzado

### Generar Solo Facturas CSV
```python
from generate_test_data import ArmorumDataGenerator

generator = ArmorumDataGenerator()
generator.load_bmc_catalog()
generator.load_terceros()
generator.generate_facturas_csv(100, 'mi_archivo.csv')
generator.close()
```

### Crear Escenarios Personalizados
```python
generator = ArmorumDataGenerator()
generator.load_bmc_catalog()
generator.load_terceros()
generator.create_test_scenarios()
generator.close()
```

### Simular Validación DIAN
```python
generator = ArmorumDataGenerator()
generator.load_terceros()
generator.generate_dian_validation_data('validaciones.json')
generator.close()
```

## 📊 Datos Incluidos

### Productos BMC (38 productos)
- **Familia AREPA:** 6 variaciones (amarilla, blanca, con queso, etc.)
- **Familia LECHUGA:** 5 tipos (romana, morada, batavia, etc.)
- **Productos NUEVOS:** Insumos veterinarios, alimentos balanceados
- **Productos PROBLEMA:** Para testing de IA

### Terceros (12 empresas)
- **Activos:** PANADERIA EL RETOÑO, ROSAMINA, CENOSUD, EXITO
- **Vendedores:** AREPAS PAISAS, PRODUCTOS AGRÍCOLAS
- **Estados especiales:** Inactivos, pendientes validación

### Formas de Pago (18 códigos)
- Contado inmediato (1)
- Plazos estándar (15, 30, 60, 90 días)
- Códigos especiales (contra entrega, personalizado)

## 🧪 Testing del Sistema

### Flujo Completo de Prueba

1. **Cargar facturas:** Usar archivos CSV generados
2. **Procesar IA:** Verificar homologación automática  
3. **Validar terceros:** Comprobar consultas DIAN simuladas
4. **Generar Simona:** Crear plantilla final

### Casos de Prueba Específicos

**✅ Exitoso (escenario_exitoso.csv):**
- Todos los productos tienen match > 90%
- Terceros válidos en DIAN
- Genera plantilla Simona completa

**⚠️ Advertencias (escenario_advertencias.csv):**
- 80% productos homologados
- 20% requieren revisión manual
- Algunos errores ortográficos

**❌ Errores (escenario_errores.csv):**
- 40% productos sin código BMC
- Nombres de productos muy específicos
- Requiere creación manual

## 🔍 Validación de Datos

### Verificar Productos BMC
```sql
SELECT categoria, COUNT(*) 
FROM productos_bmc 
GROUP BY categoria
ORDER BY COUNT(*) DESC;
```

### Verificar Terceros
```sql
SELECT estado_dian, COUNT(*) 
FROM terceros 
GROUP BY estado_dian;
```

### Verificar Facturas
```sql
SELECT tipo_archivo, COUNT(*) 
FROM lotes_facturas 
GROUP BY tipo_archivo;
```

## 📈 Monitoreo y Estadísticas

El script genera estadísticas automáticas:
- Total de productos BMC cargados
- Terceros por estado DIAN
- Facturas por formato
- Escenarios de prueba creados

## 🛠️ Personalización

### Agregar Nuevos Productos
Editar `create_productos_bmc_file()` para incluir productos específicos de tu industria.

### Modificar Terceros
Actualizar `create_terceros_file()` con empresas reales de tu base de datos.

### Ajustar Facturas
Cambiar rangos de precios, cantidades y fechas en `get_productos_frecuentes()`.

## 📞 Soporte

Para dudas sobre la implementación:
1. Revisar logs de ejecución
2. Verificar archivos CSV generados
3. Consultar base de datos SQLite
4. Contactar al equipo de desarrollo

## 🔄 Actualización de Datos

Para mantener los datos actualizados:
1. Ejecutar el script mensualmente
2. Actualizar catálogo BMC con correos recibidos
3. Sincronizar terceros con validaciones DIAN reales
4. Ajustar precios según inflación

## ⚡ Optimización

Para archivos grandes (>1000 facturas):
- Usar `generate_facturas_csv()` con chunks
- Generar en lotes separados por cliente
- Procesar XML/TXT en paralelo

## 🎯 Próximos Pasos

1. Integrar con sistema real de Armorum
2. Conectar script con backend FastAPI
3. Automatizar con cronjob para actualizaciones
4. Crear dashboard de monitoreo