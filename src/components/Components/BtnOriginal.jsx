import React from 'react'

const BtnOriginal = () => {
     return (
          <div className='border shadow-md w-[98%]  mx-4 my-8'>
               <h1 className='px-4 py-1 mt-1 text-lg'>Button Original</h1>
               <p className='text-gray-400 px-4 text-xs'>Here is a subtitle for this table</p>
               <div className='border mt-4 border-gray-200'></div>
               <div className='text-white px-4 py-6  flex gap-4'>
                    <button className='bg-[#607D8B] px-6 py-2  rounded'>Default</button>
                    <button className='bg-[#1D62F0] px-6 py-2  rounded'>Primary</button>
                    <button className='bg-[#23CCEF] px-6 py-2  rounded'>Info</button>
                    <button className='bg-[#59d05d] px-6 py-2  rounded'>Success</button>
                    <button className='bg-[#fbad4c] px-6 py-2  rounded'>Warning</button>
                    <button className='bg-[#ff646d] px-6 py-2 rounded'>Danger</button>
               </div>
          </div>
     )
}

export default BtnOriginal