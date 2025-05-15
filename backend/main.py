from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import shutil
import json
from datetime import datetime
from typing import List, Optional
import tempfile
from openpyxl import Workbook
from dotenv import load_dotenv
import xml.etree.ElementTree as ET
import csv
import pandas as pd

# Cargar variables de entorno al inicio
load_dotenv()

# Firebase service - importación simplificada
from firebase_service import firebase_service

app = FastAPI(title="Armorum API", version="1.0.0")

# CORS - Allow all origins for development (update for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def process_file_by_type(file_path: str, formato: str, filename: str):
    """Procesa archivos según su tipo (XML, CSV/Excel, TXT)"""
    
    # Detectar extensión
    extension = filename.lower().split('.')[-1]
    
    try:
        if formato == "xml" or extension == "xml":
            return process_xml_file(file_path)
        elif formato in ["csv_excel", "plantilla51"] or extension in ["csv", "xlsx", "xls"]:
            return process_csv_excel_file(file_path, extension)
        elif formato == "txt_plano" or extension == "txt":
            return process_txt_file(file_path)
        else:
            return {
                "success": False,
                "registros": 0,
                "errores": ["Formato de archivo no reconocido"]
            }
    except Exception as e:
        return {
            "success": False,
            "registros": 0,
            "errores": [f"Error procesando archivo: {str(e)}"]
        }

def process_xml_file(file_path: str):
    """Procesa archivos XML de facturas electrónicas"""
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
        
        # Buscar facturas (puede variar según el formato XML)
        facturas_encontradas = 0
        errores = []
        
        # Buscar elementos que contengan facturas
        for elem in root.iter():
            if "factura" in elem.tag.lower() or "invoice" in elem.tag.lower():
                facturas_encontradas += 1
        
        # Si no encontramos facturas específicas, contar elementos con información
        if facturas_encontradas == 0:
            facturas_encontradas = len(list(root)) or 1
        
        return {
            "success": True,
            "registros": facturas_encontradas,
            "errores": errores,
            "tipo": "XML"
        }
        
    except ET.ParseError as e:
        return {
            "success": False,
            "registros": 0,
            "errores": [f"Error parsing XML: {str(e)}"]
        }

def process_csv_excel_file(file_path: str, extension: str):
    """Procesa archivos CSV y Excel"""
    try:
        if extension == "csv":
            # Leer CSV
            df = pd.read_csv(file_path)
        else:
            # Leer Excel
            df = pd.read_excel(file_path)
        
        # Verificar si tiene datos
        registros = len(df)
        errores = []
        
        # Validaciones básicas
        if registros == 0:
            errores.append("El archivo no contiene datos")
        
        # Verificar si tiene columnas
        if len(df.columns) == 0:
            errores.append("El archivo no tiene columnas definidas")
        
        return {
            "success": len(errores) == 0,
            "registros": registros,
            "errores": errores,
            "tipo": f"CSV/Excel ({extension.upper()})",
            "columnas": list(df.columns)[:10]  # Primeras 10 columnas
        }
        
    except Exception as e:
        return {
            "success": False,
            "registros": 0,
            "errores": [f"Error procesando {extension.upper()}: {str(e)}"]
        }

def process_txt_file(file_path: str):
    """Procesa archivos de texto plano"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
        
        # Filtrar líneas no vacías
        non_empty_lines = [line.strip() for line in lines if line.strip()]
        registros = len(non_empty_lines)
        
        errores = []
        if registros == 0:
            errores.append("El archivo de texto está vacío")
        
        # Intentar detectar si es delimitado
        estructura_detectada = "Texto libre"
        if registros > 0:
            primera_linea = non_empty_lines[0]
            if '|' in primera_linea:
                estructura_detectada = "Delimitado por |"
            elif '\t' in primera_linea:
                estructura_detectada = "Delimitado por tabs"
            elif ',' in primera_linea:
                estructura_detectada = "Posiblemente CSV"
        
        return {
            "success": len(errores) == 0,
            "registros": registros,
            "errores": errores,
            "tipo": "TXT",
            "estructura": estructura_detectada
        }
        
    except Exception as e:
        return {
            "success": False,
            "registros": 0,
            "errores": [f"Error procesando TXT: {str(e)}"]
        }

@app.get("/")
async def root():
    return {"message": "Armorum API funcionando en Firebase"}

@app.post("/api/facturas/cargar")
async def cargar_archivo(
    archivo: UploadFile = File(...),
    clienteId: str = Form(...),
    formatoArchivo: str = Form(...)
):
    # Validaciones básicas
    if archivo.size > 50 * 1024 * 1024:  # 50MB
        raise HTTPException(status_code=413, detail="Archivo muy grande")
    
    # Guardar archivo temporalmente
    file_path = f"uploads/{archivo.filename}"
    os.makedirs("uploads", exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(archivo.file, buffer)
    
    # Mapeo de clientes (se puede expandir o hacer dinámico)
    cliente_nombres = {"1": "Comiagro", "2": "Olímpica", "3": "Cliente Regional"}
    
    # Detección automática de formato si es 'auto_detect'
    if formatoArchivo == 'auto_detect':
        # Detectar por extensión
        extension = archivo.filename.lower().split('.')[-1]
        if extension == 'xml':
            formatoArchivo = 'xml'
        elif extension in ['csv', 'xlsx', 'xls']:
            formatoArchivo = 'csv_excel'
        elif extension == 'txt':
            formatoArchivo = 'txt_plano'
        else:
            formatoArchivo = 'csv_excel'  # Default
    
    # Auto-detectar cliente basado en contenido (simplified for MVP)
    # En el futuro se puede implementar análisis del contenido para detectar cliente
    
    # Crear lote en Firestore
    lote_data = {
        "nombreArchivo": archivo.filename,
        "cliente": cliente_nombres.get(clienteId, "Cliente Desconocido"),
        "formato": formatoArchivo,
        "estado": "Procesando",
        "registrosTotales": 0,
        "errores": 0,
        "filePath": file_path
    }
    
    lote_id = firebase_service.create_lote(lote_data)
    firebase_service.add_log(lote_id, f"Archivo recibido. Tipo: {formatoArchivo}")
    
    # Procesar archivo según tipo
    try:
        resultado_procesamiento = process_file_by_type(file_path, formatoArchivo, archivo.filename)
        
        if resultado_procesamiento["success"]:
            registros_totales = resultado_procesamiento["registros"]
            estado = "Completado"
            errores_count = 0
            
            # Simular algunos errores basados en el formato
            if formatoArchivo in ["xml", "csv_excel", "plantilla51"]:
                # Simular errores de validación
                errores_simulados = max(0, registros_totales // 20)  # 5% de errores
                
                for i in range(errores_simulados):
                    # Alternar entre errores de productos y terceros
                    if i % 2 == 0:
                        # Error de producto sin código BMC
                        firebase_service.add_error(
                            lote_id,
                            i + 1,
                            "PRODUCTO",
                            f"Producto en fila {i + 1}: No se encontró código BMC con IA",
                            "WARNING"
                        )
                    else:
                        # Error de tercero en DIAN
                        firebase_service.add_error(
                            lote_id,
                            i + 1,
                            "NIT_COMPRADOR",
                            f"NIT en fila {i + 1}: No encontrado en DIAN",
                            "ERROR"
                        )
                        
                        # Crear excepción DIAN
                        excepcion_data = {
                            "loteId": lote_id,
                            "filaOrigen": i + 1,
                            "documento": f"12345678{i}",
                            "nombreReportado": f"Cliente {i + 1} SAS",
                            "estadoValidacion": "No_Encontrado",
                            "estadoGestion": "Pendiente",
                            "notas": None
                        }
                        firebase_service.create_excepcion_dian(excepcion_data)
                
                errores_count = errores_simulados
                estado = "Completado" if errores_count == 0 else ("Completado con Advertencias" if errores_count < 5 else "Error")
        else:
            # Error en el procesamiento del archivo
            registros_totales = 0
            errores_count = 1
            estado = "Error"
            
            for error in resultado_procesamiento["errores"]:
                firebase_service.add_error(lote_id, 0, "ARCHIVO", error, "ERROR")
        
        # Actualizar lote con resultados del procesamiento
        firebase_service.update_lote(lote_id, {
            "registrosTotales": registros_totales,
            "errores": errores_count,
            "estado": estado,
            "tipoArchivoDetectado": resultado_procesamiento.get("tipo", formatoArchivo)
        })
        
        firebase_service.add_log(lote_id, f"Procesamiento completado. Estado: {estado}. Registros: {registros_totales}")
        
    except Exception as e:
        firebase_service.update_lote(lote_id, {"estado": "Error", "errores": 1})
        firebase_service.add_log(lote_id, f"Error en procesamiento: {str(e)}", "ERROR")
        estado = "Error"
        registros_totales = 0
    
    # Limpiar archivo temporal
    try:
        os.remove(file_path)
    except:
        pass
    
    return {
        "success": True,
        "message": "Archivo recibido y procesado",
        "data": {
            "loteId": lote_id,
            "nombreArchivo": archivo.filename,
            "estado": estado,
            "fechaCarga": datetime.utcnow().isoformat(),
            "registrosEstimados": registros_totales
        }
    }

# Resto de endpoints sin cambios...
@app.get("/api/facturas/lotes")
async def obtener_lotes(
    page: int = 1,
    limit: int = 20,
    estado: Optional[str] = None
):
    # Get lotes from Firestore
    lotes = firebase_service.get_lotes(limit=limit * page)  # Simple pagination
    
    # Filter by estado if provided
    if estado:
        lotes = [l for l in lotes if l.get("estado") == estado]
    
    # Simple pagination (can be improved with cursor-based pagination)
    start = (page - 1) * limit
    end = start + limit
    lotes_pagina = lotes[start:end]
    
    # Convert Firestore timestamps to ISO format
    for lote in lotes_pagina:
        if 'fechaCarga' in lote:
            lote['fechaCarga'] = lote['fechaCarga'].isoformat()
        if 'fechaUltimaActualizacion' in lote:
            lote['fechaUltimaActualizacion'] = lote['fechaUltimaActualizacion'].isoformat()
    
    return {
        "success": True,
        "data": {
            "lotes": lotes_pagina,
            "paginacion": {
                "paginaActual": page,
                "totalPaginas": (len(lotes) + limit - 1) // limit,
                "totalRegistros": len(lotes),
                "registrosPorPagina": limit
            }
        }
    }

@app.get("/api/facturas/lotes/{lote_id}")
async def obtener_detalle_lote(lote_id: str):
    lote = firebase_service.get_lote_by_id(lote_id)
    if not lote:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    
    # Get logs and errors
    logs = firebase_service.get_logs_by_lote(lote_id)
    errores = firebase_service.get_errors_by_lote(lote_id)
    
    # Convert timestamps
    for log in logs:
        if 'timestamp' in log:
            log['timestamp'] = log['timestamp'].isoformat()
    
    for error in errores:
        if 'fechaDeteccion' in error:
            error['fechaDeteccion'] = error['fechaDeteccion'].isoformat()
    
    # Convert lote timestamps
    if 'fechaCarga' in lote:
        lote['fechaCarga'] = lote['fechaCarga'].isoformat()
    if 'fechaUltimaActualizacion' in lote:
        lote['fechaUltimaActualizacion'] = lote['fechaUltimaActualizacion'].isoformat()
    
    # Agrupar errores por tipo para mejor visualización
    errores_por_tipo = {}
    for error in errores:
        tipo = error.get('campo', 'OTROS')
        if tipo not in errores_por_tipo:
            errores_por_tipo[tipo] = []
        errores_por_tipo[tipo].append(error)
    
    return {
        "success": True,
        "data": {
            "lote": lote,
            "logs": logs,
            "errores": errores,
            "erroresPorTipo": errores_por_tipo,
            "puedeDescargar": lote.get("estado") in ["Completado", "Completado con Advertencias"]
        }
    }

@app.get("/api/facturas/lotes/{lote_id}/descargar")
async def descargar_plantilla(lote_id: str):
    lote = firebase_service.get_lote_by_id(lote_id)
    if not lote or lote.get("estado") not in ["Completado", "Completado con Advertencias"]:
        raise HTTPException(status_code=404, detail="Plantilla no disponible")
    
    # Generate Excel file based on PLANTILLA51_SIMONA structure
    wb = Workbook()
    ws = wb.active
    ws.title = "Plantilla Comiagro"
    
    # Headers based on PLANTILLA51_SIMONA
    headers = [
        "NOMBRE USUARIO (CLIENTE DEL CLIENTE)",
        "NIT USUARIO (CLIENTE DEL CLIENTE)", 
        "CIUDAD DE ENTREGA DEL PRODUCTO",
        "FACT NRO",
        "FECHA",
        "FORMA DE PAGO",
        "PRODUCTO",
        "PRESENTACION",
        "CANTIDAD",
        "VALOR UNITARIO",
        "TOTAL",
        "% IVA PRODUCTO"
    ]
    
    # Add headers
    for col, header in enumerate(headers, 1):
        ws.cell(row=1, column=col, value=header)
    
    # Add sample data based on the lote
    registros = lote.get('registrosTotales', 1)
    for row in range(2, min(registros + 2, 10)):  # Máximo 8 filas de ejemplo
        ws.cell(row=row, column=1, value=f"Cliente {row-1} SAS")
        ws.cell(row=row, column=2, value=f"9012345{row-1:02d}")
        ws.cell(row=row, column=3, value="Bogotá")
        ws.cell(row=row, column=4, value=f"F-{row-1:04d}")
        ws.cell(row=row, column=5, value=datetime.now().strftime("%Y-%m-%d"))
        ws.cell(row=row, column=6, value="CREDITO")
        ws.cell(row=row, column=7, value=f"PRODUCTO_{row-1}")
        ws.cell(row=row, column=8, value="KG")
        ws.cell(row=row, column=9, value=10)
        ws.cell(row=row, column=10, value=25000)
        ws.cell(row=row, column=11, value=250000)
        ws.cell(row=row, column=12, value=19)
    
    # Save to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
        wb.save(tmp.name)
        temp_path = tmp.name
    
    return FileResponse(
        temp_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename=f"plantilla_comiagro_lote_{lote_id}.xlsx"
    )

@app.get("/api/terceros/excepciones")
async def obtener_excepciones(
    estado: Optional[str] = None,
    lote_id: Optional[str] = None
):
    filters = {}
    if estado:
        filters['estado'] = estado
    if lote_id:
        filters['lote_id'] = lote_id
    
    excepciones = firebase_service.get_excepciones_dian(filters)
    
    # Convert timestamps
    for exc in excepciones:
        if 'fechaDeteccion' in exc:
            exc['fechaDeteccion'] = exc['fechaDeteccion'].isoformat()
        if 'fechaUltimaActualizacion' in exc:
            exc['fechaUltimaActualizacion'] = exc['fechaUltimaActualizacion'].isoformat()
    
    # Calculate statistics
    total = len(excepciones)
    pendientes = len([e for e in excepciones if e.get('estadoGestion') == 'Pendiente'])
    resueltas = total - pendientes
    
    return {
        "success": True,
        "data": {
            "excepciones": excepciones,
            "estadisticas": {
                "total": total,
                "pendientes": pendientes,
                "resueltas": resueltas
            }
        }
    }

@app.post("/api/terceros/excepciones/{excepcion_id}/{action}")
async def actualizar_estado_tercero(
    excepcion_id: str,
    action: str,
    payload: Optional[dict] = None
):
    # Get excepcion from Firestore
    excepciones = firebase_service.get_excepciones_dian()
    excepcion = next((e for e in excepciones if e.get('id') == excepcion_id), None)
    
    if not excepcion:
        raise HTTPException(status_code=404, detail="Excepción no encontrada")
    
    estado_anterior = excepcion.get('estadoValidacion')
    
    # Mapear acciones a estados
    accion_map = {
        "corregir": "Corregida",
        "crear": "En_Creacion_Manual",
        "ignorar": "Ignorada",
        "reintentar": "Reintentando"
    }
    
    if action not in accion_map:
        raise HTTPException(status_code=400, detail="Acción no válida")
    
    updates = {
        "estadoGestion": accion_map[action]
    }
    
    if payload:
        if 'notas' in payload:
            updates['notas'] = payload['notas']
        if 'datosCorreccion' in payload:
            updates['datosCorreccion'] = payload['datosCorreccion']
    
    # Update in Firestore
    success = firebase_service.update_excepcion_dian(excepcion_id, updates)
    
    if not success:
        raise HTTPException(status_code=500, detail="Error al actualizar excepción")
    
    return {
        "success": True,
        "message": f"Excepción actualizada: {action}",
        "data": {
            "excepcionId": excepcion_id,
            "accionAplicada": action,
            "estadoAnterior": estado_anterior,
            "estadoNuevo": accion_map[action],
            "fechaActualizacion": datetime.utcnow().isoformat()
        }
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)