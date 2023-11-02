import React, { useState, useEffect, useContext } from 'react';
import UseChat from './useChat';
import './chat.modules.css';
import { FaPaperPlane, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { NavBar } from '../nav_bar/Navbar';

export const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const { user } = useContext(UserContext);
  const [search_params] = useSearchParams();
  const {
    messages,
    sendMessage,
    chat_list,
    chat_name
  } = UseChat();

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
      <NavBar />
      <div className="flex flex-grow">
        <div className="w-1/4 p-4 bg-gray-100 mr-4">
          {/* Encabezado de Chats en la barra lateral izquierda */}
          <div className="bg-gray-100 text-black flex items-center justify-between p-2 border-b border-gray-300">
            <h1 className="text-lg font-semibold">Chats</h1>
          </div>

          {/* Contenido de la barra lateral izquierda */
            chat_list.map((chat, index) => (
              <div key={index} className="flex items-center p-2 cursor-pointer" onClick={() => { navigation("/dms?to=" + chat.uid); window.location.reload(); }}>
                <img src={chat.avatar} alt={`Foto de ${chat.name}`} className="w-12 h-12 rounded-full mr-2" />
                <span>{chat.name}</span>
              </div>
            ))}
        </div>

        <div className="w-3/4 flex flex-col">
          {/* Rectángulo superior */}
          <div className="bg-gray-100 h-16 text-black flex items-center justify-center">
            <p>{user.uid === search_params.get("to") ? "Select a user to start a conversation" : chat_name}</p>
          </div>

          <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
            <div className="flex flex-col-reverse">
              {messages.sort((a, b) => {
                return b.date.seconds - a.date.seconds;
              }).map((message, index) => (
                <>
                  <div key={index} className={`mb-2 ${message.from.id === user.uid ? 'self-end message-bubble' : 'self-start message-bubble other'}`}>
                    {message.text}
                    {/* <div className={message.from.id === user.uid ? 'self-end' : 'self-start other'}>{message.date.seconds}</div> */}
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* Rectángulo inferior */}
          {user.uid !== search_params.get("to") &&
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
          }
        </div>
      </div>
    </div>

  );
};
