import React from 'react';
import { useFacturas } from '../../contexts/FacturasContext';
import CargaArchivo from '../../components/Facturas/CargaArchivo';
import TablaLotes from '../../components/Facturas/TablaLotes';

/**
 * Página principal del módulo de procesamiento de facturas
 * 
 * Esta página integra los componentes de carga de archivos y la
 * tabla de lotes de procesamiento, mostrando también mensajes
 * informativos o de error.
 */
const ProcesamientoFacturas = () => {
  const { mensaje } = useFacturas();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Procesamiento de Facturas
        </h1>
      </div>
      
      {/* Mensaje informativo/error */}
      {mensaje.texto && (
        <div className={`mb-4 p-4 rounded ${
          mensaje.tipo === 'error' 
            ? 'bg-red-100 border-l-4 border-red-500 text-red-700' 
            : 'bg-green-100 border-l-4 border-green-500 text-green-700'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0 mt-1">
              {mensaje.tipo === 'error' ? (
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm">{mensaje.texto}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        {/* Componente de carga de archivos */}
        <CargaArchivo />
        
        {/* Separador */}
        <div className="my-2">
          <hr className="border-gray-200" />
        </div>
        
        {/* Tabla de lotes de procesamiento */}
        <TablaLotes />
      </div>
    </div>
  );
};

export default ProcesamientoFacturas;