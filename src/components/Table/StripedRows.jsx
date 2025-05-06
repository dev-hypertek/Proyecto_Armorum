import React from "react";
import { tableData } from "../../const";

const StripedRows = () => {
     return (
          <div className="border shadow-md pt-4 my-6  w-full">
               <h1 className="text-xl font-medium py-2  mx-4 ">Striped Rows</h1>

               <div className="border-b border-gray-300 w-full"></div>
               <div className="my-6">
                    <div className="border mx-4 h-auto py-2 px-2 text-sm texr-gray-300 bg-gray-100">
                         Add <span className="text-[#e83e8c]">.table-striped</span> to rows the
                         striped table
                    </div>
                    <div className="mx-4 my-6">
                         <table className="w-full ">
                              <thead>
                                   <tr className="  text-left">
                                        <th className="px-4 py-2">#</th>
                                        <th className="px-4 py-2">First </th>
                                        <th className="px-4 py-2">Last</th>
                                        <th className="px-4 py-2">Handle</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {tableData.map((items) => (
                                        <tr
                                             key={items.id}
                                             className="text-start text-md odd:bg-gray-100 "
                                        >
                                             <td className="px-4 py-2 ">{items.id}</td>
                                             <td className="px-4 py-2">{items.firstName}</td>
                                             <td className="px-4 py-2 ">{items.lastName}</td>
                                             <td className="px-4 py-2">{items.handle}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
                    <div>
                         <div className="border mx-4 h-auto py-2 px-2 text-sm texr-gray-300 bg-gray-100">
                              Add <span className="text-[#e83e8c]">.table-striped-bg-*states</span> to change background from striped rows
                         </div>
                         <div className="mx-4 my-6">
                              <table className="w-full ">
                                   <thead>
                                        <tr className="text-left">
                                             <th className="px-4 py-2">#</th>
                                             <th className="px-4 py-2">First </th>
                                             <th className="px-4 py-2">Last</th>
                                             <th className="px-4 py-2">Handle</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {tableData.map((items) => (
                                             <tr
                                                  key={items.id}
                                                  className="text-start text-md odd:bg-gray-400 odd:text-white "
                                             >
                                                  <td className="px-4 py-2 ">{items.id}</td>
                                                  <td className="px-4 py-2">{items.firstName}</td>
                                                  <td className="px-4 py-2 ">{items.lastName}</td>
                                                  <td className="px-4 py-2">{items.handle}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
                    <div>
                         <div className="mx-4 my-6">
                              <table className="w-full ">
                                   <thead>
                                        <tr className="text-left">
                                             <th className="px-4 py-2">#</th>
                                             <th className="px-4 py-2">First </th>
                                             <th className="px-4 py-2">Last</th>
                                             <th className="px-4 py-2">Handle</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {tableData.map((items) => (
                                             <tr
                                                  key={items.id}
                                                  className="text-start text-md odd:bg-red-500 odd:text-white "
                                             >
                                                  <td className="px-4 py-2 ">{items.id}</td>
                                                  <td className="px-4 py-2">{items.firstName}</td>
                                                  <td className="px-4 py-2 ">{items.lastName}</td>
                                                  <td className="px-4 py-2">{items.handle}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default StripedRows;
