import React, { useState, useEffect } from 'react';
import useChat from './useChat';
import './chat.modules.css';
import { FaPaperPlane, FaSignOutAlt } from 'react-icons/fa';

export const Chat = () => {
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const chatList = [
    {
      name: 'Leon S. Kennedy',
      profilePicture: 'https://i.pinimg.com/564x/8b/4c/4e/8b4c4e9e463b0077dc8db47c22f3c808.jpg',
    },
    {
      name: 'Papá de Bambi',
      profilePicture: 'https://pbs.twimg.com/media/FBIKD08XMAEK4uu.jpg',
    },
  
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  useEffect(() => {
    
  }, [messages]);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* NavBar */}
      <div className="bg-[#397850] p-4 flex items-center justify-between"> {/* Reducir el padding de p-6 a p-4 */}
        <div className="flex items-center space-x-4">
          {/* Barra de búsqueda  */}
          <input
            type="text"
            placeholder="Buscar"
            className="w-40 px-2 py-1 rounded bg-gray-200 text-gray-700 focus:outline-none"
          />

          {/* Logotipo */}
          <img
            src="ruta-de-tu-logotipo.png"
            alt="Tu logotipo"
            className="w-9 h-9"
          />
        </div>

        {/* Icono de logout  */}
        <button className="text-white">
          <FaSignOutAlt />
        </button>
      </div>

      <br />

      <div className="flex flex-grow">
        <div className="w-1/4 p-4 bg-gray-100 mr-4">
          {/* Encabezado de Chats en la barra lateral izquierda */}
          <div className="bg-gray-100 text-black flex items-center justify-between p-2 border-b border-gray-300">
            <h1 className="text-lg font-semibold">Chats</h1>
          </div>

          {/* Contenido de la barra lateral izquierda */
          chatList.map((chat, index) => (
            <div key={index} className="flex items-center p-2 cursor-pointer">
              <img src={chat.profilePicture} alt={`Foto de ${chat.name}`} className="w-12 h-12 rounded-full mr-2" />
              <span>{chat.name}</span>
            </div>
          ))}
        </div>

        <div className="w-3/4 flex flex-col">
          {/* Rectángulo superior */}
          <div className="bg-gray-100 h-16 text-black flex items-center justify-center">
            <p>Leon S Kennedy</p>
          </div>

          <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
            <div className="flex flex-col-reverse">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.sender === 'Tú' ? 'self-end message-bubble' : 'self-start message-bubble other'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>

          {/* Rectángulo inferior */}
          <div className="p-4 border-t bg-[#] text-gray mt-4">
            <input
              type="text"
              className="w-full py-2 px-3 rounded border border-gray-300"
              placeholder="Escribe tu mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="mt-2 bg-[#64DE92] hover:bg-[#397850] text-white py-2 px-4 rounded"
              onClick={handleSendMessage}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
