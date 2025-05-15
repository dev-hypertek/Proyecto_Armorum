import React from 'react'

const NavPills = () => {
     return (
          <div className='border shadow-md w-[98%] mx-4 my-8'>
               <h1 className='px-4 py-1 mt-1 text-lg'>Nav Pills</h1>
               <p className='text-gray-400 px-4 text-xs'>Here is a subtitle for this table</p>
               <div className='border mt-4 border-gray-200'></div>
               <div className='mx-4 py-8 w-auto '>
               <div className='inline-flex border border-blue-500 rounded overflow-hidden'>
  <div className='text-white bg-blue-500 py-1 px-4'>Active</div>
  <div className='text-blue-500 border-l border-blue-500 py-1 px-4'>Link</div>
  <div className='text-blue-500 border-l border-blue-500 py-1 px-4'>Link</div>
  <div className='text-gray-400 border-l border-blue-500 py-1 px-4'>Disabled</div>
</div>

               </div>

          </div>
     )
}

export default NavPills