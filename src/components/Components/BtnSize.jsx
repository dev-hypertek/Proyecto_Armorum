import React from 'react';

const BtnSize = () => {
  return (
    <div className='border shadow-md w-[98%] mx-4 my-8'>
      <h1 className='px-4 py-1 mt-1 text-lg'>Button Size</h1>
      <p className='text-gray-400 px-4 text-xs'>Here is a subtitle for this table</p>
      <div className='border mt-4 border-gray-200'></div>
      <div className='text-white px-4 py-6 flex gap-2 items-center flex-wrap'>

        <button className='bg-blue-500 text-xl px-8 py-4 rounded  hover:bg-blue-600 transition'>
          Large
        </button>

        <button className='bg-blue-500 text-base px-6 py-3  rounded hover:bg-blue-600 transition'>
          Normal
        </button>

        <button className='bg-blue-500 text-sm px-4 py-2 rounded hover:bg-blue-600 transition'>
          Small
        </button>

        <button className='bg-blue-500 text-xs px-2 py-1 rounded  hover:bg-blue-600 transition'>
          Extra Small
        </button>

      </div>
    </div>
  );
};

export default BtnSize;
