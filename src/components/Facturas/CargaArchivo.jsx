import { useState, useEffect } from 'react';
import { useFacturas } from '../../contexts/FacturasContext';

const CargaArchivo = () => {
  const { subirArchivo, cargando, setMensaje } = useFacturas();
  const [archivo, setArchivo] = useState(null);
  const [clienteId, setClienteId] = useState('');
  const [tipoArchivo, setTipoArchivo] = useState('');
  const [arrastrando, setArrastrando] = useState(false);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  
  // Lista de clientes (esto vendría de una API en un caso real)
  const clientes = [
    { id: '1', nombre: 'Comiagro' },
    { id: '2', nombre: 'Olímpica' },
    { id: '3', nombre: 'Cliente Regional' },
  ];
  
  // Configuración de tipos de archivo según las instrucciones
  const tiposArchivo = [
    { 
      id: 'xml', 
      nombre: 'Facturas XML',
      descripcion: 'Facturas electrónicas en formato XML',
      extensiones: ['.xml'],
      ejemplo: 'factura_001.xml, batch_facturas.xml'
    },
    { 
      id: 'csv_excel', 
      nombre: 'Plantillas CSV/Excel',
      descripcion: 'Archivos CSV o Excel (como Olímpica)',
      extensiones: ['.csv', '.xlsx', '.xls'],
      ejemplo: 'plantilla_olimpica.xlsx, datos_facturas.csv'
    },
    { 
      id: 'txt', 
      nombre: 'Archivos de Texto Plano',
      descripcion: 'Archivos TXT con estructura consistente',
      extensiones: ['.txt'],
      ejemplo: 'facturas_planas.txt, datos_estructurados.txt'
    }
  ];
  
  // Función para validar extensión según tipo seleccionado
  const validarExtension = (nombreArchivo, tipoSeleccionado) => {
    const extension = '.' + nombreArchivo.split('.').pop().toLowerCase();
    const tipoConfig = tiposArchivo.find(t => t.id === tipoSeleccionado);
    
    if (!tipoConfig) return false;
    return tipoConfig.extensiones.includes(extension);
  };
  
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
      validarArchivo(file);
    }
  };
  
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validarArchivo(file);
    }
  };
  
  const validarArchivo = (file) => {
    // Si no hay tipo seleccionado, permitir la carga pero avisar
    if (!tipoArchivo) {
      setMensaje({ 
        tipo: 'warning', 
        texto: 'Seleccione el tipo de archivo antes de cargar para una mejor validación.' 
      });
    }
    
    // Si hay tipo seleccionado, validar extensión
    if (tipoArchivo && !validarExtension(file.name, tipoArchivo)) {
      const tipoConfig = tiposArchivo.find(t => t.id === tipoArchivo);
      setMensaje({ 
        tipo: 'error', 
        texto: `Archivo no válido para el tipo "${tipoConfig.nombre}". Extensiones aceptadas: ${tipoConfig.extensiones.join(', ')}` 
      });
      return;
    }
    
    // Detectar automáticamente el tipo si no está seleccionado
    if (!tipoArchivo) {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      const tipoDetectado = tiposArchivo.find(t => t.extensiones.includes(extension));
      if (tipoDetectado) {
        setTipoArchivo(tipoDetectado.id);
        setMensaje({ 
          tipo: 'info', 
          texto: `Tipo de archivo detectado automáticamente: ${tipoDetectado.nombre}` 
        });
      }
    }
    
    // Generar vista previa según tipo de archivo
    generarVistaPrevia(file);
    setArchivo(file);
  };
  
  const generarVistaPrevia = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        if (extension === 'xml') {
          // Vista previa para XML
          const content = e.target.result;
          const lines = content.split('\n').slice(0, 10).join('\n');
          setVistaPrevia({
            tipo: 'XML',
            contenido: lines,
            info: 'Mostrando primeras 10 líneas del XML'
          });
        } else if (extension === 'csv' || extension === 'txt') {
          // Vista previa para CSV/TXT
          const content = e.target.result;
          const lines = content.split('\n').slice(0, 5);
          setVistaPrevia({
            tipo: extension.toUpperCase(),
            contenido: lines.join('\n'),
            info: `Mostrando primeras 5 líneas del archivo ${extension.toUpperCase()}`,
            estructura: lines.length > 0 ? `Columnas detectadas: ${lines[0].split(',').length}` : ''
          });
        } else if (['xlsx', 'xls'].includes(extension)) {
          // Vista previa para Excel (simplificada)
          setVistaPrevia({
            tipo: 'EXCEL',
            contenido: `Archivo Excel: ${file.name}`,
            info: `Tamaño: ${(file.size / 1024).toFixed(2)} KB`,
            estructura: 'La estructura exacta se verificará durante el procesamiento'
          });
        }
      } catch (error) {
        console.error('Error al generar vista previa:', error);
        setVistaPrevia({
          tipo: 'ERROR',
          contenido: 'No se pudo generar vista previa',
          info: 'El archivo se procesará normalmente'
        });
      }
    };
    
    // Leer como texto para la mayoría de archivos
    if (['xml', 'csv', 'txt'].includes(extension)) {
      reader.readAsText(file);
    } else {
      // Para Excel u otros binarios
      reader.readAsArrayBuffer(file);
    }
  };
  
  // Limpiar vista previa cuando cambia el archivo
  useEffect(() => {
    if (!archivo) {
      setVistaPrevia(null);
    }
  }, [archivo]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!archivo) {
      setMensaje({ tipo: 'error', texto: 'Debe seleccionar un archivo' });
      return;
    }
    
    if (!clienteId) {
      setMensaje({ tipo: 'error', texto: 'Debe seleccionar un cliente' });
      return;
    }
    
    if (!tipoArchivo) {
      setMensaje({ tipo: 'error', texto: 'Debe seleccionar el tipo de archivo' });
      return;
    }
    
    try {
      // Enviar con el tipo de archivo específico para el backend
      await subirArchivo(archivo, clienteId, tipoArchivo);
      
      // Limpiar formulario después de subir
      setArchivo(null);
      setClienteId('');
      setTipoArchivo('');
      setVistaPrevia(null);
      
      // Limpiar input file
      document.getElementById('file-input').value = '';
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  };
  
  const getTipoArchivoBadge = () => {
    if (!tipoArchivo) return null;
    const tipo = tiposArchivo.find(t => t.id === tipoArchivo);
    const colors = {
      'xml': 'bg-blue-100 text-blue-800',
      'csv_excel': 'bg-green-100 text-green-800', 
      'txt': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${colors[tipoArchivo] || 'bg-gray-100 text-gray-800'}`}>
        {tipo.nombre}
      </span>
    );
  };
  
  return (
    <div className="border shadow-md w-full p-6 bg-white rounded-md">
      <h2 className="text-xl font-semibold mb-4">Carga de Archivos de Facturación</h2>
      <hr />
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Selectores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selector de cliente */}
          <div>
            <label className="text-sm font-medium block mb-1">Cliente *</label>
            <select 
              className="border py-2 px-3 rounded w-full focus:border-blue-500 focus:outline-none"
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              disabled={cargando}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>
          
          {/* Selector de tipo de archivo */}
          <div>
            <label className="text-sm font-medium block mb-1">Tipo de Archivo *</label>
            <select 
              className="border py-2 px-3 rounded w-full focus:border-blue-500 focus:outline-none"
              value={tipoArchivo}
              onChange={(e) => setTipoArchivo(e.target.value)}
              disabled={cargando}
            >
              <option value="">Seleccione tipo de archivo</option>
              {tiposArchivo.map(tipo => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Información del tipo de archivo seleccionado */}
        {tipoArchivo && (
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-blue-800">Tipo de Archivo Seleccionado</h4>
              {getTipoArchivoBadge()}
            </div>
            <p className="text-sm text-blue-600 mb-2">
              {tiposArchivo.find(t => t.id === tipoArchivo)?.descripcion}
            </p>
            <p className="text-xs text-blue-500">
              <strong>Extensiones aceptadas:</strong> {tiposArchivo.find(t => t.id === tipoArchivo)?.extensiones.join(', ')}
              <br />
              <strong>Ejemplo:</strong> {tiposArchivo.find(t => t.id === tipoArchivo)?.ejemplo}
            </p>
          </div>
        )}
        
        {/* Área de carga de archivos con drag & drop */}
        <div>
          <label className="text-sm font-medium block mb-1">Archivo de Facturación *</label>
          <div 
            className={`border-2 border-dashed p-8 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
              arrastrando 
                ? 'border-blue-500 bg-blue-50' 
                : archivo 
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
            }`}
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
              accept={tipoArchivo ? tiposArchivo.find(t => t.id === tipoArchivo)?.extensiones.join(',') : '.xml,.csv,.xlsx,.xls,.txt'}
              disabled={cargando}
            />
            
            {archivo ? (
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getTipoArchivoBadge()}
                </div>
                <p className="text-green-600 font-medium">{archivo.name}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {(archivo.size / 1024).toFixed(2)} KB
                </p>
                <button 
                  type="button"
                  className="text-xs text-red-500 hover:text-red-700 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setArchivo(null);
                    document.getElementById('file-input').value = '';
                  }}
                  disabled={cargando}
                >
                  Eliminar archivo
                </button>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-gray-500 font-medium mb-1">
                    Arrastre un archivo aquí o haga clic para seleccionar
                  </p>
                  <p className="text-xs text-gray-400">
                    {tipoArchivo 
                      ? `Formatos aceptados para ${tiposArchivo.find(t => t.id === tipoArchivo)?.nombre}: ${tiposArchivo.find(t => t.id === tipoArchivo)?.extensiones.join(', ')}`
                      : 'Seleccione primero el tipo de archivo para ver los formatos aceptados'
                    }
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Vista previa del archivo */}
        {vistaPrevia && (
          <div className="mt-4">
            <label className="text-sm font-medium block mb-2">Vista Previa del Archivo</label>
            <div className="bg-gray-50 border rounded-md">
              <div className="flex items-center justify-between p-3 border-b bg-gray-100">
                <span className="text-sm font-medium text-gray-700">
                  Tipo: {vistaPrevia.tipo}
                </span>
                <span className="text-xs text-gray-500">
                  {vistaPrevia.info}
                </span>
              </div>
              <div className="p-3">
                <pre className="text-xs whitespace-pre-wrap text-gray-700 max-h-40 overflow-y-auto">
                  {vistaPrevia.contenido}
                </pre>
                {vistaPrevia.estructura && (
                  <p className="text-xs text-blue-600 mt-2 font-medium">
                    {vistaPrevia.estructura}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Botones de acción */}
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 rounded-md px-6 py-2 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            disabled={!archivo || !clienteId || !tipoArchivo || cargando}
          >
            {cargando ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            ) : 'Procesar Archivo'}
          </button>
          
          <button 
            type="button" 
            className="bg-gray-300 hover:bg-gray-400 rounded-md px-6 py-2 text-gray-700 font-medium transition-colors"
            onClick={() => {
              setArchivo(null);
              setClienteId('');
              setTipoArchivo('');
              setVistaPrevia(null);
              document.getElementById('file-input').value = '';
            }}
            disabled={cargando}
          >
            Limpiar Formulario
          </button>
        </div>
        
        {/* Instrucciones adicionales */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium text-gray-800 mb-2">Instrucciones importantes:</h4>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li><strong>XML:</strong> Facturas electrónicas. Pueden contener múltiples facturas en un solo archivo.</li>
            <li><strong>CSV/Excel:</strong> Plantillas estructuradas (ej: plantillas de Olímpica). El sistema mapeará automáticamente las columnas.</li>
            <li><strong>TXT:</strong> Archivos de texto plano con estructura consistente. Se analizará la estructura automáticamente.</li>
            <li>El sistema validará automáticamente los productos usando IA y verificará los terceros en la DIAN.</li>
            <li>Solo se podrá descargar la plantilla Comiagro si no hay errores críticos.</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default CargaArchivo;