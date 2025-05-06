import React, { useState } from 'react';
import { useTerceros } from '../../contexts/TercerosContext';
import AccionesTercero from './AccionesTercero';

/**
 * Componente para mostrar las excepciones de validación DIAN
 * 
 * Este componente muestra una tabla con las excepciones de validación
 * detectadas al validar terceros en la DIAN, permitiendo al usuario
 * tomar acciones sobre cada excepción.
 */
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
      case 'No Encontrado': return 'bg-red-100 text-red-800';
      case 'Inconsistente': return 'bg-orange-100 text-orange-800';
      case 'Corregido': return 'bg-green-100 text-green-800';
      case 'En Creación Manual': return 'bg-blue-100 text-blue-800';
      case 'Ignorado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Manejador para gestionar acciones sobre un tercero
  const handleGestionarTercero = (excepcion) => {
    setExcepcionSeleccionada(excepcion);
    setMostrarAcciones(true);
  };
  
  // Función para determinar si un tercero es activo (se pueden tomar acciones)
  const esTerceroActivo = (estado) => {
    return ['No Encontrado', 'Inconsistente'].includes(estado);
  };
  
  return (
    <div className="border shadow-md w-full bg-white rounded-md overflow-hidden">
      <h2 className="text-xl font-semibold p-6 pb-4">Excepciones de Validación DIAN</h2>
      <hr />
      
      {cargando && excepciones.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Cargando excepciones...</span>
        </div>
      ) : excepciones.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay excepciones de validación DIAN pendientes
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left border-b">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID Lote</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fila</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Reportado</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Formato</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Campo</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Validación</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Detección</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {excepciones.map((excepcion) => (
                <tr key={excepcion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{excepcion.loteId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{excepcion.filaOrigen}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{excepcion.documento}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{excepcion.nombreReportado}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {excepcion.formatoArchivo === 'comiagro' ? 'Comiagro' : 
                       excepcion.formatoArchivo === 'plantilla51' ? 'Plantilla 51' : 
                       excepcion.formatoArchivo === 'personalizado' ? 'Personalizado' : 'Desconocido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded">
                      {excepcion.campoAfectado || 'No especificado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(excepcion.estadoValidacion)}`}>
                      {excepcion.estadoValidacion}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatearFecha(excepcion.fechaDeteccion)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {esTerceroActivo(excepcion.estadoValidacion) ? (
                      <button
                        onClick={() => handleGestionarTercero(excepcion)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Gestionar
                      </button>
                    ) : (
                      <span className="text-gray-400">Gestionado</span>
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