import { useState, useEffect } from 'react';
import { useFacturas } from '../../contexts/FacturasContext';

const CargaArchivo = () => {
  const { subirArchivo, cargando, setMensaje } = useFacturas();
  const [archivo, setArchivo] = useState(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setArrastrando(true);
  };
  
  const handleDragLeave = () => {
    setArrastrando(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setArrastrando(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      procesarArchivo(file);
    }
  };
  
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      procesarArchivo(file);
    }
  };
  
  const procesarArchivo = (file) => {
    // Validar que sea un archivo de facturación
    const extension = file.name.split('.').pop().toLowerCase();
    const extensionesValidas = ['xlsx', 'xls', 'csv', 'xml', 'txt'];
    
    if (!extensionesValidas.includes(extension)) {
      setMensaje({ 
        tipo: 'error', 
        texto: 'Formato no válido. Use archivos de facturación (Excel, CSV, XML, TXT).' 
      });
      return;
    }
    
    // Generar vista previa según tipo de archivo
    generarVistaPrevia(file);
    setArchivo(file);
  };
  
  const generarVistaPrevia = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    
    // Detectar formato automáticamente
    let formatoDetectado = 'Desconocido';
    let icono = '📄';
    
    if (['xlsx', 'xls', 'csv'].includes(extension)) {
      formatoDetectado = 'Plantilla Estructurada (Excel/CSV)';
      icono = '📊';
    } else if (extension === 'xml') {
      formatoDetectado = 'Facturas Electrónicas (XML)';
      icono = '📋';
    } else if (extension === 'txt') {
      formatoDetectado = 'Archivo de Texto Plano';
      icono = '📝';
    }
    
    setVistaPrevia({
      nombre: file.name,
      tamaño: (file.size / 1024).toFixed(2) + ' KB',
      formato: formatoDetectado,
      icono: icono
    });
  };
  
  const handleSubmit = async () => {
    if (!archivo) {
      setMensaje({ tipo: 'error', texto: 'Debe seleccionar un archivo' });
      return;
    }
    
    try {
      // El sistema autodetecta el cliente y formato
      await subirArchivo(archivo, 'auto', 'auto');
      
      // Limpiar formulario después de subir
      setArchivo(null);
      setVistaPrevia(null);
      document.getElementById('file-input').value = '';
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  };
  
  const limpiarFormulario = () => {
    setArchivo(null);
    setVistaPrevia(null);
    document.getElementById('file-input').value = '';
  };
  
  return (
    <div className="space-y-6">
      {/* Header explicativo */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">¿Cómo funciona Armorum?</h3>
            <div className="mt-2 text-sm text-blue-700 space-y-1">
              <p>• <strong>Suba su archivo:</strong> Excel, CSV, XML o TXT con facturas</p>
              <p>• <strong>Procesamiento automático:</strong> IA identifica productos y valida terceros en DIAN</p>
              <p>• <strong>Descargue:</strong> Plantilla lista para Comiagro/BMC</p>
            </div>
          </div>
        </div>
      </div>

      {/* Área de carga compacta */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Cargar Archivo de Facturas</h3>
        
        <div 
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
            ${arrastrando 
              ? 'border-blue-500 bg-blue-50' 
              : archivo 
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input 
            type="file" 
            id="file-input"
            className="hidden" 
            onChange={handleFileInput}
            accept=".xlsx,.xls,.csv,.xml,.txt"
            disabled={cargando}
          />
          
          {vistaPrevia ? (
            <div className="space-y-3">
              <div className="text-4xl">{vistaPrevia.icono}</div>
              <div>
                <p className="font-medium text-gray-900">{vistaPrevia.nombre}</p>
                <p className="text-sm text-green-600">{vistaPrevia.formato}</p>
                <p className="text-xs text-gray-500">{vistaPrevia.tamaño}</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  limpiarFormulario();
                }}
                className="text-xs text-red-500 hover:text-red-700 underline"
                disabled={cargando}
              >
                Cambiar archivo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-4xl text-gray-400">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Arrastra tu archivo aquí
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  o haz clic para seleccionar
                </p>
                <p className="text-xs text-gray-400">
                  Excel (.xlsx, .xls), CSV, XML, o TXT
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Botón de procesamiento */}
        {archivo && (
          <div className="mt-4 text-center">
            <button 
              onClick={handleSubmit}
              disabled={cargando}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              {cargando ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>Procesar con IA</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Proceso explicado visualmente */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Proceso Automatizado</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900">1. Detección Automática</h4>
            <p className="text-sm text-gray-600 mt-1">El sistema identifica el formato y estructura de su archivo</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900">2. IA de Productos</h4>
            <p className="text-sm text-gray-600 mt-1">Inteligencia artificial asigna códigos BMC a cada producto</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900">3. Validación DIAN</h4>
            <p className="text-sm text-gray-600 mt-1">Verifica automáticamente terceros en bases de datos DIAN</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargaArchivo;