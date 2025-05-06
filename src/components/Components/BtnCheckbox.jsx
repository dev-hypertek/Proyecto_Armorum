import React from "react";

const BtnCheckbox = () => {
  return (
    <div className="border shadow-md w-[98%] mx-4 my-8">
      <h1 className="px-4 py-1 mt-1 text-lg">Checkbox</h1>
      <p className="text-gray-400 px-4 text-xs">
        Here is a subtitle for this table
      </p>
      <div className="border mt-4 border-gray-200"></div>
      <div className=" px-4 py-6 flex gap-4 items-center flex-wrap">
        <div>
          <label>
            <input type="checkbox" className="size-4 mx-2" />
            <strong>Unchecked</strong> 
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked className="size-4 mx-2"/>
            <strong>Checked</strong>
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" disabled  className="size-4 mx-2"/>
            Disabled
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" disabled checked className="size-4 mx-2" />
            Checked Disabled
          </label>
        </div>
      </div>
    </div>
  );
};

export default BtnCheckbox;
