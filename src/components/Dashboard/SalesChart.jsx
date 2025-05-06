import React from 'react';
import BarChart from './BarChart';

const SalesChart = () => {
  return (
    <div className='w-[70%] h-[50vh] border rounded shadow-md'>
      {/* Header */}
      <div className='border-b px-4 pt-3'>
        <h1 className='font-medium text-md'>2018 Sales</h1>
        <p className='text-xs text-gray-400 pb-3'>Number of products sold</p>
      </div>

      {/* Chart Section - Remaining space */}
      <div className='h-[calc(50vh-80px)] p-4'>
        <BarChart />
      </div>
    </div>
  );
};

export default SalesChart;
