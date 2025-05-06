import React from 'react';

/**
 * Componente para mostrar los errores de validación de un lote
 * 
 * Este componente muestra un modal con una tabla de errores detectados
 * durante el procesamiento del lote, incluyendo la fila, el campo y
 * la descripción del error.
 */
const ErroresValidacion = ({ errores, onClose }) => {
  if (!errores || errores.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Cabecera del modal */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <span className="text-red-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            Errores de Validación ({errores.length})
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
          <div className="mb-4 text-sm text-gray-600">
            <p>
              Se han encontrado los siguientes errores durante el procesamiento. 
              Para continuar, debe corregir estos errores y cargar el archivo nuevamente.
            </p>
          </div>
          
          {/* Tabla de errores */}
          <div className="border rounded overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fila
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción del Error
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {errores.map((error, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {error.fila}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        {error.campo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {error.error}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Nota de consecuencias */}
          <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200">
            <h4 className="text-yellow-800 font-semibold text-sm mb-2">
              Importante:
            </h4>
            <p className="text-sm text-yellow-800">
              Los errores en el registro de facturas pueden generar:
            </p>
            <ul className="list-disc list-inside mt-1 text-sm text-yellow-800">
              <li>Costos adicionales por correcciones (20-30 pesos por línea)</li>
              <li>Riesgo de invalidación del beneficio tributario ante la DIAN</li>
              <li>Problemas de cumplimiento para el cliente final</li>
            </ul>
          </div>
        </div>
        
        {/* Pie del modal */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cerrar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => {
              // Aquí iría la funcionalidad para exportar los errores, 
              // por ahora solo cerramos el modal
              onClose();
            }}
          >
            Exportar Errores
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErroresValidacion;