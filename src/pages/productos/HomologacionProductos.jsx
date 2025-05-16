import React from 'react';
import { useProductos } from '../../contexts/ProductosContext';
import TablaProductos from '../../components/Productos/TablaProductos';
import EstadisticasProductos from '../../components/Productos/EstadisticasProductos';

const HomologacionProductos = () => {
  const { mensaje, productosNoHomologados, descargarProductosParaCreacion, cargando } = useProductos();
  
  // Contar productos para creación
  const productosParaCreacion = productosNoHomologados.filter(p => p.estadoHomologacion === 'Para_Creacion').length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Homologación de Productos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gestione el mapeo automático de productos con IA y supervise las coincidencias
            </p>
          </div>
        </div>
      </div>
      
      {/* Mensaje informativo/error */}
      {mensaje.texto && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className={`p-4 rounded-lg border-l-4 ${
            mensaje.tipo === 'error' 
              ? 'bg-red-50 border-red-400 text-red-700' 
              : mensaje.tipo === 'warning'
              ? 'bg-yellow-50 border-yellow-400 text-yellow-700'
              : mensaje.tipo === 'info'
              ? 'bg-blue-50 border-blue-400 text-blue-700'
              : 'bg-green-50 border-green-400 text-green-700'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {mensaje.tipo === 'error' ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : mensaje.tipo === 'warning' ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : mensaje.tipo === 'info' ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {mensaje.texto}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Información explicativa */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-50 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  ¿Cómo funciona la Homologación con IA?
                </h2>
                <p className="text-gray-600 mb-4">
                  Nuestro sistema utiliza inteligencia artificial para encontrar coincidencias entre los productos de las facturas 
                  y nuestro catálogo BMC. Cada producto recibe múltiples sugerencias ordenadas por nivel de confianza.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-blue-800">Automático</h3>
                    </div>
                    <p className="text-sm text-blue-700">
                      Coincidencias &lt; 90% se aprueban automáticamente
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-center mb-2">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-yellow-800">Revisión Manual</h3>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Coincidencias 60-90% requieren confirmación
                    </p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex items-center mb-2">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-red-800">Creación Nueva</h3>
                    </div>
                    <p className="text-sm text-red-700">
                    Coincidencias &lt; 60% se marcan para crear
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Estadísticas */}
          <EstadisticasProductos />
          
          {/* Botón de descarga para productos marcados para creación */}
          {productosParaCreacion > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Productos Marcados para Creación
                  </h3>
                  <p className="text-gray-600">
                    {productosParaCreacion} producto{productosParaCreacion !== 1 ? 's' : ''} requiere{productosParaCreacion === 1 ? '' : 'n'} creación manual en BMC
                  </p>
                </div>
                <button
                  onClick={descargarProductosParaCreacion}
                  disabled={cargando}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
                >
                  {cargando ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Descargar Excel para BMC
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Tabla de productos */}
          <TablaProductos />
        </div>
      </div>
    </div>
  );
};

export default HomologacionProductos;