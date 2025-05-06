import React from 'react'
import { tableData } from '../../const'

const TableHeadStates = () => {
     return (
          <div className="border shadow-md pt-2 w-full">
               <h1 className="text-xl font-medium py-4 mx-4">Table Head States</h1>

               <div className="border-b border-gray-300 w-full"></div>

               <div className="mx-4 my-6">
                    <div className="overflow-x-auto">
                         <table className="w-full border border-green-500 text-left">
                              <thead className="border-b">
                                   <tr className='bg-green-500 text-white'>
                                        <th className="px-4 py-2  ">#</th>
                                        <th className="px-4   py-2">First</th>
                                        <th className="px-4 py-2  ">Last</th>
                                        <th className="px-4 py-2">Handle</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {tableData.map((items) => (
                                        <tr key={items.id} >
                                             <td className="px-4 py-2 border-t ">{items.id}</td>
                                             <td className="px-4 py-2 border-t ">{items.firstName}</td>
                                             <td className="px-4 py-2 border-t ">{items.lastName}</td>
                                             <td className="px-4 py-2 border-t">{items.handle}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
                    <div className='my-6'>
                         <div className="overflow-x-auto">
                              <table className="w-full border border-blue-500 text-left">
                                   <thead className="border-b">
                                        <tr className='bg-blue-500 text-white'>
                                             <th className="px-4 py-2  ">#</th>
                                             <th className="px-4   py-2">First</th>
                                             <th className="px-4 py-2  ">Last</th>
                                             <th className="px-4 py-2">Handle</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {tableData.map((items) => (
                                             <tr key={items.id} >
                                                  <td className="px-4 py-2 border-t ">{items.id}</td>
                                                  <td className="px-4 py-2 border-t ">{items.firstName}</td>
                                                  <td className="px-4 py-2 border-t ">{items.lastName}</td>
                                                  <td className="px-4 py-2 border-t">{items.handle}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>

               </div>
          </div>
     )
}

export default TableHeadStates
