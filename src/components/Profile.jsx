import React from "react";
// Importamos la imagen del proyecto
import profileImg from "../images/da.png";

const Profile = () => {
     return (
          <div className="mx-1 tranform -translate-x-12 py-4 border rounded shadow-lg w-64 max-w-xs bg-white">
          <div className="flex gap-2">
               <img
                    className="w-16 h-16 rounded mx-4"
                    src={profileImg}
                    alt="Perfil Armorum"
               />
               <div className="">
                    <h1 className="text-lg">Administrador</h1>
                    <p className="text-xs text-gray-600">admin@armorum.com</p>
                    <button className="bg-blue-500 text-white py-1 rounded-full text-xs px-2 mt-2">Ver Perfil</button>
               </div>
          </div>
     
          {/* Full width top + bottom border */}
          <div className="border-t border-b border-gray-300 my-2 w-full">
               <p className="py-1 mx-4 cursor-pointer">Mi Perfil</p>
               <p className="py-1 mx-4 cursor-pointer">Mis Estadísticas</p>
               <p className="py-1 mx-4 cursor-pointer">Bandeja de Entrada</p>
          </div>
     
          <div className="border-b border-gray-300 w-full px-4 cursor-pointer py-2">
               <p>Configuración de Cuenta</p>
          </div>
     
          <div className="py-2 px-4 cursor-pointer">
               <p>Cerrar Sesión</p>
          </div>
     </div>
     
     );
};

export default Profile;
