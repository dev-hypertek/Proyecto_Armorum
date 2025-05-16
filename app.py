#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
API Backend for Armorum Financial System
========================================
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import sqlite3
import pandas as pd
import os
import json
from datetime import datetime
import tempfile
from werkzeug.utils import secure_filename

# Import our data generation modules
from scripts.data_generation.generate_test_data import ArmorumDataGenerator
from scripts.data_generation.file_generators import FileGenerators
from scripts.data_generation.database_setup import DatabaseSetup

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv', 'xml', 'txt', 'xlsx'}
DB_PATH = 'data/armorum_production.db'

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    """Initialize database if it doesn't exist"""
    if not os.path.exists(DB_PATH):
        os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
        db_setup = DatabaseSetup(DB_PATH)
        db_setup.setup_database()
        
        # Load initial data
        generator = ArmorumDataGenerator(DB_PATH)
        generator.create_master_files()
        generator.load_data_to_db()
        generator.close()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/api/facturas/lotes', methods=['GET'])
def get_lotes():
    """Get all processing batches"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, nombre_archivo, tipo_archivo, fecha_carga, estado,
                   total_facturas, facturas_procesadas, errores_productos, errores_terceros
            FROM lotes 
            ORDER BY fecha_carga DESC
        ''')
        lotes = cursor.fetchall()
        conn.close()
        
        return jsonify([dict(lote) for lote in lotes])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/facturas/cargar', methods=['POST'])
def cargar_factura():
    """Upload and process invoice file"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Determine file type
        file_ext = filename.rsplit('.', 1)[1].lower()
        file_type = {
            'csv': 'CSV',
            'xml': 'XML',
            'txt': 'TXT',
            'xlsx': 'EXCEL'
        }.get(file_ext, 'UNKNOWN')
        
        # Create lote entry in database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO lotes (nombre_archivo, tipo_archivo, estado)
            VALUES (?, ?, 'RECIBIDO')
        ''', (filename, file_type))
        lote_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Process file asynchronously (for now just simulate)
        # In production, this should be a background task
        process_file_async(lote_id, filepath, file_type)
        
        return jsonify({
            'status': 'success',
            'lote_id': lote_id,
            'message': f'File {filename} uploaded successfully'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def process_file_async(lote_id, filepath, file_type):
    """Process uploaded file (simulate processing)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Update status to processing
        cursor.execute('UPDATE lotes SET estado = "PROCESANDO" WHERE id = ?', (lote_id,))
        conn.commit()
        
        # Simulate processing based on file type
        if file_type == 'CSV':
            df = pd.read_csv(filepath)
            total_facturas = len(df)
            
            # Simulate some errors for demo
            errores_productos = max(0, int(total_facturas * 0.1))  # 10% products with issues
            errores_terceros = max(0, int(total_facturas * 0.05))  # 5% terceros with issues
            facturas_procesadas = total_facturas - errores_productos - errores_terceros
            
            estado = 'COMPLETADO_EXITOSO' if errores_productos == 0 and errores_terceros == 0 else 'COMPLETADO_CON_ADVERTENCIAS'
            
        else:
            # For other file types, simulate basic processing
            total_facturas = 25  # Simulate
            facturas_procesadas = 23
            errores_productos = 1
            errores_terceros = 1
            estado = 'COMPLETADO_CON_ADVERTENCIAS'
        
        # Update lote with results
        cursor.execute('''
            UPDATE lotes 
            SET estado = ?, total_facturas = ?, facturas_procesadas = ?,
                errores_productos = ?, errores_terceros = ?
            WHERE id = ?
        ''', (estado, total_facturas, facturas_procesadas, errores_productos, errores_terceros, lote_id))
        
        conn.commit()
        conn.close()
        
    except Exception as e:
        # Update lote with error status
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('UPDATE lotes SET estado = "ERROR_PROCESAMIENTO" WHERE id = ?', (lote_id,))
        conn.commit()
        conn.close()

@app.route('/api/facturas/lotes/<int:lote_id>', methods=['GET'])
def get_lote_detail(lote_id):
    """Get detailed information about a specific lote"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get lote information
        cursor.execute('''
            SELECT * FROM lotes WHERE id = ?
        ''', (lote_id,))
        lote = cursor.fetchone()
        
        if not lote:
            return jsonify({'error': 'Lote not found'}), 404
        
        # Get facturas for this lote
        cursor.execute('''
            SELECT f.*, COUNT(i.id) as items_count
            FROM facturas f
            LEFT JOIN items_factura i ON f.id = i.factura_id
            WHERE f.lote_id = ?
            GROUP BY f.id
        ''', (lote_id,))
        facturas = cursor.fetchall()
        
        conn.close()
        
        return jsonify({
            'lote': dict(lote),
            'facturas': [dict(f) for f in facturas]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/facturas/lotes/<int:lote_id>/descargar-simona', methods=['GET'])
def descargar_plantilla_simona(lote_id):
    """Download Plantilla Simona for a processed lote"""
    try:
        # Check if lote exists and is ready
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM lotes WHERE id = ?', (lote_id,))
        lote = cursor.fetchone()
        conn.close()
        
        if not lote:
            return jsonify({'error': 'Lote not found'}), 404
        
        if lote['estado'] not in ['COMPLETADO_EXITOSO', 'COMPLETADO_CON_ADVERTENCIAS']:
            return jsonify({'error': 'Lote not ready for download'}), 400
        
        # Generate Plantilla Simona
        generator = ArmorumDataGenerator(DB_PATH)
        file_gen = FileGenerators(generator.db_setup.conn)
        
        # Generate temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx')
        temp_filename = temp_file.name
        temp_file.close()
        
        file_gen.generate_plantilla_simona(lote_id, temp_filename)
        generator.close()
        
        return send_file(
            temp_filename,
            as_attachment=True,
            download_name=f'plantilla_simona_lote_{lote_id}.xlsx',
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/productos', methods=['GET'])
def get_productos():
    """Get all BMC products"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            SELECT codigo_bmc, desc_subya, desc_caracteristica, grupo, activo
            FROM productos_bmc
            WHERE activo = 1
            ORDER BY desc_subya, desc_caracteristica
        ''')
        productos = cursor.fetchall()
        conn.close()
        
        return jsonify([dict(p) for p in productos])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/terceros', methods=['GET'])
def get_terceros():
    """Get all terceros"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            SELECT nit, razon_social, tipo_tercero, ciudad, estado_dian
            FROM terceros
            ORDER BY razon_social
        ''')
        terceros = cursor.fetchall()
        conn.close()
        
        return jsonify([dict(t) for t in terceros])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/terceros/<nit>/validar-dian', methods=['POST'])
def validar_tercero_dian(nit):
    """Validate tercero with DIAN (simulated)"""
    try:
        # Simulate DIAN validation
        import time
        time.sleep(1)  # Simulate API delay
        
        # Random validation result for demo
        import random
        estados = ['ACTIVO', 'INACTIVO', 'NO_ENCONTRADO']
        estado = random.choice(estados)
        
        # Update tercero in database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE terceros SET estado_dian = ? WHERE nit = ?
        ''', (estado, nit))
        conn.commit()
        conn.close()
        
        return jsonify({
            'nit': nit,
            'estado_dian': estado,
            'fecha_validacion': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/estadisticas', methods=['GET'])
def get_estadisticas():
    """Get system statistics"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Count lotes by status
        cursor.execute('''
            SELECT estado, COUNT(*) as count
            FROM lotes
            GROUP BY estado
        ''')
        lotes_por_estado = dict(cursor.fetchall())
        
        # Count products by category
        cursor.execute('''
            SELECT grupo, COUNT(*) as count
            FROM productos_bmc
            WHERE activo = 1
            GROUP BY grupo
        ''')
        productos_por_categoria = dict(cursor.fetchall())
        
        # Count terceros by DIAN status
        cursor.execute('''
            SELECT estado_dian, COUNT(*) as count
            FROM terceros
            GROUP BY estado_dian
        ''')
        terceros_por_estado_dian = dict(cursor.fetchall())
        
        # Total facturas processed today
        cursor.execute('''
            SELECT COUNT(*) as count
            FROM lotes
            WHERE DATE(fecha_carga) = DATE('now')
        ''')
        lotes_hoy = cursor.fetchone()[0]
        
        conn.close()
        
        return jsonify({
            'lotes_por_estado': lotes_por_estado,
            'productos_por_categoria': productos_por_categoria,
            'terceros_por_estado_dian': terceros_por_estado_dian,
            'lotes_procesados_hoy': lotes_hoy,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Initialize database on startup
    init_database()
    
    # Run the application
    app.run(host='0.0.0.0', port=8080, debug=True)
