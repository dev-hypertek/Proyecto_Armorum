import React, { useState } from 'react';
import { useTerceros } from '../../contexts/TercerosContext';

/**
 * Componente para gestionar acciones sobre excepciones de terceros
 * 
 * Este componente muestra un modal con opciones para gestionar una
 * excepción de validación DIAN, permitiendo marcarla como corregida,
 * para creación manual o ignorada.
 */
const AccionesTercero = ({ excepcion, onClose }) => {
  const { actualizarTercero, cargando } = useTerceros();
  const [notas, setNotas] = useState(excepcion.notas || '');
  const [accionSeleccionada, setAccionSeleccionada] = useState('');
  
  // Función para aplicar la acción seleccionada
  const aplicarAccion = async () => {
    if (!accionSeleccionada) {
      return;
    }
    
    try {
      await actualizarTercero(excepcion.id, accionSeleccionada, { notas });
      onClose();
    } catch (error) {
      console.error('Error al actualizar tercero:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-2/3 max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Cabecera del modal */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Gestionar Excepción de Tercero
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
          {/* Información del tercero */}
          <div className="bg-blue-50 p-4 rounded mb-6">
            <h4 className="text-blue-800 font-semibold mb-2">Información del Tercero</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Documento:</p>
                <p className="font-medium">{excepcion.documento}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nombre Reportado:</p>
                <p className="font-medium">{excepcion.nombreReportado}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado Validación:</p>
                <p className="font-medium">{excepcion.estadoValidacion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">ID Lote / Fila:</p>
                <p className="font-medium">{excepcion.loteId} / {excepcion.filaOrigen}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Formato Archivo:</p>
                <p className="font-medium">
                  {excepcion.formatoArchivo === 'comiagro' ? 'Formato Comiagro' : 
                   excepcion.formatoArchivo === 'plantilla51' ? 'Plantilla 51 (SIMONA)' : 
                   excepcion.formatoArchivo === 'personalizado' ? 'Formato Personalizado' : 'Desconocido'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Campo Afectado:</p>
                <p className="font-medium">{excepcion.campoAfectado || 'No especificado'}</p>
              </div>
            </div>
            {excepcion.notas && (
              <div className="mt-3 border-t pt-3">
                <p className="text-sm text-gray-600">Notas:</p>
                <p className="text-sm mt-1 bg-white p-2 rounded border">{excepcion.notas}</p>
              </div>
            )}
          </div>
          
          {/* Selección de acciones */}
          <div className="mb-6">
            <h4 className="text-gray-800 font-semibold mb-3">Seleccionar Acción</h4>
            <div className="grid grid-cols-1 gap-3">
              <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="accion"
                  value="corregir"
                  checked={accionSeleccionada === 'corregir'}
                  onChange={() => setAccionSeleccionada('corregir')}
                  className="mr-3"
                />
                <div>
                  <span className="font-medium">Marcar como Corregido</span>
                  <p className="text-sm text-gray-500">
                    Seleccione esta opción si ha corregido la información en el archivo fuente y va a reprocesarlo.
                  </p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="accion"
                  value="crear"
                  checked={accionSeleccionada === 'crear'}
                  onChange={() => setAccionSeleccionada('crear')}
                  className="mr-3"
                />
                <div>
                  <span className="font-medium">Marcar para Creación Manual</span>
                  <p className="text-sm text-gray-500">
                    Seleccione esta opción si el tercero no existe en la DIAN y debe ser creado manualmente.
                  </p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="accion"
                  value="ignorar"
                  checked={accionSeleccionada === 'ignorar'}
                  onChange={() => setAccionSeleccionada('ignorar')}
                  className="mr-3"
                />
                <div>
                  <span className="font-medium">Ignorar</span>
                  <p className="text-sm text-gray-500">
                    Seleccione esta opción si el registro no es crítico y puede ser ignorado.
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          {/* Campo de notas */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas (opcional)
            </label>
            <textarea
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Agregue notas adicionales para el seguimiento..."
            ></textarea>
          </div>
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
            onClick={aplicarAccion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!accionSeleccionada || cargando}
          >
            {cargando ? 'Procesando...' : 'Aplicar Acción'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccionesTercero;