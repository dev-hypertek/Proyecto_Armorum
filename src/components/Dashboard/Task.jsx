import React from 'react';

const Task = () => {
  const percentage = 80;

  return (
    <div className='w-[22%] mx-6 border shadow-md text-black h-auto'>
      <div className='px-6 py-4 border-b'>
        <h1 className='font-medium text-lg'>Progreso</h1>
        <p className='text-gray-400'>Facturas Procesadas</p>
      </div>

      <div className='flex justify-center items-center mt-6'>
        <div
          className='rounded-full h-32 w-32 flex items-center justify-center text-xl font-bold text-blue-600'
          style={{
            background: `conic-gradient(#2563eb ${percentage * 3.6}deg, #e5e7eb 0deg)`,
          }}
        >
          {/* Make inner circle just 8px smaller to create a 4px border effect */}
          <div className='bg-white rounded-full h-28 w-28 flex items-center justify-center shadow-inner'>
            {percentage}%
          </div>
        </div>
      </div>
      <div className='flex gap-3 justify-start items-center border-t w-full mt-6 py-4 px-6'>
          <div className='border rounded-full h-3 w-3 border-blue-500'></div>
          <div>Completado</div>
      </div>
    </div>
  );
};

export default Task;
