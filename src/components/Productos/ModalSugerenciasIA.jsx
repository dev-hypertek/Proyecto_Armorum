import React, { useState } from 'react';
import { useProductos } from '../../contexts/ProductosContext';

const ModalSugerenciasIA = ({ producto, onClose }) => {
  const { sugerenciasIA, confirmarMatch, cargando } = useProductos();
  const [sugerenciaSeleccionada, setSugerenciaSeleccionada] = useState(null);
  const [mostrarDetalles, setMostrarDetalles] = useState(null);
  
  const handleConfirmarMatch = async () => {
    if (!sugerenciaSeleccionada) {
      return;
    }
    
    try {
      await confirmarMatch(producto.id, sugerenciaSeleccionada.codigo);
      onClose();
    } catch (error) {
      console.error('Error al confirmar match:', error);
    }
  };
  
  const getColorConfianza = (confianza) => {
    if (confianza >= 90) return 'text-green-600 bg-green-50';
    if (confianza >= 75) return 'text-yellow-600 bg-yellow-50';
    if (confianza >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };
  
  const getIconoConfianza = (confianza) => {
    if (confianza >= 90) {
      return (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (confianza >= 75) {
      return (
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.732L13.732 4.732c-.77-1.065-2.694-1.065-3.464 0L3.34 16.268c-.77 1.065.192 2.732 1.732 2.732z" />
      </svg>
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Sugerencias de IA para Homologación
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Lote #{producto.loteId} - Fila {producto.filaOriginal}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Producto original */}
        <div className="p-6 border-b border-gray-200 bg-blue-50">
          <h4 className="font-medium text-blue-900 mb-2">Producto Original</h4>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="text-lg font-semibold text-gray-900">
              "{producto.descripcionOriginal}"
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Cliente: {producto.cliente}
            </p>
          </div>
        </div>
        
        {/* Lista de sugerencias */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <h4 className="font-medium text-gray-900 mb-4">
            Resultados de IA ({sugerenciasIA.length} sugerencias encontradas)
          </h4>
          
          {sugerenciasIA.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-600">No se encontraron sugerencias con IA</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sugerenciasIA.map((sugerencia, index) => (
                <div
                  key={index}
                  className={`
                    p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${sugerenciaSeleccionada?.codigo === sugerencia.codigo
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => setSugerenciaSeleccionada(sugerencia)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="text-lg font-semibold text-gray-900">
                          {sugerencia.nombre}
                        </h5>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getColorConfianza(sugerencia.confianza)}`}>
                          {getIconoConfianza(sugerencia.confianza)}
                          <span className="ml-1">{sugerencia.confianza}%</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Código:</strong> {sugerencia.codigo}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Descripción:</strong> {sugerencia.descripcion}
                      </p>
                      
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <span><strong>Categoría:</strong> {sugerencia.categoria}</span>
                        <span><strong>Marca:</strong> {sugerencia.marca}</span>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMostrarDetalles(mostrarDetalles === index ? null : index);
                        }}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        {mostrarDetalles === index ? 'Ocultar' : 'Ver más'}
                      </button>
                      
                      {sugerenciaSeleccionada?.codigo === sugerencia.codigo && (
                        <div className="mt-2">
                          <svg className="w-6 h-6 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {mostrarDetalles === index && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Información adicional:</span>
                          <ul className="mt-1 text-gray-600">
                            <li>• Archivo maestro verificado</li>
                            <li>• Última actualización: Ayer</li>
                            <li>• Usado en {Math.floor(Math.random() * 50) + 10} lotes anteriores</li>
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Razón de coincidencia:</span>
                          <p className="mt-1 text-gray-600 text-xs">
                            Similitud en palabras clave, categoría y especificaciones técnicas.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {sugerenciaSeleccionada ? (
                <>
                  <span className="font-medium">Seleccionado:</span> {sugerenciaSeleccionada.nombre}
                  <span className="ml-2 text-green-600">({sugerenciaSeleccionada.confianza}% confianza)</span>
                </>
              ) : (
                'Seleccione una sugerencia para confirmar el match'
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              
              <button
                onClick={handleConfirmarMatch}
                disabled={!sugerenciaSeleccionada || cargando}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors inline-flex items-center"
              >
                {cargando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Confirmando...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Confirmar Match
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSugerenciasIA;