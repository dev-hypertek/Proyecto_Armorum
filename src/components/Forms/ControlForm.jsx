
const ControlForm = () => {
     return (
          <div className="border shadow-md mx-auto w-full max-w-2xl p-6 bg-white rounded-md">
               <h1 className="text-xl font-semibold mb-6">Base Form Control</h1>
               <hr />
               <div className="mt-6 space-y-6">
                    <div>
                         <label className="text-sm block mb-1">Square Input</label>
                         <input
                              type="text"
                              className="border py-2 px-2 w-full "
                              placeholder="Enter Email"
                         />
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Example Select</label>
                         <select className="border py-2 px-2  w-full">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                         </select>
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Pill Input</label>
                         <input
                              type="email"
                              className="border py-2 px-2 w-full rounded-full "
                              placeholder="Pill Input"
                         />
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Pill Select</label>
                         <select className="border py-2 px-2 rounded-full  w-full">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                         </select>
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Solid Input</label>
                         <input
                              type="email"
                              className="border py-2 px-2 w-full rounded bg-gray-200 "
                              placeholder="Solid Input"
                              disabled
                         />
                    </div>
                    <div>
                         <label className="text-sm block mb-1">Pill Select</label>
                         <select className="border py-2 px-2 rounded  bg-gray-200 w-full">
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
          </div>)
}

export default ControlForm