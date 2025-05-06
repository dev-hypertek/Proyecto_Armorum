import React from 'react'

const BtnType = () => {
     return (
          <div className='border shadow-md w-[98%] mx-4 my-8'>
               <h1 className='px-4 py-1 mt-1 text-lg'>Button Type</h1>
               <p className='text-gray-400 px-4 text-xs'>Here is a subtitle for this table</p>
               <div className='border mt-4 border-gray-200'></div>
               <div className='text-white px-4 py-6 flex gap-2 items-center flex-wrap'>

                    <button className='bg-blue-500 text-sm px-4 py-2 rounded  hover:bg-blue-600 transition'>
                         Normal
                    </button>

                    <button className=' border border-blue-500 text-blue-500 text-sm px-4 py-2  rounded hover:bg-blue-600 transition'>
                         Border
                    </button>

                    <button className='bg-blue-500 text-sm px-4 py-2 rounded-full hover:bg-blue-600 transition'>
                         Rounded
                    </button>

                    <button className=' border border-blue-500 text-blue-500 text-sm px-4 py-2  rounded-full hover:bg-blue-600'>
                         Rounded
                    </button>
                    <button className=' text-blue-500 mx-2  hover:underline link'>
                         Link
                    </button>

               </div>
          </div>
     );
}

export default BtnType