import React from 'react'

const Notifications = () => {
  return (
    <div className="mt-4 p-4">
      <h1 className='text-xl mx-6 font-semibold'>Notifications</h1>
      <div className='border mx-6 my-6 shadow-md'>
        <div className='my-2 mx-2'>
          <h1 className='text-lg font-medium my-2'>Bootstrap Notify</h1>
          <p className='text-gray-400 text-sm pb-2'>Turn standard bootstrap alerts into "growl" like notifications from <span className='text-blue-400 hover:underline'>Bootstrap Notify</span></p>
        </div>
        <div className='border w-full'></div>
        <div className='mx-60 my-4'>
          <div>
            <div >
              <label className='px-8 text-sm'>Placement :</label>
              <select className='border py-2 px-2 w-1/4 rounded'>
                <option>Top</option>
                <option>Bottom</option>

              </select>

            </div>
            <div className='my-4'>
              <select className='border py-2 px-2 mx-[134px] w-1/4 rounded'>
                <option>Top</option>
                <option>Bottom</option>

              </select>
            </div>
          </div>

          <div>
            <div className='pt-10' >
              <label className='px-12 text-sm'>State  :</label>
              <select className='border py-2 px-2 w-1/4 rounded'>
                <option>Primary</option>
                <option>Info</option>
                <option>Success</option>
                <option>Info</option>
                <option>Warning</option>
                <option>Danger</option>



              </select>

            </div>
          </div>

          
          <div className='pt-10'>
            <div >
              <label className='px-12 text-sm'>Style   :</label>
              <select className='border py-2 px-2 w-1/4 rounded'>
                <option>Plan</option>
                <option>With Icons</option>
                



              </select>

            </div>
          </div>

        </div>
        <div className='border w-full'></div>
         <button className='bg-green-500 mx-80 my-6 text-white rounded px-4 py-2'>Display</button>
      </div>

    </div>)
}

export default Notifications