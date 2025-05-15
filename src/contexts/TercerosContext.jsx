import { createContext, useContext, useState, useEffect } from 'react';
import { 
  obtenerExcepciones, 
  actualizarEstadoTercero,
  getExcepcionesMock
} from '../services/api';

const TercerosContext = createContext();

export const useTerceros = () => useContext(TercerosContext);

export const TercerosProvider = ({ children }) => {
  const [excepciones, setExcepciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Cargar excepciones al iniciar
  useEffect(() => {
    const cargarExcepciones = async () => {
      try {
        setCargando(true);
        // Usar API real
        const response = await obtenerExcepciones();
        setExcepciones(response.data.excepciones || []);
      } catch (error) {
        setMensaje({ tipo: 'error', texto: 'Error al cargar excepciones: ' + error.message });
      } finally {
        setCargando(false);
      }
    };

    cargarExcepciones();
    // Configurar intervalo para actualizar excepciones (cada minuto)
    const intervalo = setInterval(cargarExcepciones, 60000);
    return () => clearInterval(intervalo);
  }, []);

  // Función para actualizar el estado de un tercero
  const actualizarTercero = async (excepcionId, accion, datos = {}) => {
    try {
      setCargando(true);
      // Usar API real
      const respuesta = await actualizarEstadoTercero(excepcionId, accion, datos);
      
      // Recargar excepciones
      const response = await obtenerExcepciones();
      setExcepciones(response.data.excepciones || []);
      
      setMensaje({ 
        tipo: 'exito', 
        texto: `Tercero actualizado correctamente: ${accion}` 
      });
      
      return { estado: 'success' };
    } catch (error) {
      setMensaje({ 
        tipo: 'error', 
        texto: 'Error al actualizar tercero: ' + error.message 
      });
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

  const value = {
    excepciones,
    cargando,
    mensaje,
    actualizarTercero,
    setMensaje,
  };

  return (
    <TercerosContext.Provider value={value}>
      {children}
    </TercerosContext.Provider>
  );
};