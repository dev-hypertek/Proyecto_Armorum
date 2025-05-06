import React, { useState } from 'react';

const MultipleSwitcheSquare = ({ color }) => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn(!isOn);

  return (
    <div
      onClick={toggle}
      className='w-20 h-10 rounded flex items-center justify-between px-2 cursor-pointer transition-all duration-300 relative'
      style={{ backgroundColor: color }}
    >
      <div
        className={`text-white text-xs font-bold z-10 w-full text-center transform transition-transform duration-300 absolute ${
          isOn ? '-translate-x-[20px]' : 'translate-x-[10px]'
        }`}
      >
        {isOn ? 'ON' : 'OFF'}
      </div>
      <div
        className={`bg-white w-5 h-8 my-3 mx-1  rounded-sm shadow-md transform transition-transform duration-300 absolute ${
          isOn ? 'translate-x-[42px]' : '-translate-x-2'
        }`}
      ></div>
    </div>
  );
};

export default MultipleSwitcheSquare;
