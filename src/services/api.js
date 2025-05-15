// src/services/api.js
// URL base de la API - Environment variable or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'; 

// Función auxiliar para manejar errores de la API
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

// Datos de ejemplo para desarrollo mientras no hay backend
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

export const getExcepcionesMock = () => {
  return [
    {
      id: 1,
      loteId: 2,
      filaOrigen: 23,
      documento: '901234567',
      nombreReportado: 'Comercializadora XYZ',
      estadoValidacion: 'No Encontrado',
      fechaDeteccion: '2025-05-01T16:00:00',
      notas: 'Verificar NIT en DIAN',
      formatoArchivo: 'plantilla51',
      campoAfectado: 'NIT CLIENTE'
    },
    {
      id: 2,
      loteId: 2,
      filaOrigen: 45,
      documento: '800123456',
      nombreReportado: 'Distribuidora ABC',
      estadoValidacion: 'Inconsistente',
      fechaDeteccion: '2025-05-01T16:05:00',
      notas: 'Nombre no coincide con registro DIAN',
      formatoArchivo: 'plantilla51',
      campoAfectado: 'NOMBRE CLIENTE'
    },
    {
      id: 3,
      loteId: 2,
      filaOrigen: 67,
      documento: '1234567890',
      nombreReportado: 'Juan Pérez',
      estadoValidacion: 'No Encontrado',
      fechaDeteccion: '2025-05-01T16:10:00',
      notas: 'Verificar cédula en DIAN',
      formatoArchivo: 'plantilla51',
      campoAfectado: 'NIT CLIENTE'
    },
    {
      id: 4,
      loteId: 2,
      filaOrigen: 38,
      documento: '830114840',
      nombreReportado: 'Industrias Alimenticias ABC',
      estadoValidacion: 'Inconsistente',
      fechaDeteccion: '2025-05-01T16:15:00',
      notas: 'Nombre registrado en DIAN: INDUSTRIAS ALIMENTICIAS ABC S.A.S',
      formatoArchivo: 'plantilla51',
      campoAfectado: 'NOMBRE CLIENTE'
    },
    {
      id: 5,
      loteId: 1,
      filaOrigen: 12,
      documento: '900765432',
      nombreReportado: 'Alimentos Frescos SAS',
      estadoValidacion: 'No Encontrado',
      fechaDeteccion: '2025-05-02T10:33:00',
      notas: 'Posible error en dígito de verificación',
      formatoArchivo: 'comiagro',
      campoAfectado: 'NIT USUARIO'
    }
  ];
};

export const getDetalleLoteMock = (loteId) => {
  const lotes = getLotesMock();
  const lote = lotes.find(l => l.id === parseInt(loteId));
  
  if (!lote) {
    throw new Error('Lote no encontrado');
  }
  
  // Crear logs específicos según el formato del lote
  const logs = [
    { timestamp: '2025-05-02T10:30:00', mensaje: 'Inicio de procesamiento' },
    { timestamp: '2025-05-02T10:31:00', mensaje: 'Validación de estructura completada' }
  ];
  
  // Agregar logs específicos según el formato
  if (lote.formato === 'comiagro') {
    logs.push(
      { timestamp: '2025-05-02T10:32:00', mensaje: 'Mapeo de campos formato Comiagro completado' },
      { timestamp: '2025-05-02T10:33:00', mensaje: 'Homologación de códigos BMC completada' },
      { timestamp: '2025-05-02T10:34:00', mensaje: 'Validación de terceros completada' },
      { timestamp: '2025-05-02T10:35:00', mensaje: 'Generación de plantilla Comiagro completada' }
    );
  } else if (lote.formato === 'plantilla51') {
    logs.push(
      { timestamp: '2025-05-02T10:32:00', mensaje: 'Mapeo de campos formato Plantilla51 completado' },
      { timestamp: '2025-05-02T10:33:00', mensaje: 'Homologación de códigos BMC completada' },
      { timestamp: '2025-05-02T10:34:00', mensaje: 'Validación de terceros en proceso...' },
      { timestamp: '2025-05-02T10:35:00', mensaje: 'Se encontraron excepciones en validación de terceros' },
      { timestamp: '2025-05-02T10:36:00', mensaje: 'Generación de plantilla Comiagro completada con advertencias' }
    );
  } else { // Formato personalizado u otro
    logs.push(
      { timestamp: '2025-05-02T10:32:00', mensaje: 'Intento de mapeo automático de campos' },
      { timestamp: '2025-05-02T10:33:00', mensaje: 'Se requiere mapeo manual de algunos campos' },
      { timestamp: '2025-05-02T10:34:00', mensaje: 'Homologación de códigos BMC completada parcialmente' },
      { timestamp: '2025-05-02T10:35:00', mensaje: 'Validación de terceros completada' },
      { timestamp: '2025-05-02T10:36:00', mensaje: 'Generación de plantilla Comiagro completada' }
    );
  }
  
  // Generar errores simulados según el formato y estado
  let erroresSimulados = [];
  
  if (lote.errores > 0 || lote.estado === 'Error') {
    // Errores comunes a todos los formatos
    erroresSimulados.push({ fila: 23, campo: 'NIT', error: 'Tercero no encontrado en DIAN' });
    
    // Errores específicos del formato
    if (lote.formato === 'comiagro') {
      erroresSimulados.push(
        { fila: 45, campo: 'Razón Social', error: 'No coincide con registro DIAN' }
      );
    } else if (lote.formato === 'plantilla51') {
      erroresSimulados.push(
        { fila: 12, campo: 'NOMBRE CLIENTE', error: 'Valor vacío o inválido' },
        { fila: 38, campo: 'PRECIO UNITARIO', error: 'Valor no numérico encontrado' },
        { fila: 45, campo: 'NIT CLIENTE', error: 'No coincide con registro DIAN' },
        { fila: 67, campo: 'CODIGO SUBYA', error: 'No se encontró código BMC equivalente' }
      );
    } else {
      erroresSimulados.push(
        { fila: 8, campo: 'Desconocido', error: 'No se pudo mapear al formato Comiagro' },
        { fila: 15, campo: 'Producto', error: 'No se encontró código BMC equivalente' }
      );
    }
  }
  
  return {
    ...lote,
    logs: logs,
    errores: erroresSimulados,
    // Agregamos información de mapeo de campos para mostrar en los detalles
    mapeo: lote.formato ? {
      formatoOrigen: lote.formato,
      camposOriginales: lote.formato === 'comiagro' ? [
        'NOMBRE USUARIO', 'NIT USUARIO', 'CIUDAD DE ENTREGA', 'FACT NRO', 'FECHA', 'FORMA DE PAGO',
        'PRODUCTO', 'PRESENTACION', 'CANTIDAD', 'VALOR UNITARIO', 'TOTAL', '% IVA PRODUCTO'
      ] : lote.formato === 'plantilla51' ? [
        'NOMBRE CLIENTE', 'NIT CLIENTE', 'DIRECCION', 'No. FACTURA', 'FECHA DE FACTURA',
        'NOMBRE PRODUCTO', 'IVA PRODUCTO', 'CANTIDAD O KILOS', 'PRECIO UNITARIO', 'TOTAL FACTURA', 'CODIGO SUBYA'
      ] : [
        'Campo 1', 'Campo 2', 'Campo 3', 'Campo 4', 'Campo 5' // Formato personalizado genérico
      ],
      camposMapeados: true,
      camposNoMapeados: lote.formato === 'personalizado' ? ['Campo 3', 'Campo 5'] : []
    } : null
  };
};