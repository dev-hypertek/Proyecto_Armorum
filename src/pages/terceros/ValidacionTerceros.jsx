import React from 'react';
import { useTerceros } from '../../contexts/TercerosContext';
import TablaExcepciones from '../../components/Terceros/TablaExcepciones';

const ValidacionTerceros = () => {
  const { mensaje } = useTerceros();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Validación de Terceros DIAN
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gestione excepciones de validación y mantenga el registro DIAN actualizado
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
          {/* Información explicativa moderna */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  ¿Qué son las excepciones DIAN?
                </h2>
                <p className="text-gray-600 mb-4">
                  Durante el procesamiento automático, Armorum valida todos los terceros (compradores) en la base de datos DIAN. 
                  Cuando encuentra inconsistencias, las marca como excepciones que requieren revisión manual.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex items-center mb-2">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-red-800">No Encontrado</h3>
                    </div>
                    <p className="text-sm text-red-700">
                      El NIT/Cédula no existe en los registros oficiales de la DIAN
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-center mb-2">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-yellow-800">Inconsistente</h3>
                    </div>
                    <p className="text-sm text-yellow-700">
                      El nombre reportado no coincide con el registrado en la DIAN
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.732L13.732 4.732c-.77-1.065-2.694-1.065-3.464 0L3.34 16.268c-.77 1.065.192 2.732 1.732 2.732z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">Importante para la Exención</h4>
                      <p className="text-sm text-amber-700">
                        Para aplicar la exención de retención en la fuente, todos los terceros deben estar 
                        correctamente registrados ante la DIAN. Las excepciones deben resolverse antes de generar la plantilla final.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabla de excepciones */}
          <TablaExcepciones />
        </div>
      </div>
    </div>
  );
};

export default ValidacionTerceros;