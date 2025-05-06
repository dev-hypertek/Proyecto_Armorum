import React from "react";
import { tableData } from "../../const";
tableData;
const ResponsiveTable = () => {
     return (
          <div className="border shadow-md pt-4  w-full">
               <h1 className="text-xl font-medium py-2  mx-4 ">Base Form Control</h1>

               <div className="border-b border-gray-300 w-full"></div>
               <div className="my-6">
                    <div className="border mx-4 h-auto py-2 px-4 text-sm texr-gray-300 bg-gray-100">
                         Create responsive tables by wrapping any table with<span className="text-[#e83e8c]">.table-responsive
                              DIV </span> to make them scroll horizontally on small devices
                    </div>
                    <div className="mx-4 my-6">
                         <table className="w-full -mx-2 ">
                              <thead>
                                   <tr className=" border text-sm text-center">
                                        <th className="px-4 border py-2">#</th>
                                        <th className="px-4 border py-2">Table heading	 </th>
                                        <th className="px-4 border py-2">Table heading	</th>
                                        <th className="px-4 border py-2">Table heading	</th>
                                        <th className="px-4 border py-2">Table heading	</th>
                                        <th className="px-4 border py-2">Table heading	</th>
                                        <th className="px-4 border py-2">Table heading	</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   <tr className="border text-sm">
                                        <td className="px-4 border py-2">1</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>

                                   </tr>
                                   <tr className="border text-sm">
                                        <td className="px-4 border py-2">2</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>

                                   </tr>
                                   <tr className="border text-sm">
                                        <td className="px-4 border py-2">3</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>
                                        <td className="px-4 border py-2">Table cell	</td>

                                   </tr>
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};

export default ResponsiveTable;
