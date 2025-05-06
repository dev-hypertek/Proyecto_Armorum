import React from 'react'
import { tableData } from '../../const'

const HoverableTable = () => {
     return (
          <div className="border shadow-md pt-2  w-full">
               <h1 className="text-xl font-medium py-4 mx-4 ">Hoverable Table</h1>

               <div className="border-b border-gray-300 w-full"></div>
               <div className="my-6">
                    <div className="mx-4 my-6">
                         <table className="w-full ">
                              <thead>
                                   <tr className="border-t border-b text-center">
                                        <th className="px-4 py-2">#</th>
                                        <th className="px-4 py-2">First	</th>
                                        <th className="px-4 py-2">Last</th>
                                        <th className="px-4 py-2">Handle</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        tableData.map((items) => (
                                             <tr key={items.id} className="text-center border-t hover:bg-gray-100 ">
                                                  <td className="px-4 py-2 ">{items.id}</td>
                                                  <td className="px-4 py-2">{items.firstName}</td>
                                                  <td className="px-4 py-2 ">{items.lastName}</td>
                                                  <td className="px-4 py-2">{items.handle}</td>

                                             </tr>

                                        ))
                                   }
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     )
}

export default HoverableTable