import React from 'react'
import { FaUserGroup } from "react-icons/fa6";
import { MdBarChart } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";

const Slider = () => {
     const data = [
          {
               id: 1,
               icon: <FaUserGroup />,
               name: 'Clientes',
               count: '24',
               bgColor: '#fbad4c'


          },
          {
               id: 2,
               icon: <MdBarChart />,
               name: 'Facturas',
               count: '1,345',
               bgColor: '#59d05d'
          }, {
               id: 3,
               icon: <IoNewspaperOutline />,
               name: 'Registros BMC',
               count: '952',
               bgColor: '#ff646d'
          },
          {
               id: 4,
               icon: <LuCircleCheckBig />,
               name: 'Procesados',
               count: '576',
               bgColor: '#1D62F0'
          }

     ]
     return (
          <div className='relative grid grid-cols-4 gap-6 mx-6 my-7 text-white'>
               {
                    data.map((item) => (
                         <div  
                              className=' py-4 flex justify-evenly shadow-lg  items-center'
                              style={{ backgroundColor: item.bgColor }}
                              key={item.id} >
                              <div className='text-5xl font-bold'>
                                   {item.icon}
                              </div>
                              <div className='flex justify-center flex-col items-start mr'>
                                   <div className=''>{item.name}</div>
                                   <div className='text-lg font-medium'>{item.count}</div>
                              </div>

                         </div>
                    ))
               }
          </div>
     )
}

export default Slider