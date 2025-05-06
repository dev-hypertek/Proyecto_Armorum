import React from 'react'
import BasicTable from '../components/Table/BasicTable'
import HoverableTable from '../components/Table/HoverableTable'
import StripedRows from '../components/Table/StripedRows'
import ResponsiveTable from '../components/Table/ResponsiveTable'
import BorderedTable from '../components/Table/BorderedTable'
import TableHeadStates from '../components/Table/TableHeadStates'

const Tables = () => {
  return (
    <div className="mt-4 p-4">
      <h1 className='text-xl mx-6 font-semibold'>Tables</h1>
      <div className='flex gap-10 py-7 px-4 items-start'>
        <div className='w-1/2 '>
          <BasicTable />
          <StripedRows />
          <ResponsiveTable />
        </div>
        <div className='w-1/2'>
          <HoverableTable  />
          <BorderedTable />
          <TableHeadStates/>
        </div>

      </div>
    </div>)
}

export default Tables