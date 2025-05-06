import React from 'react';
import { FiEdit } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";

const Tasks = () => {
  const data = [
    'Revisar facturas pendientes de Comiagro',
    'Validar registros en BMC',
    'Solicitar creación de códigos para productos nuevos',
    'Verificar excepciones DIAN pendientes'
  ];

  return (
    <div className='border bg-white shadow-md h-auto w-[55%]'>
      <div className='px-4 pb-2'>
        <h1 className='font-medium text-md pt-2'>Tareas Pendientes</h1>
        <p className='text-xs text-gray-400'>Lista de Actividades</p>
      </div>

      <div className='border-b my-1 border-gray-200'></div>

      <div className='my-4'>
        <table className='table-auto w-full'>
          <thead className='bg-gray-100'>
            <tr>
              <th className="px-4 py-6 text-left w-[50px]">
                <input type='checkbox' className='size-4' aria-label='Seleccionar todas las tareas' />
              </th>
              <th className="px-4 py-3 text-left">Tarea</th>
              <th className="px-4 py-3 text-left w-[100px]">Acción</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className='px-4 py-2'>
                    <input type='checkbox'  className='size-4'/>
                  </td>
                  <td className='px-4 py-2 text-left'>
                    {item}
                  </td>
                  <td className='px-4 py-6 text-left'>
                    <div className='flex gap-10 text-gray-600 cursor-pointer'>
                      <FiEdit  className='text-[#007bff]'/>
                      <LiaTimesSolid  className='text-[#ff646d]'/>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className='py-4 px-5 text-gray-500 text-xs'>Actualizado hace 3 minutos</div>
      </div>
    </div>
  );
};

export default Tasks;
