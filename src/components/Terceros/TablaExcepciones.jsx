import React, { useState } from 'react';
import { useTerceros } from '../../contexts/TercerosContext';
import AccionesTercero from './AccionesTercero';

const TablaExcepciones = () => {
  const { excepciones, cargando } = useTerceros();
  const [excepcionSeleccionada, setExcepcionSeleccionada] = useState(null);
  const [mostrarAcciones, setMostrarAcciones] = useState(false);
  
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
  
  // Color según el estado de validación
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'No_Encontrado': return 'bg-red-100 text-red-800 border-red-200';
      case 'Inconsistente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Corregida': return 'bg-green-100 text-green-800 border-green-200';
      case 'En_Creacion_Manual': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Ignorada': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Obtener icono según el estado
  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'No_Encontrado':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Inconsistente':
        return (
          <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.732L13.732 4.732c-.77-1.065-2.694-1.065-3.464 0L3.34 16.268c-.77 1.065.192 2.732 1.732 2.732z" />
          </svg>
        );
      case 'Corregida':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Obtener texto legible del estado
  const getEstadoTexto = (estado) => {
    const mapeo = {
      'No_Encontrado': 'No Encontrado',
      'Inconsistente': 'Inconsistente',
      'Corregida': 'Corregida',
      'En_Creacion_Manual': 'En Creación',
      'Ignorada': 'Ignorada'
    };
    return mapeo[estado] || estado;
  };
  
  // Manejador para gestionar acciones sobre un tercero
  const handleGestionarTercero = (excepcion) => {
    setExcepcionSeleccionada(excepcion);
    setMostrarAcciones(true);
  };
  
  // Función para determinar si un tercero es activo (se pueden tomar acciones)
  const esTerceroActivo = (estado) => {
    return ['No_Encontrado', 'Inconsistente'].includes(estado);
  };

  // Calcular estadísticas
  const estadisticas = {
    total: excepciones.length,
    pendientes: excepciones.filter(e => ['No_Encontrado', 'Inconsistente'].includes(e.estadoValidacion)).length,
    resueltas: excepciones.filter(e => ['Corregida', 'En_Creacion_Manual', 'Ignorada'].includes(e.estadoValidacion)).length
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header con estadísticas */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Excepciones de Validación DIAN</h2>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{estadisticas.total}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{estadisticas.pendientes}</div>
              <div className="text-xs text-gray-500">Pendientes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{estadisticas.resueltas}</div>
              <div className="text-xs text-gray-500">Resueltas</div>
            </div>
          </div>
        </div>
      </div>
      
      {cargando && excepciones.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <span className="text-gray-600">Cargando excepciones...</span>
          </div>
        </div>
      ) : excepciones.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg text-gray-600 mb-2">¡Excelente!</p>
          <p className="text-gray-500">No hay excepciones de validación DIAN pendientes</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Lote</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Fila</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Documento</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre Reportado</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {excepciones.map((excepcion) => (
                <tr key={excepcion.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">#{excepcion.loteId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{excepcion.filaOrigen}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{excepcion.documento}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {excepcion.nombreReportado}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(excepcion.estadoValidacion)}`}>
                      {getEstadoIcon(excepcion.estadoValidacion)}
                      <span className="ml-2">{getEstadoTexto(excepcion.estadoValidacion)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatearFecha(excepcion.fechaDeteccion)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {esTerceroActivo(excepcion.estadoValidacion) ? (
                      <button
                        onClick={() => handleGestionarTercero(excepcion)}
                        className="inline-flex items-center px-3 py-1 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Gestionar
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm text-gray-500 bg-gray-50">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Resuelto
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal para gestionar acciones sobre un tercero */}
      {mostrarAcciones && excepcionSeleccionada && (
        <AccionesTercero 
          excepcion={excepcionSeleccionada} 
          onClose={() => setMostrarAcciones(false)} 
        />
      )}
    </div>
  );
};

export default TablaExcepciones;