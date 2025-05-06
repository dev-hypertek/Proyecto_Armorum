import React, { useState } from 'react'

const MultipleSwitcheRounded = ({ color }) => {
     const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn(!isOn);

  return (
    <div
      onClick={toggle}
      className='w-20 h-10 rounded-full relative cursor-pointer transition-all duration-300 overflow-hidden'
      style={{ backgroundColor: color }}
    >
      {/* Toggle text */}
      <div className='absolute inset-0 flex items-center justify-center z-10 text-white text-sm font-semibold'>
        {isOn ? 'ON' : 'OFF'}
      </div>

      {/* Toggle knob */}
      <div
        className={`bg-white w-12 h-12 rounded-full shadow-md absolute top-1/2 -translate-y-1/2 transform transition-transform duration-300 z-20 ${
          isOn ? 'translate-x-[55px]' : 'translate-x-[-25px]'
        }`}
      ></div>
    </div>
  );
}

export default MultipleSwitcheRounded