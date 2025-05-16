import { createContext, useContext, useState, useEffect } from 'react';

const ProductosContext = createContext();

export const useProductos = () => useContext(ProductosContext);

export const ProductosProvider = ({ children }) => {
  const [productosNoHomologados, setProductosNoHomologados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [sugerenciasIA, setSugerenciasIA] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Simular datos de productos sin homologar
  useEffect(() => {
    setProductosNoHomologados([
      {
        id: 1,
        loteId: 'L001',
        filaOriginal: 15,
        descripcionOriginal: 'Arroz Extra largo grano 1kg',
        cliente: 'Olímpica',
        estadoHomologacion: 'Pendiente',
        confianzaIA: null,
        fechaDeteccion: new Date().toISOString(),
        intentosMatch: 0
      },
      {
        id: 2,
        loteId: 'L001',
        filaOriginal: 28,
        descripcionOriginal: 'Aceite Vegetal Girasol 500ml',
        cliente: 'Comiagro',
        estadoHomologacion: 'Pendiente',
        confianzaIA: null,
        fechaDeteccion: new Date().toISOString(),
        intentosMatch: 0
      },
      {
        id: 3,
        loteId: 'L002',
        filaOriginal: 5,
        descripcionOriginal: 'Azucar refinada blanca 2kg',
        cliente: 'Cliente Regional',
        estadoHomologacion: 'Baja_Confianza',
        confianzaIA: 45,
        fechaDeteccion: new Date().toISOString(),
        intentosMatch: 1,
        sugerenciaIA: {
          codigo: 'BMC-AZ-001',
          nombre: 'Azúcar refinada especial 2kg',
          confianza: 45
        }
      }
    ]);
  }, []);

  // Función para obtener sugerencias de IA para un producto
  const obtenerSugerenciasIA = async (descripcion) => {
    try {
      setCargando(true);
      
      // Simular llamada al backend que ejecuta el script de IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Datos simulados de respuesta del script product_matcher_v2.py
      const sugerencias = [
        {
          codigo: 'BMC-AR-001',
          nombre: 'Arroz Extra Premium 1kg',
          descripcion: 'Arroz extra largo grano premium calidad exportación',
          confianza: 95,
          categoria: 'Granos y Cereales',
          marca: 'Premium Select'
        },
        {
          codigo: 'BMC-AR-002',
          nombre: 'Arroz Extra Largo 1kg',
          descripcion: 'Arroz extra largo grano seleccionado',
          confianza: 88,
          categoria: 'Granos y Cereales',
          marca: 'Tradición'
        },
        {
          codigo: 'BMC-AR-003',
          nombre: 'Arroz Grano Largo 1kg',
          descripcion: 'Arroz grano largo calidad superior',
          confianza: 75,
          categoria: 'Granos y Cereales',
          marca: 'Campo Verde'
        },
        {
          codigo: 'BMC-AR-004',
          nombre: 'Arroz Blanco Extra 1kg',
          descripcion: 'Arroz blanco extra procesado',
          confianza: 68,
          categoria: 'Granos y Cereales',
          marca: 'Doña Rosa'
        },
        {
          codigo: 'BMC-AR-005',
          nombre: 'Arroz Especial 1000g',
          descripcion: 'Arroz especial grano selecto',
          confianza: 60,
          categoria: 'Granos y Cereales',
          marca: 'La Despensa'
        }
      ];
      
      setSugerenciasIA(sugerencias);
      return sugerencias;
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al obtener sugerencias de IA: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };

  // Función para confirmar match de producto
  const confirmarMatch = async (productoId, codigoSeleccionado) => {
    try {
      setCargando(true);
      
      // Simular envío al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el producto con el match confirmado
      setProductosNoHomologados(productos => 
        productos.map(producto => 
          producto.id === productoId ? {
            ...producto,
            estadoHomologacion: 'Homologado',
            codigoAsignado: codigoSeleccionado,
            fechaHomologacion: new Date().toISOString()
          } : producto
        )
      );
      
      setMensaje({ 
        tipo: 'exito', 
        texto: 'Producto homologado exitosamente'
      });
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al confirmar match: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };

  // Función para marcar producto para creación manual
  const marcarParaCreacion = async (productoId, notas = '') => {
    try {
      setCargando(true);
      
      // Simular envío al backend
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Actualizar el producto para creación manual
      setProductosNoHomologados(productos => 
        productos.map(producto => 
          producto.id === productoId ? {
            ...producto,
            estadoHomologacion: 'Para_Creacion',
            notasCreacion: notas,
            fechaMarcado: new Date().toISOString()
          } : producto
        )
      );
      
      setMensaje({ 
        tipo: 'info', 
        texto: 'Producto marcado para creación manual'
      });
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al marcar producto: ' + error.message });
      throw error;
    } finally {
      setCargando(false);
    }
  };

  // Función para descargar productos para creación
  const descargarProductosParaCreacion = async () => {
    try {
      setCargando(true);
      
      const productosParaCreacion = productosNoHomologados.filter(
        producto => producto.estadoHomologacion === 'Para_Creacion'
      );
      
      if (productosParaCreacion.length === 0) {
        setMensaje({ 
          tipo: 'warning', 
          texto: 'No hay productos marcados para creación'
        });
        return;
      }
      
      // Simular generación de Excel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En producción, aquí se haría la llamada al backend para generar el Excel
      // const response = await fetch('/api/productos/generar-excel-creacion');
      
      setMensaje({ 
        tipo: 'exito', 
        texto: `Excel generado con ${productosParaCreacion.length} productos para creación`
      });
      
      // Simular descarga
      const blob = new Blob(['Datos simulados del Excel'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `productos_para_creacion_${new Date().toISOString().split('T')[0]}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error al generar Excel: ' + error.message });
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
    productosNoHomologados,
    productoSeleccionado,
    setProductoSeleccionado,
    sugerenciasIA,
    cargando,
    mensaje,
    obtenerSugerenciasIA,
    confirmarMatch,
    marcarParaCreacion,
    descargarProductosParaCreacion,
    setMensaje,
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
};