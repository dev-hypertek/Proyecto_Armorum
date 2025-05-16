import { useState, useContext, createContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { BsPersonVcardFill } from "react-icons/bs";
import { BiNetworkChart } from "react-icons/bi";
import { FiMenu } from "react-icons/fi"; 

import profileImg from "../images/da.png";

export const SidebarContext = createContext();

export const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useContext(SidebarContext);
  const location = useLocation();

  const menuItems = [
    { 
      icon: <AiOutlineDashboard />, 
      label: "Dashboard", 
      path: "/"
    },
    {
      icon: <RiFileList3Line />,
      label: "Procesamiento Facturas",
      path: "/procesamiento-facturas"
    },
    {
      icon: <BsPersonVcardFill />,
      label: "Validación Terceros",
      path: "/validacion-terceros"
    },
    {
      icon: <BiNetworkChart />,
      label: "Homologación Productos",
      path: "/homologacion-productos"
    },
  ];

  return (
    <div className={`z-50 fixed top-16 border shadow-md bg-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} h-screen`}>
      <div className="flex justify-end p-2">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-blue-50"
        >
          <FiMenu className="text-xl" />
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="flex items-center py-4 px-4 gap-3">
          <img
            src={profileImg}
            className="w-12 h-12 rounded-full"
            alt="Perfil Armorum"
          />
          <div className="text-xs font-bold flex flex-col">
            <h1 className="text-gray-400">Armorum</h1>
            <h2 className="text-black">Sistema Financiero</h2>
          </div>
          <MdArrowDropDown
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-xl ml-auto cursor-pointer"
          />
        </div>
      )}
      
      {isCollapsed && (
        <div className="flex justify-center py-4">
          <img
            src={profileImg}
            className="w-12 h-12 rounded-full"
            alt="Perfil Armorum"
          />
        </div>
      )}

      <div className="border-b mt-1"></div>

      {!isCollapsed && (
        <div className="mt-4 px-4">
          <h3 className="text-xs font-bold text-gray-400 mb-2">MÓDULOS ARMORUM</h3>
        </div>
      )}

      <div className="mt-1 text-sm font-medium text-gray-700">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link to={item.path} key={index}>
              <div
                className={`
                  hover:border-l-4 py-3 my-1 
                  ${isActive ? 'border-l-4 border-indigo-500 bg-indigo-50' : 'hover:border-indigo-500'} 
                  flex items-center justify-between hover:bg-gray-50 cursor-pointer
                  ${isCollapsed ? 'px-0' : 'px-4'}
                `}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3'}`}>
                  <div className={`text-xl ${isActive ? "text-indigo-500" : "text-gray-400"}`}>
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <div className={isActive ? "text-indigo-600 font-medium" : "text-gray-700"}>{item.label}</div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;