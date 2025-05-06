import React from 'react'

const FormStyle = () => {
     return (
          <div className="border shadow-md mx-auto w-full max-w-2xl p-6 bg-white rounded-md">
               <h1 className="text-xl font-semibold mb-6">Form Control Styles</h1>
               <hr />
               <div className="mt-6 space-y-6">
                    <div>
                         <label className="text-sm block mb-1">Large Input</label>
                         <input
                              type="text"
                              className="border py-3 rounded px-2 w-full "
                              placeholder="Large Input"
                         />
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Default Input</label>
                         <input
                              type="text"
                              className="border py-2 rounded px-2 w-full "
                              placeholder="Default Input"
                         />
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Small Input</label>
                         <input
                              type="text"
                              className="border rounded px-2 w-full "
                              placeholder="Small Input"
                         />
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Large Select</label>
                         <select className="border py-3 px-2  w-full">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                         </select>
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Default Select</label>
                         <select className="border py-3 px-2  w-full">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                         </select>
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Small Select</label>
                         <select className="border py-1 px-2  w-full">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                         </select>
                    </div>
                    <hr />
                    <div className="flex gap-4">
                         <button className="bg-green-500 bg-opacity-100 rounded px-4 py-2 text-white">Submit</button>
                         <button className="bg-red-500 rounded px-4 py-2 text-white">Cancle</button>
                    </div>
               </div>
          </div>
     )
}

export default FormStyle