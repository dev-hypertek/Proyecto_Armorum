import React, { useState } from 'react';
import { useProductos } from '../../contexts/ProductosContext';
import ModalSugerenciasIA from './ModalSugerenciasIA';
import ModalCreacionProducto from './ModalCreacionProducto';

const TablaProductos = () => {
  const { 
    productosNoHomologados, 
    obtenerSugerenciasIA, 
    setProductoSeleccionado,
    cargando 
  } = useProductos();
  
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [mostrarCreacion, setMostrarCreacion] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  
  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Color y estado según el estado de homologación
  const getEstadoInfo = (estado, confianza = null) => {
    switch (estado) {
      case 'Pendiente':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          texto: 'Pendiente'
        };
      case 'Baja_Confianza':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.732L13.732 4.732c-.77-1.065-2.694-1.065-3.464 0L3.34 16.268c-.77 1.065.192 2.732 1.732 2.732z" />
            </svg>
          ),
          texto: `Baja Confianza (${confianza}%)`
        };
      case 'Homologado':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
          texto: 'Homologado'
        };
      case 'Para_Creacion':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          ),
          texto: 'Para Creación'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null,
          texto: estado
        };
    }
  };
  
  // Manejador para buscar con IA
  const handleBuscarConIA = async (producto) => {
    setProductoActual(producto);
    setProductoSeleccionado(producto);
    await obtenerSugerenciasIA(producto.descripcionOriginal);
    setMostrarSugerencias(true);
  };
  
  // Manejador para marcar para creación
  const handleMarcarParaCreacion = (producto) => {
    setProductoActual(producto);
    setProductoSeleccionado(producto);
    setMostrarCreacion(true);
  };

  // Filtrar productos según el estado
  const productosFiltrados = productosNoHomologados;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Productos sin Homologar</h2>
          <div className="text-sm text-gray-500">
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      
      {cargando && productosFiltrados.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <span className="text-gray-600">Cargando productos...</span>
          </div>
        </div>
      ) : productosFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg text-gray-600 mb-2">¡Perfecto!</p>
          <p className="text-gray-500">Todos los productos han sido homologados</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Lote</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Fila</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Descripción Original</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Sugerencia IA</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {productosFiltrados.map((producto) => {
                const estadoInfo = getEstadoInfo(producto.estadoHomologacion, producto.confianzaIA);
                
                return (
                  <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">#{producto.loteId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{producto.filaOriginal}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        <p className="font-medium">{producto.descripcionOriginal}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{producto.cliente}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${estadoInfo.color}`}>
                        {estadoInfo.icon}
                        <span className="ml-2">{estadoInfo.texto}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {producto.sugerenciaIA ? (
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{producto.sugerenciaIA.nombre}</p>
                          <p className="text-xs text-gray-500">Código: {producto.sugerenciaIA.codigo}</p>
                          <p className="text-xs text-green-600">Confianza: {producto.sugerenciaIA.confianza}%</p>
                        </div>
                      ) : producto.codigoAsignado ? (
                        <div className="text-sm">
                          <p className="font-medium text-green-800">{producto.codigoAsignado}</p>
                          <p className="text-xs text-gray-500">Confirmado</p>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Sin procesar</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatearFecha(producto.fechaDeteccion)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex space-x-2">
                        {producto.estadoHomologacion === 'Pendiente' && (
                          <button
                            onClick={() => handleBuscarConIA(producto)}
                            className="inline-flex items-center px-3 py-1 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Buscar con IA
                          </button>
                        )}
                        
                        {(producto.estadoHomologacion === 'Baja_Confianza' || producto.estadoHomologacion === 'Pendiente') && (
                          <button
                            onClick={() => handleBuscarConIA(producto)}
                            className="inline-flex items-center px-3 py-1 border border-green-300 rounded-md text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Revisar
                          </button>
                        )}
                        
                        {(producto.estadoHomologacion === 'Pendiente' || producto.estadoHomologacion === 'Baja_Confianza') && (
                          <button
                            onClick={() => handleMarcarParaCreacion(producto)}
                            className="inline-flex items-center px-3 py-1 border border-purple-300 rounded-md text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Crear Nuevo
                          </button>
                        )}
                        
                        {producto.estadoHomologacion === 'Homologado' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-md text-sm text-green-600 bg-green-50">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Completado
                          </span>
                        )}
                        
                        {producto.estadoHomologacion === 'Para_Creacion' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-md text-sm text-purple-600 bg-purple-50">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Para Creación
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modales */}
      {mostrarSugerencias && productoActual && (
        <ModalSugerenciasIA
          producto={productoActual}
          onClose={() => {
            setMostrarSugerencias(false);
            setProductoActual(null);
          }}
        />
      )}
      
      {mostrarCreacion && productoActual && (
        <ModalCreacionProducto
          producto={productoActual}
          onClose={() => {
            setMostrarCreacion(false);
            setProductoActual(null);
          }}
        />
      )}
    </div>
  );
};

export default TablaProductos;