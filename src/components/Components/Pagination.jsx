import React from 'react'

const Pagination = () => {
     return (
          <div className='border shadow-md w-[98%] mx-4 my-8'>
               <h1 className='px-4 py-1 mt-1 text-lg'>Pagination</h1>
               <p className='text-gray-400 px-4 text-xs'>Here is a subtitle for this table</p>
               <div className='border mt-4 border-gray-200'></div>
               <div className='mx-4 py-8 w-auto '>
                    <div className='inline-flex gap-2'>
                         <div className='border h-8 text-center w-8 py-1 rounded-full'>«</div>
                         <div className='border h-8 text-center w-8 text-white bg-blue-500 py-1 rounded-full'>1</div>
                         <div className='border h-8 text-center w-8 py-1 rounded-full'>2</div>
                         <div className='border h-8 text-center w-8 py-1 rounded-full'>3</div>
                         <div className='border h-8 text-center w-8 py-1 rounded-full'>»</div>

                    </div>

               </div>

          </div>)
}

export default Pagination