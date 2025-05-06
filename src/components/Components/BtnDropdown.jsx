import React, { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const BtnDropdown = () => {
     const [isOpen, setIsOpen] = useState(false)
     return (
          <>
               <div className="border shadow-md w-[98%] mx-4 my-8">
                    <h1 className="px-4 py-1 mt-1 text-lg">Bootstrap Dropdown</h1>
                    <p className="text-gray-400 px-4 text-xs">
                         Here is a subtitle for this table
                    </p>
                    <div className="border mt-4 border-gray-200"></div>
                    <div className="text-white px-4 py-6 flex gap-2 items-center flex-wrap">
                         <div onClick={() => setIsOpen(!isOpen)} className="bg-blue-600 flex justify-between items-center  gap-4 px-4 rounded py-2">
                              <button >Dropdown</button>
                              <MdOutlineArrowDropDown />
                         </div>
                    </div>

               </div>
               {isOpen && <div className="transform -translate-y-14 flex flex-col gap-2 px-4 pt-4 bg-white border w-52 translate-x-8">
                    <div>Actions</div>
                    <div>Another Action</div>
                    <div className="border w-full"></div>
                    <div className="py-2">Something eles here</div>
               </div>}

          </>
     );
};

export default BtnDropdown;
