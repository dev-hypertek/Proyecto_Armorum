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
  
  // Color según el estado del lote
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Procesando': return 'bg-blue-100 text-blue-800';
      case 'Validando': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Manejador para ver detalles del lote
  const handleVerDetalles = async (loteId) => {
    try {
      await verDetalleLote(loteId);
      setMostrarDetalles(true);
      setMostrarErrores(false);
      setMostrarMapeo(false);
    } catch (error) {
      // El mensaje de error lo maneja el context
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
      // El mensaje de error lo maneja el context
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
          No hay lotes de procesamiento disponibles
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left border-b">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Archivo</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Carga</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Formato</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Registros</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Errores</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lotes.map((lote) => (
                <tr key={lote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{lote.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{lote.nombreArchivo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatearFecha(lote.fechaCarga)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{lote.cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {lote.formato === 'comiagro' ? 'Comiagro' : 
                       lote.formato === 'plantilla51' ? 'Plantilla 51' : 
                       lote.formato === 'personalizado' ? 'Personalizado' : 'Desconocido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(lote.estado)}`}>
                      {lote.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{lote.registrosTotales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {lote.errores > 0 ? (
                      <span className="text-red-600 font-medium">{lote.errores}</span>
                    ) : (
                      <span className="text-green-600 font-medium">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleVerDetalles(lote.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Detalles
                    </button>
                    
                    {lote.formato === 'personalizado' && (
                      <button
                        onClick={() => handleMapeoManual(lote.id)}
                        className="text-purple-600 hover:text-purple-900 mr-3"
                      >
                        Mapeo Manual
                      </button>
                    )}
                    
                    {lote.errores > 0 && (
                      <button
                        onClick={() => handleVerErrores(lote.id)}
                        className="text-red-600 hover:text-red-900 mr-3"
                      >
                        Ver Errores
                      </button>
                    )}
                    
                    {lote.estado === 'Completado' && (
                      <button
                        onClick={() => handleDescargar(lote.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Descargar
                      </button>
                    )}
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
            // Actualizar la lista de lotes después de un tiempo para ver los cambios
            setTimeout(() => {
              // En un entorno real, aquí se llamaría a una función para actualizar lotes
              // Por ahora, solo mostramos un mensaje
              setMensaje({ tipo: 'exito', texto: 'Procesamiento continuado con mapeo manual aplicado' });
            }, 1000);
          }}
        />
      )}
    </div>
  );
};

export default TablaLotes;