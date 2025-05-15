import React from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { LiaKeyboard } from "react-icons/lia";

const Input = () => {
  return (
    <div className='border shadow-md w-[98%] mx-4 my-8'>
      <h1 className='px-4 py-1 mt-1 text-lg'>Bootstrap Input</h1>
      <p className='text-gray-400 px-4 text-xs'>Here is a subtitle for this table</p>
      <div className='border mt-4 border-gray-200'></div>

      <div className='mx-4 py-8'>

        {/* First row of inputs */}
        <div className='flex gap-8 my-6'>
          <input
            type='text'
            placeholder='input'
            className='border w-1/2 py-2 px-2 rounded'
          />
          <input
            type='text'
            name='value'
            value='Success'
            className='border w-1/2 px-2 text-[#59d05d] border-[#59d05d] py-2 rounded'
          />
        </div>

        {/* Second row of inputs with icons */}
        <div className='flex gap-8'>

          {/* Left Input with error icon */}
          <div className='relative w-1/2'>
            <input
              type='text'
              placeholder='input'
              className='border w-full py-2 px-2 text-red-500 border-red-500 rounded'
            />
            <LiaTimesSolid className='absolute text-red-500 top-1/2 -translate-y-1/2 right-3' />
          </div>

          {/* Right Input with keyboard icon */}
          <div className='relative w-1/2'>
            <input
              type='text'
              name='value'
              value='Success'
              className='border w-full px-2 py-2 rounded'
            />
            <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>
              <LiaKeyboard />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Input;
