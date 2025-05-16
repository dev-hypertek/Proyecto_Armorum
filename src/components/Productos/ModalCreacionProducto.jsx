import React, { useState } from 'react';
import { useProductos } from '../../contexts/ProductosContext';

const ModalCreacionProducto = ({ producto, onClose }) => {
  const { marcarParaCreacion, cargando } = useProductos();
  const [notas, setNotas] = useState('');
  const [razonCreacion, setRazonCreacion] = useState('no_encontrado');
  const [categoriaEstimada, setCategoriaEstimada] = useState('');
  const [especificaciones, setEspecificaciones] = useState('');
  
  const razones = [
    { value: 'no_encontrado', label: 'Producto no encontrado en catálogo BMC' },
    { value: 'baja_confianza', label: 'Confianza IA muy baja (< 60%)' },
    { value: 'nuevo_producto', label: 'Producto nuevo en el mercado' },
    { value: 'especificaciones_diferentes', label: 'Especificaciones diferentes a catálogo' },
    { value: 'marca_especial', label: 'Marca o presentación especial' },
    { value: 'otro', label: 'Otro motivo' }
  ];
  
  const categorias = [
    'Granos y Cereales',
    'Aceites y Grasas',
    'Azúcar y Edulcorantes',
    'Lácteos y Derivados',
    'Carnes y Embutidos',
    'Frutas y Verduras',
    'Bebidas',
    'Productos de Panadería',
    'Condimentos y Especias',
    'Productos Procesados',
    'Productos de Limpieza',
    'Cuidado Personal',
    'Otro'
  ];
  
  const handleConfirmar = async () => {
    const notasCompletas = `
**Razón de creación:** ${razones.find(r => r.value === razonCreacion)?.label}
**Categoría estimada:** ${categoriaEstimada}
**Especificaciones:** ${especificaciones}
**Notas adicionales:** ${notas}
    `.trim();
    
    try {
      await marcarParaCreacion(producto.id, notasCompletas);
      onClose();
    } catch (error) {
      console.error('Error al marcar para creación:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-900">
                Marcar Producto para Creación
              </h3>
              <p className="text-sm text-purple-700 mt-1">
                Este producto será agregado a la lista de creación manual en BMC
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-purple-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Información del producto */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">Información del Producto</h4>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Lote:</span>
                <span className="ml-2 font-medium">#{producto.loteId}</span>
              </div>
              <div>
                <span className="text-gray-600">Fila:</span>
                <span className="ml-2 font-medium">{producto.filaOriginal}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">Descripción:</span>
                <p className="mt-1 font-medium text-gray-900">"{producto.descripcionOriginal}"</p>
              </div>
              <div>
                <span className="text-gray-600">Cliente:</span>
                <span className="ml-2 font-medium">{producto.cliente}</span>
              </div>
              <div>
                <span className="text-gray-600">Intentos de Match:</span>
                <span className="ml-2 font-medium">{producto.intentosMatch || 0}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Formulario */}
        <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
          {/* Razón de creación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Razón para creación manual *
            </label>
            <select
              value={razonCreacion}
              onChange={(e) => setRazonCreacion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {razones.map(razon => (
                <option key={razon.value} value={razon.value}>
                  {razon.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Categoría estimada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría estimada *
            </label>
            <select
              value={categoriaEstimada}
              onChange={(e) => setCategoriaEstimada(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
          
          {/* Especificaciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Especificaciones del producto
            </label>
            <textarea
              value={especificaciones}
              onChange={(e) => setEspecificaciones(e.target.value)}
              placeholder="Ej: Peso/volumen, marca, tipo de empaque, características especiales..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-24 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Proporcione detalles que ayuden en la creación del código BMC
            </p>
          </div>
          
          {/* Notas adicionales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas adicionales
            </label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Cualquier información adicional que considere relevante..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-20 resize-none"
            />
          </div>
          
          {/* Información importante */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-800">
                <h5 className="font-medium mb-1">¿Qué sucede después?</h5>
                <ul className="text-xs space-y-1">
                  <li>• Este producto se marcará como "Para Creación" en el sistema</li>
                  <li>• Se incluirá en el reporte Excel para el equipo de BMC</li>
                  <li>• Una vez creado el código, se podrá homologar automáticamente</li>
                  <li>• El producto quedará disponible para futuros lotes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Nota:</span> Los campos marcados con * son obligatorios
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              
              <button
                onClick={handleConfirmar}
                disabled={!categoriaEstimada || cargando}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors inline-flex items-center"
              >
                {cargando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Marcando...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Marcar para Creación
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreacionProducto;