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
        // En un entorno real, usaríamos esto:
        // const data = await obtenerLotes();
        // Por ahora, usamos datos mock:
        const data = getLotesMock();
        setLotes(data);
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

  // Función para subir un archivo
  const subirArchivo = async (archivo, clienteId, formatoArchivo) => {
    try {
      setCargando(true);
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('clienteId', clienteId);
      formData.append('formatoArchivo', formatoArchivo);
      
      // En un entorno real, usaríamos esto:
      // const respuesta = await cargarArchivo(formData);
      
      // Simulamos una respuesta exitosa
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulamos diferentes comportamientos según el formato
      let registrosTotales = Math.floor(Math.random() * 100) + 20;
      let errores = 0;
      let estadoInicial = 'Procesando';
      
      // Para demostración, simulamos diferentes comportamientos según el formato
      if (formatoArchivo === 'comiagro') {
        // Simulamos que este formato es bien reconocido
        registrosTotales = Math.floor(Math.random() * 50) + 30;
        errores = Math.floor(Math.random() * 3); // Pocos errores
      } else if (formatoArchivo === 'plantilla51') {
        // Simulamos que este formato puede tener más errores
        registrosTotales = Math.floor(Math.random() * 80) + 100;
        errores = Math.floor(Math.random() * 10) + 5; // Más errores
        if (errores > 8) estadoInicial = 'Error';
      } else if (formatoArchivo === 'personalizado') {
        // Simulamos que el formato personalizado requiere más validación
        registrosTotales = Math.floor(Math.random() * 40) + 10;
        errores = Math.floor(Math.random() * 5) + 1;
      }
      
      const respuesta = {
        id: lotes.length + 1,
        nombreArchivo: archivo.name,
        fechaCarga: new Date().toISOString(),
        cliente: clienteId === '1' ? 'Comiagro' : clienteId === '2' ? 'Cliente B' : 'Cliente C',
        formato: formatoArchivo,
        estado: estadoInicial,
        registrosTotales: registrosTotales,
        errores: errores
      };
      
      // Actualizar lista de lotes con el nuevo lote
      setLotes(lotes => [respuesta, ...lotes]);
      setMensaje({ tipo: 'exito', texto: 'Archivo subido correctamente' });
      return respuesta;
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al subir archivo: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };

  // Función para ver detalles de un lote
  const verDetalleLote = async (loteId) => {
    try {
      setCargando(true);
      // En un entorno real, usaríamos esto:
      // const detalle = await obtenerDetalleLote(loteId);
      
      // Por ahora, usamos datos mock:
      const detalle = getDetalleLoteMock(loteId);
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
      // En un entorno real, usaríamos esto:
      // const url = await descargarPlantilla(loteId);
      
      // Simulamos la descarga
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMensaje({ tipo: 'exito', texto: 'La plantilla se descargará en breve...' });
      
      // En un entorno real, esto iniciaría la descarga del archivo
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `plantilla_comiagro_lote_${loteId}.xlsx`;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
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
      
      // Sugerencias de mapeo simuladas
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
    setMensaje,
  };

  return (
    <FacturasContext.Provider value={value}>
      {children}
    </FacturasContext.Provider>
  );
};