import React from 'react';
import { useTerceros } from '../../contexts/TercerosContext';
import TablaExcepciones from '../../components/Terceros/TablaExcepciones';

/**
 * Página principal del módulo de validación de terceros
 * 
 * Esta página integra el componente de tabla de excepciones,
 * mostrando también mensajes informativos o de error.
 */
const ValidacionTerceros = () => {
  const { mensaje } = useTerceros();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Validación de Terceros DIAN
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
      
      {/* Explicación del módulo */}
      <div className="bg-white p-4 rounded-md shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Acerca de la Validación de Terceros
        </h2>
        <p className="text-gray-600">
          Este módulo permite gestionar las excepciones encontradas durante la validación 
          de terceros (compradores) ante la DIAN. Las excepciones pueden ser:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>
            <span className="font-medium">No Encontrado</span>: El NIT/Cédula no existe en los registros de la DIAN.
          </li>
          <li>
            <span className="font-medium">Inconsistente</span>: El nombre reportado no coincide con el registrado en la DIAN.
          </li>
        </ul>
        <div className="mt-3 bg-yellow-50 p-3 rounded">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Importante:</span> Para que el beneficio de exención de retención en la fuente 
            sea válido, todos los terceros deben estar correctamente registrados ante la DIAN.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Tabla de excepciones */}
        <TablaExcepciones />
      </div>
    </div>
  );
};

export default ValidacionTerceros;