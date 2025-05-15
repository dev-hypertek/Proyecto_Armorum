// src/services/api.js
// Usar VITE_ en lugar de REACT_APP_ para Vite
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Resto del archivo permanece igual...
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error en la petición' }));
    throw new Error(error.message || 'Error en la petición');
  }
  return response.json();
};

// Obtiene el token de autenticación (se implementaría con un servicio de auth)
const getAuthToken = () => {
  return localStorage.getItem('authToken') || 'dummy-token';
};

// Funciones para el módulo de procesamiento de facturas
export const cargarArchivo = async (formData) => {
  const response = await fetch(`${API_URL}/facturas/cargar`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: formData
  });
  
  return handleResponse(response);
};

export const obtenerLotes = async () => {
  const response = await fetch(`${API_URL}/facturas/lotes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });
  
  return handleResponse(response);
};

export const obtenerDetalleLote = async (loteId) => {
  const response = await fetch(`${API_URL}/facturas/lotes/${loteId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });
  
  return handleResponse(response);
};

export const descargarPlantilla = async (loteId) => {
  const response = await fetch(`${API_URL}/facturas/lotes/${loteId}/descargar`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error al descargar la plantilla' }));
    throw new Error(error.message || 'Error al descargar la plantilla');
  }
  
  // Devolvemos una URL para el archivo
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

// Funciones para el módulo de validación de terceros
export const obtenerExcepciones = async () => {
  const response = await fetch(`${API_URL}/terceros/excepciones`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });
  
  return handleResponse(response);
};

export const actualizarEstadoTercero = async (excepcionId, accion, datos = {}) => {
  const response = await fetch(`${API_URL}/terceros/excepciones/${excepcionId}/${accion}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  
  return handleResponse(response);
};

// Los datos mock permanecen igual para fallback...
export const getLotesMock = () => {
  return [
    {
      id: 1,
      nombreArchivo: 'facturas_comiagro_may2025.xlsx',
      fechaCarga: '2025-05-02T10:30:00',
      cliente: 'Comiagro',
      formato: 'comiagro',
      estado: 'Completado',
      registrosTotales: 120,
      errores: 0
    },
    {
      id: 2,
      nombreArchivo: 'facturas_mayo_semana1.csv',
      fechaCarga: '2025-05-01T15:45:00',
      cliente: 'Cliente B',
      formato: 'plantilla51',
      estado: 'Error',
      registrosTotales: 85,
      errores: 12
    },
    {
      id: 3,
      nombreArchivo: 'facturas_procesadas.txt',
      fechaCarga: '2025-04-30T09:15:00',
      cliente: 'Cliente C',
      formato: 'personalizado',
      estado: 'Procesando',
      registrosTotales: 45,
      errores: 0
    }
  ];
};

// ... resto de funciones mock ...
