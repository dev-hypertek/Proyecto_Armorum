import React from 'react'
import { MdHistory } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";

const MyBalance = () => {
     return (
          <div className='py-8'>
               <h1 >My Balance</h1>
               <p className='my-2 text-2xl font-bold'>$ 3,018</p>
               <div className='border-b py-4'>
                    <button className='bg-blue-500 text-white w-full py-2 rounded'>+ Add Balance</button>
               </div>
               <div className='mx-6 flex justify-between py-3 gap-2 items-center'>
                    <div className='flex gap-1  hover:underline text-gray-400 items-center'>
                         <div><MdHistory /></div>
                         <div className=''>History</div>
                    </div>
                    <div className='flex gap-1 items-center text-gray-400 hover:underline'>
                         <div><FiRefreshCcw /></div>
                         <div className=''>Refresh</div>
                    </div>
               </div>

          </div>
     )
}

export default MyBalance