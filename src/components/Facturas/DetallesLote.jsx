import React from 'react';

const DetallesLote = ({ lote, onClose }) => {
  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Función para obtener el ícono del tipo de archivo
  const obtenerIconoTipoArchivo = (formato) => {
    const iconos = {
      'xml': '📄',
      'csv_excel': '📊',
      'txt_plano': '📝',
      'plantilla51': '📋'
    };
    return iconos[formato] || '📁';
  };

  // Función para obtener el color del estado
  const obtenerColorEstado = (estado) => {
    const colores = {
      'Procesando': 'bg-blue-100 text-blue-800',
      'Completado': 'bg-green-100 text-green-800',
      'Completado con Advertencias': 'bg-yellow-100 text-yellow-800',
      'Error': 'bg-red-100 text-red-800',
      'Pendiente': 'bg-gray-100 text-gray-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  // Función para obtener el tipo de archivo legible
  const obtenerTipoArchivoLegible = (formato) => {
    const tipos = {
      'xml': 'Facturas XML',
      'csv_excel': 'Plantilla CSV/Excel',
      'txt_plano': 'Archivo de Texto Plano',
      'plantilla51': 'Plantilla 51 (SIMONA)'
    };
    return tipos[formato] || 'Formato Desconocido';
  };

  // Agrupar errores por tipo
  const erroresPorTipo = lote.erroresPorTipo || lote.errores?.reduce((acc, error) => {
    const tipo = error.campo || 'OTROS';
    if (!acc[tipo]) acc[tipo] = [];
    acc[tipo].push(error);
    return acc;
  }, {}) || {};
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Cabecera del modal */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center border-b">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{obtenerIconoTipoArchivo(lote.formato)}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Detalles del Lote #{lote.id}
              </h3>
              <p className="text-sm text-gray-600">{lote.nombreArchivo}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cuerpo del modal */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Información básica del lote */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="text-blue-800 font-semibold mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Información del Lote
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Archivo:</p>
                <p className="font-medium text-gray-900">{lote.nombreArchivo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cliente:</p>
                <p className="font-medium text-gray-900">{lote.cliente}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Carga:</p>
                <p className="font-medium text-gray-900">{formatearFecha(lote.fechaCarga)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tipo de Archivo:</p>
                <p className="font-medium text-gray-900">{obtenerTipoArchivoLegible(lote.formato)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado:</p>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${obtenerColorEstado(lote.estado)}`}>
                  {lote.estado}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Registros Totales:</p>
                <p className="font-medium text-gray-900">{lote.registrosTotales?.toLocaleString() || 0}</p>
              </div>
              {lote.tipoArchivoDetectado && (
                <div>
                  <p className="text-sm text-gray-600">Tipo Detectado:</p>
                  <p className="font-medium text-gray-900">{lote.tipoArchivoDetectado}</p>
                </div>
              )}
            </div>
          </div>

          {/* Resumen de Procesamiento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-2xl font-bold text-green-700">{lote.registrosTotales || 0}</p>
                  <p className="text-sm text-green-600">Registros Procesados</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-2xl font-bold text-red-700">{lote.errores || 0}</p>
                  <p className="text-sm text-red-600">Errores Encontrados</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <div>
                  <p className="text-2xl font-bold text-blue-700">
                    {lote.registrosTotales ? Math.round(((lote.registrosTotales - (lote.errores || 0)) / lote.registrosTotales) * 100) : 100}%
                  </p>
                  <p className="text-sm text-blue-600">Éxito Procesamiento</p>
                </div>
              </div>
            </div>
          </div>

          {/* Errores por Tipo */}
          {Object.keys(erroresPorTipo).length > 0 && (
            <div className="mb-6">
              <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Errores por Categoría
              </h4>
              
              <div className="space-y-4">
                {Object.entries(erroresPorTipo).map(([tipo, errores]) => (
                  <div key={tipo} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-red-800">
                        {tipo === 'PRODUCTO' ? '🔍 Productos sin Código BMC' :
                         tipo === 'NIT_COMPRADOR' ? '🏢 Terceros no válidos en DIAN' :
                         tipo === 'ARCHIVO' ? '📄 Errores de Archivo' : 
                         `📋 ${tipo}`}
                      </h5>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                        {errores.length}
                      </span>
                    </div>
                    
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {errores.slice(0, 5).map((error, idx) => (
                        <div key={idx} className="bg-white p-2 rounded text-sm">
                          <div className="flex justify-between items-start">
                            <span className="text-gray-700">{error.mensaje}</span>
                            {error.fila && (
                              <span className="text-xs text-gray-500 ml-2">Fila {error.fila}</span>
                            )}
                          </div>
                        </div>
                      ))}
                      {errores.length > 5 && (
                        <div className="text-center text-sm text-gray-500 pt-2">
                          ... y {errores.length - 5} errores más
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logs de procesamiento */}
          {lote.logs && lote.logs.length > 0 && (
            <div className="mb-6">
              <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Registro de Actividades
              </h4>
              
              <div className="bg-gray-50 border rounded-lg overflow-hidden">
                <div className="max-h-60 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hora
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actividad
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nivel
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {lote.logs.map((log, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                            {formatearFecha(log.timestamp)}
                          </td>
                          <td className="px-6 py-2 text-sm text-gray-900">
                            {log.mensaje}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              log.nivel === 'ERROR' ? 'bg-red-100 text-red-800' :
                              log.nivel === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {log.nivel || 'INFO'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Información específica del tipo de archivo */}
          {(lote.formato === 'xml' || lote.formato === 'csv_excel' || lote.formato === 'txt_plano') && (
            <div className="mb-6">
              <h4 className="text-gray-800 font-semibold mb-3">
                Información Específica del Archivo
              </h4>
              
              {lote.formato === 'xml' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">📄 Archivo XML</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Facturas electrónicas procesadas automáticamente</li>
                    <li>• Validación de estructura XML realizada</li>
                    <li>• Extracción de datos según estándar de facturación electrónica</li>
                  </ul>
                </div>
              )}
              
              {lote.formato === 'csv_excel' && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">📊 Archivo CSV/Excel</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Mapeo automático de columnas realizado</li>
                    <li>• Validación de estructura de plantilla</li>
                    <li>• Conversión a formato Comiagro en progreso</li>
                  </ul>
                </div>
              )}
              
              {lote.formato === 'txt_plano' && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-800 mb-2">📝 Archivo de Texto</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Análisis de estructura de texto realizado</li>
                    <li>• Detección automática de delimitadores</li>
                    <li>• Parsing de datos según estructura identificada</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Pie del modal */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
          <div className="text-sm text-gray-600">
            {lote.puedeDescargar ? 
              "✅ Lote listo para descarga de plantilla Comiagro" : 
              "⚠️ Complete la validación antes de descargar"}
          </div>
          <div className="flex space-x-3">
            {lote.puedeDescargar && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar Plantilla
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesLote;