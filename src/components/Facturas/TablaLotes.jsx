import { useFacturas } from '../../contexts/FacturasContext';
import { useState } from 'react';
import DetallesLote from './DetallesLote';
import ErroresValidacion from './ErroresValidacion';
import MapeoManual from './MapeoManual';

const TablaLotes = () => {
  const { lotes, cargando, verDetalleLote, descargarPlantillaComiagro, setMensaje, loteSeleccionado, errores } = useFacturas();
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mostrarErrores, setMostrarErrores] = useState(false);
  const [mostrarMapeo, setMostrarMapeo] = useState(false);
  
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

  // Función para obtener el nombre legible del formato
  const obtenerNombreFormato = (formato) => {
    const nombres = {
      'xml': 'XML (Facturas)',
      'csv_excel': 'CSV/Excel',
      'txt_plano': 'Texto Plano',
      'plantilla51': 'Plantilla 51'
    };
    return nombres[formato] || formato;
  };
  
  // Color según el estado del lote
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Completado con Advertencias': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Procesando': return 'bg-blue-100 text-blue-800';
      case 'Validando': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para determinar si se puede descargar
  const puedeDescargar = (estado) => {
    return estado === 'Completado' || estado === 'Completado con Advertencias';
  };
  
  // Manejador para ver detalles del lote
  const handleVerDetalles = async (loteId) => {
    try {
      await verDetalleLote(loteId);
      setMostrarDetalles(true);
      setMostrarErrores(false);
      setMostrarMapeo(false);
    } catch (error) {
      console.error('Error al ver detalles:', error);
    }
  };
  
  // Manejador para ver errores del lote
  const handleVerErrores = async (loteId) => {
    try {
      await verDetalleLote(loteId);
      setMostrarErrores(true);
      setMostrarDetalles(false);
      setMostrarMapeo(false);
    } catch (error) {
      console.error('Error al ver errores:', error);
    }
  };
  
  // Manejador para realizar mapeo manual
  const handleMapeoManual = async (loteId) => {
    try {
      await verDetalleLote(loteId);
      setMostrarMapeo(true);
      setMostrarDetalles(false);
      setMostrarErrores(false);
    } catch (error) {
      console.error('Error al preparar mapeo manual:', error);
    }
  };
  
  // Manejador para descargar plantilla
  const handleDescargar = async (loteId) => {
    try {
      await descargarPlantillaComiagro(loteId);
    } catch (error) {
      console.error('Error al descargar plantilla:', error);
    }
  };
  
  return (
    <div className="border shadow-md w-full bg-white rounded-md overflow-hidden">
      <h2 className="text-xl font-semibold p-6 pb-4">Lotes de Procesamiento</h2>
      <hr />
      
      {cargando && lotes.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Cargando lotes...</span>
        </div>
      ) : lotes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg">No hay lotes de procesamiento disponibles</p>
          <p className="text-sm">Suba un archivo para comenzar el procesamiento</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left border-b">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Archivo</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Registros</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Errores</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lotes.map((lote) => (
                <tr key={lote.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                    #{lote.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">
                        {obtenerIconoTipoArchivo(lote.formato)}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {lote.nombreArchivo}
                        </div>
                        {lote.tipoArchivoDetectado && (
                          <div className="text-xs text-gray-500">
                            {lote.tipoArchivoDetectado}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatearFecha(lote.fechaCarga)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {lote.cliente}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {obtenerNombreFormato(lote.formato)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getEstadoColor(lote.estado)}`}>
                      {lote.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {lote.registrosTotales?.toLocaleString() || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {lote.errores > 0 ? (
                      <div className="flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-600 font-medium">{lote.errores}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-600 font-medium">0</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleVerDetalles(lote.id)}
                        className="inline-flex items-center px-3 py-1 border border-blue-300 rounded-md text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                        title="Ver detalles del lote"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Detalles
                      </button>
                      
                      {lote.errores > 0 && (
                        <button
                          onClick={() => handleVerErrores(lote.id)}
                          className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                          title="Ver errores encontrados"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Errores
                        </button>
                      )}
                      
                      {lote.formato === 'personalizado' && lote.estado !== 'Completado' && (
                        <button
                          onClick={() => handleMapeoManual(lote.id)}
                          className="inline-flex items-center px-3 py-1 border border-purple-300 rounded-md text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors"
                          title="Realizar mapeo manual de campos"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                          Mapeo
                        </button>
                      )}
                      
                      {puedeDescargar(lote.estado) && (
                        <button
                          onClick={() => handleDescargar(lote.id)}
                          className="inline-flex items-center px-3 py-1 border border-green-300 rounded-md text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                          title="Descargar plantilla Comiagro"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Descargar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal para detalles del lote */}
      {mostrarDetalles && loteSeleccionado && (
        <DetallesLote 
          lote={loteSeleccionado} 
          onClose={() => setMostrarDetalles(false)} 
        />
      )}
      
      {/* Modal para errores de validación */}
      {mostrarErrores && errores.length > 0 && (
        <ErroresValidacion 
          errores={errores} 
          onClose={() => setMostrarErrores(false)} 
        />
      )}
      
      {/* Modal para mapeo manual */}
      {mostrarMapeo && loteSeleccionado && (
        <MapeoManual
          lote={loteSeleccionado}
          onClose={() => setMostrarMapeo(false)}
          onContinuar={() => {
            setMostrarMapeo(false);
            setTimeout(() => {
              setMensaje({ tipo: 'exito', texto: 'Procesamiento continuado con mapeo manual aplicado' });
            }, 1000);
          }}
        />
      )}
    </div>
  );
};

export default TablaLotes;