import React from 'react'
import PieChart from './PieChart '

const UserStatistics = () => {
     return (
          <div className='w-[32%] h-auto border shadow-lg'>
  <div className='px-2 pb-2'>
    <h1 className='font-medium text-md pt-2'>Users Statistics</h1>
    <p className='text-xs text-gray-400'>Users statistics this month</p>
  </div>
  
  <div className='border-b my-1 border-gray-200'></div> {/* Horizontal line here */}

  <div className='my-14'>
    <PieChart />
  </div>
</div>

     )
}

export default UserStatistics