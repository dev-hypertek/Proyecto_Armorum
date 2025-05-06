import React, { useState, useEffect } from 'react';
import { useFacturas } from '../../contexts/FacturasContext';

/**
 * Componente para el mapeo manual de campos en un formato personalizado
 * 
 * Este componente permite al usuario establecer relaciones entre las columnas
 * de su archivo original y los campos requeridos por el formato Comiagro.
 */
const MapeoManual = ({ lote, onClose, onContinuar }) => {
  const { obtenerSugerenciasMapeoCampos, continuarProcesamiento, cargando, setMensaje } = useFacturas();
  const [camposDestino, setCamposDestino] = useState([]);
  const [columnasOrigen, setColumnasOrigen] = useState([]);
  const [mapeo, setMapeo] = useState({});
  const [sugerenciasListas, setSugerenciasListas] = useState(false);
  const [cargandoSugerencias, setCargandoSugerencias] = useState(true);
  
  // Cargar sugerencias de mapeo al iniciar
  useEffect(() => {
    const cargarSugerencias = async () => {
      try {
        setCargandoSugerencias(true);
        // En un entorno real, aquí enviaríamos el archivo para analizarlo
        // Por ahora usamos la función de simulación
        const sugerencias = await obtenerSugerenciasMapeoCampos(null, 'comiagro');
        
        setCamposDestino(sugerencias.camposDestino);
        setColumnasOrigen(sugerencias.columnasDetectadas);
        
        // Establecer mapeo inicial con sugerencias
        const mapeoInicial = {};
        Object.entries(sugerencias.sugerencias).forEach(([columnaOrigen, idCampoDestino]) => {
          mapeoInicial[idCampoDestino] = columnaOrigen;
        });
        
        setMapeo(mapeoInicial);
        setSugerenciasListas(true);
      } catch (error) {
        setMensaje({ tipo: 'error', texto: 'Error al obtener sugerencias de mapeo: ' + error.message });
      } finally {
        setCargandoSugerencias(false);
      }
    };
    
    cargarSugerencias();
  }, [obtenerSugerenciasMapeoCampos, setMensaje]);
  
  // Manejar cambio de selección en un campo
  const handleMapeoChange = (campoDest, columnaOrigen) => {
    setMapeo(prevMapeo => ({
      ...prevMapeo,
      [campoDest]: columnaOrigen
    }));
  };
  
  // Función para guardar el mapeo y continuar el procesamiento
  const guardarMapeoYContinuar = async () => {
    try {
      // Verificar que todos los campos requeridos estén mapeados
      const camposRequeridos = ['nombreUsuario', 'nitUsuario', 'fecha', 'factNro', 'producto', 'cantidad', 'valorUnitario', 'total'];
      const camposFaltantes = camposRequeridos.filter(campo => !mapeo[campo]);
      
      if (camposFaltantes.length > 0) {
        setMensaje({
          tipo: 'error',
          texto: `Faltan campos requeridos por mapear: ${camposFaltantes.join(', ')}`
        });
        return;
      }
      
      // En un entorno real, aquí enviaríamos el mapeo al backend
      await continuarProcesamiento(lote.id, { mapeo });
      onClose();
      if (onContinuar) onContinuar();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al guardar mapeo: ' + error.message });
    }
  };
  
  // Función para encontrar el nombre completo de un campo por su ID
  const getNombreCampo = (idCampo) => {
    const campo = camposDestino.find(c => c.id === idCampo);
    return campo ? campo.nombre : idCampo;
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-4/5 max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Cabecera del modal */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Mapeo Manual de Campos - Lote #{lote.id}
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
          {cargandoSugerencias ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Analizando archivo y generando sugerencias de mapeo...</p>
            </div>
          ) : (
            <>
              {/* Explicación del mapeo */}
              <div className="bg-blue-50 p-4 rounded mb-6">
                <h4 className="text-blue-800 font-semibold mb-2">Instrucciones</h4>
                <p className="text-sm text-blue-900 mb-2">
                  Para cada campo requerido en el formato Comiagro (izquierda), seleccione la columna 
                  correspondiente de su archivo original (derecha). Los campos requeridos están marcados con *.
                </p>
                <p className="text-sm text-blue-900">
                  El sistema ha generado sugerencias automáticas basadas en el análisis de su archivo. 
                  Puede modificar estas sugerencias según sea necesario.
                </p>
              </div>
              
              {/* Tabla de mapeo */}
              <div className="border rounded overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campo Comiagro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Columna en Archivo Original
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requerido
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {camposDestino.map((campo) => {
                      // Determinar si el campo es requerido
                      const esRequerido = ['nombreUsuario', 'nitUsuario', 'fecha', 'factNro', 'producto', 'cantidad', 'valorUnitario', 'total'].includes(campo.id);
                      
                      return (
                        <tr key={campo.id} className={`${esRequerido ? 'bg-yellow-50' : ''}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-medium">
                              {campo.nombre}
                              {esRequerido && <span className="text-red-500 ml-1">*</span>}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={mapeo[campo.id] || ''}
                              onChange={(e) => handleMapeoChange(campo.id, e.target.value)}
                            >
                              <option value="">-- Seleccionar --</option>
                              {columnasOrigen.map((columna) => (
                                <option key={columna} value={columna}>
                                  {columna}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {esRequerido ? (
                              <span className="text-red-600 font-bold">Sí</span>
                            ) : (
                              <span className="text-gray-500">No</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Resumen del mapeo */}
              <div className="bg-gray-50 p-4 rounded border mb-4">
                <h4 className="text-gray-800 font-semibold mb-2">Resumen del Mapeo</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {Object.entries(mapeo).map(([idCampoDestino, columnaOrigen]) => (
                    <div key={idCampoDestino} className="bg-white p-2 rounded border text-sm">
                      <span className="font-medium">{getNombreCampo(idCampoDestino)}:</span> 
                      <span className="ml-1 text-blue-600">{columnaOrigen}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Pie del modal */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
            disabled={cargando}
          >
            Cancelar
          </button>
          <button
            onClick={guardarMapeoYContinuar}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!sugerenciasListas || cargando || Object.keys(mapeo).length === 0}
          >
            {cargando ? 'Procesando...' : 'Aplicar Mapeo y Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapeoManual;