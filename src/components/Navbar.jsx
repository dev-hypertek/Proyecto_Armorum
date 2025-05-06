import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { LiaBell, LiaEnvelope } from 'react-icons/lia'
import { MdArrowDropDown } from "react-icons/md";
import Profile from './Profile';
import MessageNotifaction from './MessageNotifaction';

// Importamos la imagen del proyecto
import profileImg from "../images/da.png";

const Navbar = () => {
     const [isOpen, setIsOpen] = useState(false);
     const [msgNotifation, setMsgNotifation] = useState(false);
     return (
          <div className='fixed top-0  w-full bg-white z-50  shadow-md'>
               <div className='flex justify-between border items-center'>
                    {/* Left Side */}
                    <div className='flex'>
                         <div className='w-64 px-4 hover:cursor-pointer hover:underline text-start py-4 border text-lg font-medium'>
                              Armorum Financial
                         </div>
                         <div className='mx-6 mt-2 relative'>
                              <input
                                   className='border rounded-full px-6 py-1 mt-2 bg-gray-100 focus:outline-none'
                                   placeholder='search....'
                              />
                              <FaSearch className='text-gray-300 absolute top-4 right-4' />
                         </div>
                    </div>

                    {/* Right Side */}
                    <div className='flex items-center gap-4 mx-12 my-2'>
                         <LiaEnvelope onClick={() => setMsgNotifation(!msgNotifation)} className='text-2xl cursor-pointer' />

                         {/* Notification with badge */}
                         <div className='relative'>
                              <LiaBell className='text-2xl' />
                              <div className='absolute top-0 right-0 bg-red- text-white text-xs w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2'>
                                   3
                              </div>
                         </div>

                         {/* Profile section */}
                         <img
                              className='w-10 h-10 rounded-full'
                              src={profileImg}
                              alt='Perfil Armorum'
                         />
                         <div onClick={() => setIsOpen(!isOpen)} className='flex gap-1 cursor-pointer'>
                              <div>Administrador</div>
                              <MdArrowDropDown className='text-xl' />
                         </div>

                    </div>
               </div>
               <div className='absolute top-15 right-0'>
                    {isOpen && <Profile />}

               </div>
               <div className='absolute top-15 right-56'>
                    {
                         msgNotifation && (<MessageNotifaction />)
                    }
               </div>
          </div>
     )
}

export default Navbar
