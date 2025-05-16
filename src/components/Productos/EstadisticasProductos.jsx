import React from 'react';
import { useProductos } from '../../contexts/ProductosContext';

const EstadisticasProductos = () => {
  const { productosNoHomologados } = useProductos();
  
  // Calcular estadísticas
  const totalProductos = productosNoHomologados.length;
  const productosHomologados = productosNoHomologados.filter(p => p.estadoHomologacion === 'Homologado').length;
  const productosPendientes = productosNoHomologados.filter(p => p.estadoHomologacion === 'Pendiente').length;
  const productosParaCreacion = productosNoHomologados.filter(p => p.estadoHomologacion === 'Para_Creacion').length;
  const productosBajaConfianza = productosNoHomologados.filter(p => p.estadoHomologacion === 'Baja_Confianza').length;
  
  // Calcular porcentajes
  const porcentajeHomologados = totalProductos > 0 ? Math.round((productosHomologados / totalProductos) * 100) : 0;
  const porcentajePendientes = totalProductos > 0 ? Math.round((productosPendientes / totalProductos) * 100) : 0;
  
  // Calcular progreso total
  const productosCompletados = productosHomologados + productosParaCreacion;
  const porcentajeProgreso = totalProductos > 0 ? Math.round((productosCompletados / totalProductos) * 100) : 0;
  
  const estadisticas = [
    {
      titulo: 'Total de Productos',
      valor: totalProductos,
      descripcion: 'Productos sin homologar detectados',
      icono: (
        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
        </svg>
      ),
      colorFondo: 'bg-gray-50',
      colorTexto: 'text-gray-600'
    },
    {
      titulo: 'Homologados',
      valor: productosHomologados,
      descripcion: `${porcentajeHomologados}% del total`,
      icono: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorFondo: 'bg-green-50',
      colorTexto: 'text-green-600'
    },
    {
      titulo: 'Pendientes',
      valor: productosPendientes + productosBajaConfianza,
      descripcion: `${porcentajePendientes + Math.round((productosBajaConfianza / totalProductos) * 100)}% requiere acción`,
      icono: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorFondo: 'bg-yellow-50',
      colorTexto: 'text-yellow-600'
    },
    {
      titulo: 'Para Creación',
      valor: productosParaCreacion,
      descripcion: 'Productos marcados para crear',
      icono: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      colorFondo: 'bg-purple-50',
      colorTexto: 'text-purple-600'
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Progreso General */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Progreso de Homologación</h3>
          <div className="text-sm text-gray-500">
            {productosCompletados} de {totalProductos} productos procesados
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progreso total</span>
            <span className="font-medium text-gray-900">{porcentajeProgreso}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${porcentajeProgreso}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Homologados: {productosHomologados}</span>
            <span>Para creación: {productosParaCreacion}</span>
            <span>Pendientes: {productosPendientes + productosBajaConfianza}</span>
          </div>
        </div>
      </div>
      
      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {estadisticas.map((estadistica, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${estadistica.colorFondo}`}>
                {estadistica.icono}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{estadistica.titulo}</p>
                <p className={`text-2xl font-bold ${estadistica.colorTexto}`}>
                  {estadistica.valor}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {estadistica.descripcion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Desglose por Cliente */}
      {totalProductos > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Desglose por Cliente</h3>
          
          <div className="space-y-3">
            {/* Agrupar por cliente */}
            {Object.entries(
              productosNoHomologados.reduce((acc, producto) => {
                const cliente = producto.cliente;
                if (!acc[cliente]) {
                  acc[cliente] = {
                    total: 0,
                    homologados: 0,
                    pendientes: 0,
                    paraCreacion: 0
                  };
                }
                acc[cliente].total++;
                if (producto.estadoHomologacion === 'Homologado') acc[cliente].homologados++;
                else if (producto.estadoHomologacion === 'Para_Creacion') acc[cliente].paraCreacion++;
                else acc[cliente].pendientes++;
                return acc;
              }, {})
            ).map(([cliente, stats]) => {
              const porcentaje = Math.round(((stats.homologados + stats.paraCreacion) / stats.total) * 100);
              
              return (
                <div key={cliente} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{cliente}</h4>
                    <div className="text-sm text-gray-500">
                      {stats.total} productos
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Completado</span>
                      <span className="font-medium">{porcentaje}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>✓ {stats.homologados} homolog.</span>
                    <span>+ {stats.paraCreacion} para crear</span>
                    <span>⏳ {stats.pendientes} pend.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EstadisticasProductos;