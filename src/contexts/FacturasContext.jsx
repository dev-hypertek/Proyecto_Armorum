import { createContext, useContext, useState, useEffect } from 'react';
import { 
  cargarArchivo, 
  obtenerLotes, 
  obtenerDetalleLote, 
  descargarPlantilla,
  getLotesMock,
  getDetalleLoteMock
} from '../services/api';

const FacturasContext = createContext();

export const useFacturas = () => useContext(FacturasContext);

export const FacturasProvider = ({ children }) => {
  const [lotes, setLotes] = useState([]);
  const [loteSeleccionado, setLoteSeleccionado] = useState(null);
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Cargar lista de lotes al iniciar
  useEffect(() => {
    const cargarLotes = async () => {
      try {
        setCargando(true);
        // Usar API real
        const response = await obtenerLotes();
        setLotes(response.data.lotes || []);
      } catch (error) {
        setMensaje({ tipo: 'error', texto: 'Error al cargar lotes: ' + error.message });
      } finally {
        setCargando(false);
      }
    };

    cargarLotes();
    // Configurar intervalo para actualizar lotes (cada 30 segundos)
    const intervalo = setInterval(cargarLotes, 30000);
    return () => clearInterval(intervalo);
  }, []);

  // Función para subir un archivo - ACTUALIZADA para manejar detección automática
  const subirArchivo = async (archivo, clienteId = 'auto', tipoArchivo = 'auto') => {
    try {
      setCargando(true);
      const formData = new FormData();
      formData.append('archivo', archivo);
      
      // Si es 'auto', dejar que el backend detecte automáticamente
      if (clienteId === 'auto') {
        // El backend determinará el cliente basado en el contenido
        formData.append('clienteId', '1'); // Default, pero el backend puede sobrescribirlo
      } else {
        formData.append('clienteId', clienteId);
      }
      
      if (tipoArchivo === 'auto') {
        // El backend detectará automáticamente el tipo por extensión y contenido
        formData.append('formatoArchivo', 'auto_detect');
      } else {
        const tipoBackend = mapearTipoArchivo(tipoArchivo);
        formData.append('formatoArchivo', tipoBackend);
      }
      
      // Usar API real
      const respuesta = await cargarArchivo(formData);
      
      // Recargar lista de lotes
      const response = await obtenerLotes();
      setLotes(response.data.lotes || []);
      
      // Mensaje específico según tipo de archivo
      const mensajesPorTipo = {
        'xml': 'Archivo XML procesado correctamente. Extrayendo facturas electrónicas...',
        'csv_excel': 'Archivo CSV/Excel procesado. Validando plantilla y datos...',
        'txt': 'Archivo de texto plano procesado. Analizando estructura...',
        'auto_detect': 'Archivo procesado automáticamente. Detectando formato y validando datos...'
      };
      
      setMensaje({ 
        tipo: 'exito', 
        texto: mensajesPorTipo[tipoArchivo] || mensajesPorTipo['auto_detect']
      });
      
      return respuesta;
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al subir archivo: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };

  // Función auxiliar para mapear tipos de frontend a backend
  const mapearTipoArchivo = (tipoFrontend) => {
    const mapeo = {
      'xml': 'xml',
      'csv_excel': 'plantilla51', // Se podría hacer más específico
      'txt': 'txt_plano'
    };
    return mapeo[tipoFrontend] || tipoFrontend;
  };

  // Función para ver detalles de un lote
  const verDetalleLote = async (loteId) => {
    try {
      setCargando(true);
      // Usar API real
      const response = await obtenerDetalleLote(loteId);
      const detalle = response.data;
      setLoteSeleccionado(detalle);
      
      // Si hay errores en el lote, actualizar el estado de errores
      if (detalle.errores && detalle.errores.length > 0) {
        setErrores(detalle.errores);
      } else {
        setErrores([]);
      }
      
      return detalle;
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al obtener detalles: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };

  // Función para descargar la plantilla Comiagro
  const descargarPlantillaComiagro = async (loteId) => {
    try {
      setCargando(true);
      // Usar API real
      const url = await descargarPlantilla(loteId);
      
      setMensaje({ tipo: 'exito', texto: 'La plantilla Comiagro se descargará en breve...' });
      
      // Iniciar descarga del archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = `plantilla_comiagro_lote_${loteId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al descargar plantilla: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };

  // Limpiar mensaje después de 5 segundos
  useEffect(() => {
    if (mensaje.texto) {
      const timer = setTimeout(() => {
        setMensaje({ tipo: '', texto: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  // Función para validar productos sin coincidencia - NUEVA
  const validarProductosSinCoincidencia = async (loteId, productosSinCoincidencia) => {
    try {
      setCargando(true);
      
      // En producción, enviar al backend para re-procesar con LLM
      // await actualizarProductosLote(loteId, productosSinCoincidencia);
      
      // Simular validación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMensaje({ 
        tipo: 'exito', 
        texto: 'Productos re-procesados con IA. Verificando nuevas coincidencias...'
      });
      
      // Recargar detalles del lote
      await verDetalleLote(loteId);
      
      return { success: true };
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al re-validar productos: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };

  // Función para continuar el procesamiento de un lote (usado para formatos personalizados que requieren mapeo manual)
  const continuarProcesamiento = async (loteId, datosMapeo = {}) => {
    try {
      setCargando(true);
      
      // En un entorno real, enviaríamos los datos de mapeo al backend
      // const respuesta = await continuarProcesamientoLote(loteId, datosMapeo);
      
      // Simulamos una respuesta exitosa
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Actualizar el estado del lote en la lista
      setLotes(lotes => lotes.map(lote => 
        lote.id === parseInt(loteId) ? {
          ...lote,
          estado: 'Procesando',
          procesadoManualmente: true
        } : lote
      ));
      
      setMensaje({ 
        tipo: 'exito', 
        texto: 'Mapeo manual aplicado. El lote continuará su procesamiento.'
      });
      
      // Simular un cambio de estado después de un tiempo
      setTimeout(() => {
        setLotes(lotes => lotes.map(lote => 
          lote.id === parseInt(loteId) ? {
            ...lote,
            estado: Math.random() > 0.3 ? 'Completado' : 'Error',
            errores: Math.random() > 0.5 ? 0 : Math.floor(Math.random() * 3) + 1
          } : lote
        ));
      }, 5000);
      
      return { estado: 'success' };
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al continuar procesamiento: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };
  
  // Función para obtener sugerencias de mapeo de campos para un formato personalizado
  const obtenerSugerenciasMapeoCampos = async (archivo, formatoDestino = 'comiagro') => {
    try {
      setCargando(true);
      
      // En un entorno real, enviaríamos el archivo al backend para análisis
      // const respuesta = await analizarColumnasArchivo(archivo, formatoDestino);
      
      // Simulamos una respuesta con sugerencias de mapeo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sugerencias de mapeo simuladas basadas en PLANTILLA51_SIMONA
      const camposDestino = formatoDestino === 'comiagro' ? [
        { id: 'nombreUsuario', nombre: 'NOMBRE USUARIO (CLIENTE DEL CLIENTE)' },
        { id: 'nitUsuario', nombre: 'NIT USUARIO (CLIENTE DEL CLIENTE)' },
        { id: 'ciudadEntrega', nombre: 'CIUDAD DE ENTREGA DEL PRODUCTO' },
        { id: 'factNro', nombre: 'FACT NRO' },
        { id: 'fecha', nombre: 'FECHA' },
        { id: 'formaPago', nombre: 'FORMA DE PAGO' },
        { id: 'producto', nombre: 'PRODUCTO' },
        { id: 'presentacion', nombre: 'PRESENTACION' },
        { id: 'cantidad', nombre: 'CANTIDAD' },
        { id: 'valorUnitario', nombre: 'VALOR UNITARIO' },
        { id: 'total', nombre: 'TOTAL' },
        { id: 'ivaProducto', nombre: '% IVA PRODUCTO' }
      ] : [
        // Otros formatos de destino se podrían añadir aquí
        { id: 'campo1', nombre: 'Campo 1' },
        { id: 'campo2', nombre: 'Campo 2' }
      ];
      
      // Columnas detectadas en el archivo (simulación)
      const columnasDetectadas = [
        'ID_PRODUCTO', 'DESCRIPCION', 'PRECIO', 'CANTIDAD', 
        'TOTAL', 'CLIENTE_NOMBRE', 'CLIENTE_DOCUMENTO', 'FECHA_FACTURA'
      ];
      
      // Sugerencias de mapeo (coincidencias parciales simuladas)
      const sugerencias = {
        'CLIENTE_NOMBRE': 'nombreUsuario',
        'CLIENTE_DOCUMENTO': 'nitUsuario',
        'FECHA_FACTURA': 'fecha',
        'DESCRIPCION': 'producto',
        'CANTIDAD': 'cantidad',
        'PRECIO': 'valorUnitario',
        'TOTAL': 'total'
      };
      
      return {
        camposDestino,
        columnasDetectadas,
        sugerencias
      };
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al obtener sugerencias de mapeo: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };

  const value = {
    lotes,
    loteSeleccionado,
    errores,
    cargando,
    mensaje,
    subirArchivo,
    verDetalleLote,
    descargarPlantillaComiagro,
    continuarProcesamiento,
    obtenerSugerenciasMapeoCampos,
    validarProductosSinCoincidencia,
    setMensaje,
  };

  return (
    <FacturasContext.Provider value={value}>
      {children}
    </FacturasContext.Provider>
  );
};