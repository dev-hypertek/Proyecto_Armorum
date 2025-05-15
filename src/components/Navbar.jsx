import { useState } from 'react';
import profileImg from "../images/da.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed top-0 w-full bg-white z-50 shadow-md'>
      <div className='flex justify-between border items-center h-16'>
        {/* Left Side - Logo */}
        <div className='w-64 px-6 text-xl font-bold text-blue-600'>
          Armorum Financiero
        </div>

        {/* Right Side - User Profile */}
        <div className='flex items-center gap-4 mx-6'>
          <img
            className='w-10 h-10 rounded-full'
            src={profileImg}
            alt='Perfil Armorum'
          />
          <div className='text-sm'>
            <div className='font-medium'>Administrador</div>
            <div className='text-gray-500'>Sistema Armorum</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;