import { useState, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai"; // AiOutlineTable ya no es necesaria
import { MdArrowDropDown } from "react-icons/md";
// FaTableCells, FaRegKeyboard, FaBell, FaFont, LiaFonticons ya no se importan
import { RiFileList3Line } from "react-icons/ri";
import { BsPersonVcardFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi"; 

import profileImg from "../images/da.png";

export const SidebarContext = createContext();

export const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useContext(SidebarContext);

  const menuItems = [
    { icon: <AiOutlineDashboard />, label: "Dashboard", count: 5, path: "/", color: "#4d7cfe" },
    // El bloque de Menú items comentados será eliminado completamente
    {
      icon: <RiFileList3Line />,
      label: "Procesamiento Facturas",
      path: "/procesamiento-facturas",
      bgColor: "#4d7cfe",
      textColor: "white",
      highlight: true
    },
    {
      icon: <BsPersonVcardFill />,
      label: "Validación Terceros",
      path: "/validacion-terceros",
      bgColor: "#4d7cfe",
      textColor: "white",
      highlight: true
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
              <h2 className="text-black">Administrador</h2>
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

        {isDropdownOpen && !isCollapsed && (
          <div className="mt-2 text-gray-600 px-6 text-sm">
            <div className="cursor-pointer py-1">Mi Perfil</div>
            <div className="cursor-pointer py-1">Editar Perfil</div>
            <div className="cursor-pointer py-1">Configuración</div>
          </div>
        )}

      <div className="border-b mt-1"></div>

      {!isCollapsed && (
        <div className="mt-4 px-4">
          <h3 className="text-xs font-bold text-gray-400 mb-2">MÓDULOS ARMORUM</h3>
        </div>
      )}

      <div className="mt-1 text-sm font-medium text-gray-700">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <div
              className={`
                hover:border-l-4 py-2 my-2 
                ${item.highlight ? 'border-l-4 border-[#4d7cfe] bg-blue-50' : 'hover:border-[#4d7cfe]'} 
                flex items-center justify-between hover:bg-gray-50 cursor-pointer
                ${isCollapsed ? 'px-0' : 'px-4'}
              `}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3'}`}>
                <div className={`text-xl ${item.color ? `text-[${item.color}]` : item.highlight ? "text-[#4d7cfe]" : "text-gray-400"}`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <div className={item.highlight ? "text-[#4d7cfe] font-medium" : ""}>{item.label}</div>
                )}
              </div>
              {item.count && !isCollapsed && (
                <div
                  className={`h-6 px-2 text-xs rounded-full border text-center flex items-center justify-center ${
                    item.bgColor ? `bg-[${item.bgColor}]` : ""
                  } ${item.textColor ? `text-${item.textColor}` : ""}`}
                >
                  {item.count}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;