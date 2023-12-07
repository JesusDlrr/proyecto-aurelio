import React, { useState, useEffect, useContext } from 'react';
import UseChat from './useChat';
import './chat.modules.css';
import { FaImage, FaPaperPlane, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { NavBar } from '../nav_bar/Navbar';
import { useRef } from 'react';
import { Input } from '@material-tailwind/react';

export const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const { user } = useContext(UserContext);
  const [search_params] = useSearchParams();
  const [message_media, setMessageMedia] = useState([]);
  const file_input_ref = useRef(null);
  const {
    messages,
    sendMessage,
    chat_list,
    new_recipient,
    chatroom,
    chatroom_list,
    chat_name,
    getChatName,
    setChatName,
    getMessages,
    getChatrooms,
    setChatroom,
    openChatroomListener
  } = UseChat();

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      console.log(message_media)
      sendMessage(newMessage, message_media);
      setMessageMedia([]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (chatroom !== null) {
      if (chatroom.name == null) {
        if (chatroom.participants.length > 2) {
          setChatName(chatroom.participants.map(({ name }) => (name)).join(", "));
        } else {
          setChatName(chatroom.participants.filter(({ id }) => (id !== user.uid))[0].name);
        }
      } else {
        setChatName(chatroom.name);
      }
    }
  }, [chatroom])

  useEffect(() => {
  }, []);

  useEffect(() => {
    getMessages();
    // getChatName();
  }, [search_params]);

  return (
    <div className="w-full h-screen flex flex-col">
      <input type='file' ref={file_input_ref} accept='image/*,video/mp4' multiple hidden onChange={(e) => { setMessageMedia(...message_media, Array.from(e.target.files)) }} />
      <NavBar />
      <div className="flex flex-grow max-h-max overflow-hidden dark:bg-zinc-500">
        <div className="w-1/4 p-4 bg-gray-100 dark:bg-zinc-700 mr-4">
          {/* Encabezado de Chats en la barra lateral izquierda */}
          <div className="bg-gray-100 dark:bg-zinc-700 dark:text-white text-black flex items-center justify-between p-2 border-b border-gray-300">
            <h1 className="text-lg font-semibold">Chats</h1>
          </div>
          {/* Contenido de la barra lateral izquierda */
            chatroom_list.map((chatroom) => (
              <div key={chatroom.id} className={`flex items-center gap-2 p-2 cursor-pointer`} onClick={() => { setChatroom(chatroom) }}>
                <div className='flex'>
                  {
                    chatroom.participants.length > 2 ?
                      chatroom.participants.slice(0, 2).map(({ profile_picture }) => (
                        <img src={profile_picture} className='rounded-full w-10 h-10 last:-ml-4 border-2 border-gray-100' />
                      ))
                      :
                      <img src={chatroom.participants.filter(({ id }) => (id !== user.uid))[0].profile_picture} className='rounded-full w-10 h-10 border-2 border-gray-100' />
                  }
                </div>
                <p className='truncate dark:text-white'>
                  {
                    chatroom.participants.length > 2 ?
                      chatroom.participants.map(({ name }) => (name)).join(", ")
                      :
                      chatroom.participants.filter(({ id }) => (id !== user.uid))[0].name
                  }
                </p>
                {/* <div key={chatroom.id} className={`flex items-center p-2 cursor-pointer ${chat.uid === search_params.get("to") && "bg-blue-100"}`} onClick={() => { navigation("/dms?to=" + chat.uid); }}> */}
                {/* <img src={chat.avatar} alt={`Foto de ${chat.name}`} className="w-12 h-12 rounded-full mr-2" /> */}
                {/* <span>{chat.name}</span> */}
              </div>
            ))}
        </div>

        <div className="w-3/4 flex flex-col max-h-max overflow-hidden dark:bg-zinc-500">
          {/* Rectángulo superior */}
          <div className="bg-gray-100 dark:bg-zinc-700 dark:text-white h-16 shrink-0 text-black flex items-center justify-center">
            <p>{
              chatroom === null ?
                new_recipient ?
                  `Start a new chat with ${chat_name}`
                  :
                  "Select a chatroom to start chatting!"
                :
                chat_name
            }</p>
            {/* <p>{user.uid === search_params.get("to") ? "Select a user to start a conversation" : chat_name}</p> */}
          </div>
          <div className="p-4 grow bg-gray-100 dark:bg-neutral-800 overflow-y-auto">
            {
              chatroom === null ?
                <img src={'./quicker.png'} className='h-full w-full object-contain' />
                :
                <div className="flex flex-col-reverse">
                  {messages.map((message, index) => (
                    <>
                      <div key={index} className={`mb-2 ${message.from_user === user.uid ? 'self-end message-bubble' : 'self-start message-bubble other'}`}>
                        {message.message}
                        <div className={message.media.length > 1 && 'grid grid-cols-2 gap-1'}>
                          {message.media.slice(0, 4).map((file) => (
                            file.mimetype.split('/')[0] === 'image' &&
                            <div className={`bg-indigo-300 h-40 ${message.media.length > 1 ? 'w-40' : 'max-w-lg'}`}>
                              <img src={file.link} className='object-cover h-full w-full max-w-xs' />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
            }
          </div>

          {/* Rectángulo inferior */}
          {/* {user.uid !== search_params.get("to") && */}
          {(chatroom !== null || new_recipient) &&
            <div className="flex gap-4 mt-4 mb-4 mr-4 bg-[#] text-gray">
              <button className="bg-[#64DE92] hover:bg-[#397850] text-white py-2 px-4 rounded flex items-center cursor-pointer" onClick={() => { file_input_ref.current.click() }}>
                <FaImage />
              </button>
              <input
                type="text"
                className="w-full py-2 px-3 rounded border border-gray-300"
                placeholder="Escribe tu mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="bg-[#64DE92] hover:bg-[#397850] text-white py-2 px-4 rounded" onClick={handleSendMessage}>
                <FaPaperPlane />
              </button>
            </div>
          }
        </div>
      </div>
    </div>

  );
};
