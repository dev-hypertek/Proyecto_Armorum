import { useState, useEffect } from 'react';
import { useFacturas } from '../../contexts/FacturasContext';

const CargaArchivo = () => {
  const { subirArchivo, cargando, setMensaje } = useFacturas();
  const [archivo, setArchivo] = useState(null);
  const [clienteId, setClienteId] = useState('');
  const [formatoArchivo, setFormatoArchivo] = useState('');
  const [arrastrando, setArrastrando] = useState(false);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  
  // Lista de clientes (esto vendría de una API en un caso real)
  const clientes = [
    { id: 1, nombre: 'Comiagro' },
    { id: 2, nombre: 'Cliente B' },
    { id: 3, nombre: 'Cliente C' },
  ];
  
  // Lista de formatos de archivo soportados
  const formatos = [
    { id: 'comiagro', nombre: 'Formato Comiagro' },
    { id: 'plantilla51', nombre: 'Plantilla 51 (SIMONA)' },
    { id: 'personalizado', nombre: 'Formato Personalizado' },
  ];
  
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
    // Validar extensión del archivo
    const extension = file.name.split('.').pop().toLowerCase();
    const extensionesValidas = ['xlsx', 'xls', 'csv', 'txt'];
    
    if (!extensionesValidas.includes(extension)) {
      setMensaje({ 
        tipo: 'error', 
        texto: 'Formato de archivo no válido. Use Excel, CSV o texto plano.' 
      });
      return;
    }
    
    // Leer una vista previa del archivo para mostrar al usuario
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Solo mostrar una vista previa simplificada
        if (extension === 'csv' || extension === 'txt') {
          // Mostrar las primeras 5 líneas para archivos CSV/TXT
          const content = e.target.result;
          const lines = content.split('\n').slice(0, 5).join('\n');
          setVistaPrevia(lines);
        } else {
          // Para archivos Excel simplemente indicamos que se ha cargado
          setVistaPrevia(`Archivo Excel cargado: ${file.name}`);
        }
      } catch (error) {
        console.error('Error al leer vista previa:', error);
        setVistaPrevia(null);
      }
    };
    
    if (extension === 'csv' || extension === 'txt') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file); // Para Excel
    }
    
    setArchivo(file);
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
    
    if (!formatoArchivo) {
      setMensaje({ tipo: 'error', texto: 'Debe seleccionar un formato de archivo' });
      return;
    }
    
    try {
      await subirArchivo(archivo, clienteId, formatoArchivo);
      // Limpiar formulario después de subir
      setArchivo(null);
      setClienteId('');
      setFormatoArchivo('');
      setVistaPrevia(null);
      // El mensaje de éxito lo maneja el context
    } catch (error) {
      console.error('Error al subir archivo:', error);
      // El mensaje de error lo maneja el context
    }
  };
  
  return (
    <div className="border shadow-md w-full p-6 bg-white rounded-md">
      <h2 className="text-xl font-semibold mb-4">Carga de Archivos</h2>
      <hr />
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Selectores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selector de cliente */}
          <div>
            <label className="text-sm block mb-1">Cliente</label>
            <select 
              className="border py-2 px-2 rounded w-full"
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
          
          {/* Selector de formato */}
          <div>
            <label className="text-sm block mb-1">Formato del Archivo</label>
            <select 
              className="border py-2 px-2 rounded w-full"
              value={formatoArchivo}
              onChange={(e) => setFormatoArchivo(e.target.value)}
              disabled={cargando}
            >
              <option value="">Seleccione un formato</option>
              {formatos.map(formato => (
                <option key={formato.id} value={formato.id}>
                  {formato.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Área de carga de archivos con drag & drop */}
        <div>
          <label className="text-sm block mb-1">Archivo de Facturación</label>
          <div 
            className={`border-2 border-dashed p-8 rounded flex flex-col items-center justify-center cursor-pointer ${
              arrastrando ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
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
              accept=".xlsx,.xls,.csv,.txt"
              disabled={cargando}
            />
            
            {archivo ? (
              <div className="text-center">
                <p className="text-green-600 font-medium">{archivo.name}</p>
                <p className="text-sm text-gray-500">
                  {(archivo.size / 1024).toFixed(2)} KB
                </p>
                <button 
                  type="button"
                  className="mt-2 text-xs text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setArchivo(null);
                  }}
                  disabled={cargando}
                >
                  Eliminar
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-500 mb-2">
                  Arrastre un archivo aquí o haga clic para seleccionar
                </p>
                <p className="text-xs text-gray-400">
                  Formatos aceptados: Excel (.xlsx, .xls), CSV (.csv), Texto plano (.txt)
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* Vista previa del archivo */}
        {vistaPrevia && (
          <div className="mt-4">
            <label className="text-sm font-medium block mb-1">Vista Previa del Archivo</label>
            <div className="bg-gray-50 p-3 border rounded-md max-h-40 overflow-y-auto">
              <pre className="text-xs whitespace-pre-wrap">{vistaPrevia}</pre>
            </div>
          </div>
        )}
        
        {/* Información del formato */}
        {formatoArchivo && (
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mt-4">
            <h4 className="text-sm font-medium text-blue-800 mb-1">
              Información sobre el formato seleccionado
            </h4>
            <p className="text-xs text-blue-600">
              {formatoArchivo === 'comiagro' && (
                'El formato Comiagro requiere campos específicos como: NOMBRE USUARIO, NIT USUARIO, CIUDAD DE ENTREGA, FACTURA NRO, etc.'
              )}
              {formatoArchivo === 'plantilla51' && (
                'La Plantilla 51 (SIMONA) requiere campos como: NOMBRE CLIENTE, NIT CLIENTE, DIRECCIÓN, FACTURA, NOMBRE PRODUCTO, etc.'
              )}
              {formatoArchivo === 'personalizado' && (
                'Para formatos personalizados se realizará un mapeo manual de los campos. El sistema intentará identificar columnas similares automáticamente.'
              )}
            </p>
          </div>
        )}
        
        {/* Botones de acción */}
        <div className="flex gap-4 mt-4">
          <button 
            type="submit" 
            className="bg-green-500 rounded px-4 py-2 text-white disabled:bg-gray-400"
            disabled={!archivo || !clienteId || !formatoArchivo || cargando}
          >
            {cargando ? 'Procesando...' : 'Procesar Archivo'}
          </button>
          
          <button 
            type="button" 
            className="bg-gray-300 rounded px-4 py-2 text-gray-700"
            onClick={() => {
              setArchivo(null);
              setClienteId('');
              setFormatoArchivo('');
              setVistaPrevia(null);
            }}
            disabled={cargando}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CargaArchivo;