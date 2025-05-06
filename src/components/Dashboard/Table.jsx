import React from 'react';
import { useFacturas } from '../../contexts/FacturasContext';
import { Link } from 'react-router-dom';

const Table = () => {
  const { lotes } = useFacturas();
  
  // Tomar solo los 5 lotes más recientes para el dashboard
  const lotesRecientes = lotes.slice(0, 5);
  
  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Función para determinar el color de la etiqueta de estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Completado': return 'bg-green-500 text-white';
      case 'Error': return 'bg-red-500 text-white';
      case 'Procesando': return 'bg-blue-500 text-white';
      case 'Validando': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className='w-full border h-auto bg-white rounded-md shadow'>
      <div className='px-4 py-3 flex justify-between items-center'>
        <div>
          <h1 className='font-medium text-md'>Últimos Lotes Procesados</h1>
          <p className='text-xs text-gray-400'>Registro de Facturas BMC</p>
        </div>
        <Link 
          to="/procesamiento-facturas" 
          className="text-blue-500 text-sm hover:underline"
        >
          Ver todos
        </Link>
      </div>
      <div className='border-b my-1 border-gray-200'></div>
      <div className='mx-2 my-2 overflow-x-auto'>
        <table className='min-w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='text-left px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
              <th className='text-left px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Cliente</th>
              <th className='text-left px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Fecha</th>
              <th className='text-left px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Estado</th>
              <th className='text-left px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Registros</th>
            </tr>
          </thead>
          <tbody>
            {lotesRecientes.length > 0 ? (
              lotesRecientes.map((lote) => (
                <tr key={lote.id} className='hover:bg-gray-50'>
                  <td className='px-2 py-2 whitespace-nowrap'>{lote.id}</td>
                  <td className='px-2 py-2 whitespace-nowrap'>{lote.cliente}</td>
                  <td className='px-2 py-2 whitespace-nowrap'>{formatearFecha(lote.fechaCarga)}</td>
                  <td className='px-2 py-2 whitespace-nowrap'>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(lote.estado)}`}>
                      {lote.estado}
                    </span>
                  </td>
                  <td className='px-2 py-2 whitespace-nowrap text-center'>{lote.registrosTotales}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-2 py-4 text-center text-gray-500">
                  No hay lotes procesados aún
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;