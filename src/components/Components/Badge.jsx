import React from 'react'

const Badge = () => {
     return (
          <div className='border shadow-md w-[98%] mx-4 my-8'>
               <h1 className='px-4 py-1 mt-1 text-lg'>Badge</h1>
               <p className='text-gray-400 px-4 text-xs'>Here is a subtitle for this table</p>
               <div className='border mt-4 border-gray-200'></div>
               <div className='mx-4 py-8 w-auto '>
                    <div className='flex gap-1'>
                         <div className='border rounded-full px-2  py-1  text-sm text-center'>Count</div>
                         <div className='border rounded-full px-2 bg-[#607D8B]  py-1 text-sm text-white text-center'>Default</div>
                         <div className='border rounded-full px-2  bg-[#1D62F0] py-1 text-sm text-white text-center'>Primary</div>
                         <div className='border rounded-full px-2 bg-[#23CCEF] py-1 text-sm text-white text-center'>Info</div>
                         <div className='border rounded-full px-2 bg-[#59d05d] py-1 text-sm text-white text-center'>Success</div>
                         <div className='border rounded-full px-2 bg-[#fbad4c] py-1 text-sm  text-white text-center'>Warning</div>
                         <div className='border rounded-full px-2 bg-[#ff646d] py-1 text-sm text-white text-center'>Danger</div>

                    </div>

               </div>

          </div>)
}

export default Badge //comentario