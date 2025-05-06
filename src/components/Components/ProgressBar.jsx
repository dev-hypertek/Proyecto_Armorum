import React from 'react'

const ProgressBar = () => {
     return (
          <div className='border shadow-md w-[98%] mx-4 my-8'>
               <h1 className='px-4 py-1 mt-1 text-lg'>Progress Bar</h1>
               <p className='text-gray-400 px-4 text-xs'>Here is a subtitle for this table</p>
               <div className='border mt-4 border-gray-200'></div>
               <div className=' px-4 py-6 flex gap-2 items-center flex-wrap'>
                    <div className='flex gap-0'>
                         <div className='w-[100px] h-4 rounded-l bg-[#59d05d]'></div>
                         <div className='w-[500px] h-4 rounded-r bg-gray-300'></div>

                    </div>
                    <div className='flex gap-0'>
                         <div className='w-[300px] h-4 rounded-l bg-[#23CCEF]'></div>
                         <div className='w-[300px] h-4 rounded-r bg-gray-300'></div>

                    </div>
                    <div className='flex gap-0'>
                         <div className='w-[250px] h-4 rounded-l bg-[#fbad4c]'></div>
                         <div className='w-[350px] h-4 rounded-r bg-gray-300'></div>

                    </div>
                    <div className='flex'>
                         <div className='w-[400px] h-4 rounded-l bg-[#ff646d]'></div>
                         <div className='w-[200px] h-4 rounded-r bg-[#ff646d]'></div>

                    </div>
               </div>

          </div>
     )
}

export default ProgressBar