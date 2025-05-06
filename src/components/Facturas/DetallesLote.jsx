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
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Cabecera del modal */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Detalles del Lote #{lote.id}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cuerpo del modal */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Información básica del lote */}
          <div className="bg-blue-50 p-4 rounded mb-6">
            <h4 className="text-blue-800 font-semibold mb-2">Información del Lote</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nombre del Archivo:</p>
                <p className="font-medium">{lote.nombreArchivo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cliente:</p>
                <p className="font-medium">{lote.cliente}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Carga:</p>
                <p className="font-medium">{formatearFecha(lote.fechaCarga)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Formato:</p>
                <p className="font-medium">
                  {lote.formato === 'comiagro' ? 'Formato Comiagro' : 
                   lote.formato === 'plantilla51' ? 'Plantilla 51 (SIMONA)' : 
                   lote.formato === 'personalizado' ? 'Formato Personalizado' : 'Desconocido'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado:</p>
                <p className="font-medium">{lote.estado}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Registros Totales:</p>
                <p className="font-medium">{lote.registrosTotales}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Errores:</p>
                <p className={`font-medium ${lote.errores > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {lote.errores}
                </p>
              </div>
            </div>
          </div>
          
          {/* Información de mapeo de campos */}
          {lote.mapeo && (
            <div className="mb-6">
              <h4 className="text-gray-800 font-semibold mb-2">Mapeo de Campos</h4>
              <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                <div className="mb-2">
                  <p className="text-sm font-medium">Formato de origen: 
                    <span className="ml-1 text-blue-600">
                      {lote.mapeo.formatoOrigen === 'comiagro' ? 'Formato Comiagro' : 
                       lote.mapeo.formatoOrigen === 'plantilla51' ? 'Plantilla 51 (SIMONA)' : 
                       lote.mapeo.formatoOrigen === 'personalizado' ? 'Formato Personalizado' : 'Desconocido'}
                    </span>
                  </p>
                </div>
                
                {lote.mapeo.camposOriginales && lote.mapeo.camposOriginales.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Campos identificados:</p>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                      {lote.mapeo.camposOriginales.map((campo, idx) => (
                        <div key={idx} className="bg-white px-2 py-1 rounded text-xs border">
                          {campo}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {lote.mapeo.camposNoMapeados && lote.mapeo.camposNoMapeados.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1 text-orange-700">Campos no mapeados:</p>
                    <div className="flex flex-wrap gap-2">
                      {lote.mapeo.camposNoMapeados.map((campo, idx) => (
                        <div key={idx} className="bg-orange-50 px-2 py-1 rounded text-xs border border-orange-200">
                          {campo}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Logs de procesamiento */}
          {lote.logs && lote.logs.length > 0 && (
            <div>
              <h4 className="text-gray-800 font-semibold mb-2">Registro de Actividades</h4>
              <div className="border rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mensaje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lote.logs.map((log, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                          {formatearFecha(log.timestamp)}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                          {log.mensaje}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        {/* Pie del modal */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end border-t">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesLote;