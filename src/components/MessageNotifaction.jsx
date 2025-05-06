const MessageNotification = () => {
     return (
          <div className="border rounded shadow-lg w-64 bg-white">
               <div className="px-4 py-2">
                    <p className="py-1 hover:bg-gray-100 cursor-pointer">Nuevos Mensajes</p>
                    <p className="py-1 hover:bg-gray-100 cursor-pointer">Notificaciones BMC</p>

                    {/* Full-width top border */}
                    <div className="border-t mt-2 pt-2">
                         <p className="hover:bg-gray-100 py-1 cursor-pointer">Ver Todos los Mensajes</p>
                    </div>
               </div>
          </div>
     );
};
export default MessageNotification