import React from 'react'
import UserStatistics from './UserStatistics'
import SalesChart from './SalesChart'

const Charts = () => {
     return (
          <div className='flex gap-14 mx-6 items-start'>
               <UserStatistics />
               <SalesChart />
          </div>
     )
}

export default Charts