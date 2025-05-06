import React from "react";

const BalanceProcess = () => {
     return (
          <div className="flex flex-col gap-y-7">
               <div className="mt-8 " >
                    <div className="flex justify-between text-xs">
                         <div>Profits</div>
                         <div>$3k</div>
                    </div>
                    <div className="w-full h-2 flex rounded overflow-hidden">
                         <div className="bg-[#59d05d]" style={{ width: "78%" }}></div>
                         <div className="bg-gray-300" style={{ width: "22%" }}></div>
                    </div>
               </div>

               <div>
                    <div className="flex justify-between text-xs">
                         <div>Orders</div>
                         <div>$576</div>
                    </div>
                    <div className="w-full h-2 flex rounded overflow-hidden">
                         <div className="bg-[#23CCEF]" style={{ width: "65%" }}></div>
                         <div className="bg-gray-300" style={{ width: "35%" }}></div>
                    </div>
               </div>

               <div>
                    <div className="flex justify-between text-xs">
                         <div>Tasks Complete</div>
                         <div>70%</div>
                    </div>
                    <div className="w-full h-2 flex rounded overflow-hidden">
                         <div className="bg-[#1D62F0]" style={{ width: "70%" }}></div>
                         <div className="bg-gray-300" style={{ width: "30%" }}></div>
                    </div>
               </div>

               <div>
                    <div className="flex justify-between text-xs">
                         <div>Oepn Rate</div>
                         <div>60%</div>
                    </div>
                    <div className="w-full h-2 flex rounded overflow-hidden">
                         <div className="bg-[#fbad4c]" style={{ width: "60%" }}></div>
                         <div className="bg-gray-300" style={{ width: "40%" }}></div>
                    </div>
               </div>

          </div>
     );
};

export default BalanceProcess;
