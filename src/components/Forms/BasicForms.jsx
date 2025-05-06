const BasicForms = () => {
     return (
          <div className="border shadow-md mx-auto w-full max-w-2xl p-6 bg-white rounded-md">
               <h1 className="text-xl font-semibold mb-6">Base Form Control</h1>
               <hr />
               <div className="mt-6 space-y-6">
                    <div>
                         <label className="text-sm block mb-1">Email Address</label>
                         <input
                              type="email"
                              className="border py-2 px-2 w-full rounded"
                              placeholder="Enter Email"
                         />
                         <span className="text-xs text-gray-500 mt-1 block">
                              We'll never share your email with anyone else.
                         </span>
                    </div>

                    <div>
                         <label className="text-sm block mb-1">Password</label>
                         <input
                              type="password"
                              className="border py-2 px-2 w-full rounded"
                              placeholder="Enter Password"
                         />
                    </div>

                    <div className="flex items-center gap-4">
                         <label className="text-sm w-[25%]">Inline Input</label>
                         <input
                              type="password"
                              className="border py-2 px-2 rounded w-[75%]"
                              placeholder="Enter Password"
                         />
                    </div>

                    <div>
                         <label className="text-sm block mb-1">Success Input</label>
                         <input
                              type="text"
                              className="border border-green-500 text-green-600 py-2 px-2 w-full rounded"
                              placeholder="Success"
                         />
                    </div>

                    <div>
                         <label className="text-sm block mb-1">Error Input</label>
                         <input
                              type="text"
                              className="border border-red-500 text-red-500 py-2 px-2 w-full rounded"
                              placeholder="Error"
                         />
                         <span className="text-xs text-red-500 mt-1 block">
                              Please provide valid information.
                         </span>
                    </div>

                    <div>
                         <label className="text-sm block mb-1">Disabled Input</label>
                         <input
                              type="text"
                              disabled
                              className="border py-2 px-2 w-full rounded bg-gray-100 cursor-not-allowed"
                              placeholder="Disabled Input"
                         />
                    </div>

                    <div>
                         <label className="text-sm block mb-2">Gender</label>
                         <div className="flex items-center gap-6">
                              <label className="flex items-center gap-2">
                                   <input type="radio" name="gender" value="male" />
                                   Male
                              </label>
                              <label className="flex items-center gap-2">
                                   <input type="radio" name="gender" value="female" />
                                   Female
                              </label>
                         </div>
                    </div>

                    <div>
                         <label className="text-sm block mb-1">Static</label>
                         <div className="py-2 px-2 bg-gray-50 border rounded">
                              hello@themekita.com
                         </div>
                    </div>

                    <div>
                         <label className="text-sm block mb-1">Example Select</label>
                         <select className="border py-2 px-2 rounded w-full">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                         </select>
                    </div>

                    <div>
                         <label className="text-sm block mb-1">Upload File</label>
                         <input
                              type="file"
                              className="border py-2 px-2 w-full rounded bg-gray-50"
                         />
                    </div>

                    <div>
                         <label className="text-sm block mb-1">Comments</label>
                         <textarea
                              rows={4}
                              className="border px-2 py-2 w-full rounded"
                              placeholder="Enter your comments..."
                         />
                    </div>

                    <div className="flex items-center gap-2">
                         <input
                              type="checkbox"
                              id="agree"
                              className="rounded border-gray-300"
                         />
                         <label htmlFor="agree" className="text-sm">
                              Agree with terms and conditions
                         </label>
                    </div>
                    <hr />
                    <div className="flex gap-4">
                         <button className="bg-green-500 bg-opacity-100 rounded px-4 py-2 text-white">Submit</button>
                         <button className="bg-red-500 rounded px-4 py-2 text-white">Cancle</button>
                    </div>
               </div>


          </div>
     );
};

export default BasicForms;
