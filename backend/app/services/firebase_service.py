# backend/app/services/firebase_service.py
import firebase_admin
from firebase_admin import credentials, firestore
from typing import List, Dict, Any, Optional
import os
from datetime import datetime
import json

class FirebaseService:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(FirebaseService, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            self._init_firebase()
            self.db = firestore.client()
            self._initialized = True
    
    def _init_firebase(self):
        """Initialize Firebase connection"""
        try:
            # Try environment variable first
            cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
            
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
            else:
                # For Cloud Run, use default credentials
                cred = credentials.ApplicationDefault()
            
            firebase_admin.initialize_app(cred)
        except ValueError:
            # App already initialized
            pass
    
    # CRUD operations for lotes
    def create_lote(self, lote_data: Dict) -> str:
        """Create a new lote in Firestore"""
        doc_ref = self.db.collection('lotes').document()
        lote_data['id'] = doc_ref.id
        lote_data['fechaCarga'] = datetime.utcnow()
        doc_ref.set(lote_data)
        return doc_ref.id
    
    def get_lotes(self, limit: int = 20, offset: int = 0) -> List[Dict]:
        """Get paginated lotes from Firestore"""
        query = self.db.collection('lotes').order_by('fechaCarga', direction=firestore.Query.DESCENDING)
        
        if offset > 0:
            # For pagination, you'd need to implement cursor-based pagination
            # This is a simplified version
            pass
        
        docs = query.limit(limit).get()
        return [doc.to_dict() for doc in docs]
    
    def get_lote_by_id(self, lote_id: str) -> Optional[Dict]:
        """Get a specific lote by ID"""
        doc = self.db.collection('lotes').document(lote_id).get()
        return doc.to_dict() if doc.exists else None
    
    def update_lote(self, lote_id: str, updates: Dict) -> bool:
        """Update a lote"""
        try:
            updates['fechaUltimaActualizacion'] = datetime.utcnow()
            self.db.collection('lotes').document(lote_id).update(updates)
            return True
        except Exception:
            return False
    
    # Logs operations
    def add_log(self, lote_id: str, mensaje: str, nivel: str = "INFO", detalles: Dict = None):
        """Add a log entry for a lote"""
        log_data = {
            'loteId': lote_id,
            'timestamp': datetime.utcnow(),
            'nivel': nivel,
            'mensaje': mensaje,
            'detalles': detalles or {}
        }
        self.db.collection('logs').add(log_data)
    
    def get_logs_by_lote(self, lote_id: str) -> List[Dict]:
        """Get all logs for a specific lote"""
        docs = self.db.collection('logs').where('loteId', '==', lote_id).order_by('timestamp').get()
        return [doc.to_dict() for doc in docs]
    
    # Errors operations
    def add_error(self, lote_id: str, fila: int, campo: str, mensaje: str, severidad: str = "ERROR"):
        """Add an error for a lote"""
        error_data = {
            'loteId': lote_id,
            'fila': fila,
            'campo': campo,
            'mensaje': mensaje,
            'severidad': severidad,
            'fechaDeteccion': datetime.utcnow()
        }
        self.db.collection('errores').add(error_data)
    
    def get_errors_by_lote(self, lote_id: str) -> List[Dict]:
        """Get all errors for a specific lote"""
        docs = self.db.collection('errores').where('loteId', '==', lote_id).get()
        return [doc.to_dict() for doc in docs]
    
    # Excepciones DIAN operations
    def create_excepcion_dian(self, excepcion_data: Dict) -> str:
        """Create a new DIAN exception"""
        doc_ref = self.db.collection('excepciones_dian').document()
        excepcion_data['id'] = doc_ref.id
        excepcion_data['fechaDeteccion'] = datetime.utcnow()
        doc_ref.set(excepcion_data)
        return doc_ref.id
    
    def get_excepciones_dian(self, filters: Dict = None) -> List[Dict]:
        """Get DIAN exceptions with optional filters"""
        query = self.db.collection('excepciones_dian')
        
        if filters:
            if 'estado' in filters:
                query = query.where('estadoValidacion', '==', filters['estado'])
            if 'lote_id' in filters:
                query = query.where('loteId', '==', filters['lote_id'])
        
        docs = query.order_by('fechaDeteccion', direction=firestore.Query.DESCENDING).get()
        return [doc.to_dict() for doc in docs]
    
    def update_excepcion_dian(self, excepcion_id: str, updates: Dict) -> bool:
        """Update a DIAN exception"""
        try:
            updates['fechaUltimaActualizacion'] = datetime.utcnow()
            self.db.collection('excepciones_dian').document(excepcion_id).update(updates)
            return True
        except Exception:
            return False
    
    # DIAN Cache operations (for NIT validation)
    def get_dian_cache(self, nit: str) -> Optional[Dict]:
        """Get cached DIAN validation for a NIT"""
        doc = self.db.collection('dian_cache').document(nit).get()
        if doc.exists:
            data = doc.to_dict()
            # Check if cache is still fresh (e.g., 30 days)
            if data.get('fechaValidacion'):
                age_days = (datetime.utcnow() - data['fechaValidacion']).days
                if age_days <= 30:
                    return data
        return None
    
    def set_dian_cache(self, nit: str, validation_data: Dict):
        """Cache DIAN validation result"""
        cache_data = {
            'nit': nit,
            'fechaValidacion': datetime.utcnow(),
            **validation_data
        }
        self.db.collection('dian_cache').document(nit).set(cache_data)

# Singleton instance
firebase_service = FirebaseService()
