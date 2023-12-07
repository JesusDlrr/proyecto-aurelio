import React, { useState, useEffect, useContext } from 'react';
import UseChat from './useChat';
import './chat.modules.css';
import { FaImage, FaPaperPlane, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { NavBar } from '../nav_bar/Navbar';
import { useRef } from 'react';
import { Input } from '@material-tailwind/react';
import { IoIosClose } from 'react-icons/io';

export const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const { user } = useContext(UserContext);
  const [search_params] = useSearchParams();
  const [message_media, setMessageMedia] = useState([]);
  const file_input_ref = useRef(null);
  const [message_enabled, setMessageEnabled] = useState(false);
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

  const handleSetNewMessage = (value) => {
    setMessageEnabled(value.length > 0 || message_media.length > 0);
    setNewMessage(value);
  }

  const handleSendMessage = () => {
    if (message_enabled) {
      sendMessage(newMessage, message_media);
      setMessageMedia([]);
      setNewMessage('');
      setMessageEnabled(false);
    }
  };

  const handleSetMessageMedia = (file_list) => {
    setMessageMedia([...message_media, ...Array.from(file_list).map((file) => ({
      preview: URL.createObjectURL(file),
      file
    }))]);

    if (newMessage.length <= 0) {
      setMessageEnabled(true);
    }
  }

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
      <input type='file' ref={file_input_ref} accept='image/*,video/mp4' multiple hidden onChange={(e) => { handleSetMessageMedia(e.target.files) }} />
      <NavBar />
      <div className="flex flex-grow max-h-max overflow-hidden dark:bg-quick5">
        <div className="w-1/4 p-4 bg-gray-100 dark:bg-quick4 mr-4">
          {/* Encabezado de Chats en la barra lateral izquierda */}
          <div className="bg-gray-100 dark:bg-quick4 dark:text-white text-black flex items-center justify-between p-2 border-b border-quick5">
            <h1 className="text-lg font-semibold">Chats</h1>
          </div>
          {/* Contenido de la barra lateral izquierda */
            chatroom_list.map((chatroom) => (
              <div key={chatroom.id} className={`flex items-center gap-2 p-2 cursor-pointer dark:hover:bg-quick5`} onClick={() => { setChatroom(chatroom) }}>
                <div className='flex '>
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

        <div className="w-3/4 flex flex-col max-h-max overflow-hidden dark:bg-quick5">
          {/* Rectángulo superior */}
          <div className="bg-gray-100 dark:bg-quick4 dark:text-white h-16 shrink-0 text-black flex items-center justify-center dark:border-b dark:border-quick5">
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
                            <div className={`bg-black h-40 ${message.media.length > 1 ? 'w-40' : 'max-w-lg'}`}>
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
            <>
              <div className='flex'>
                {
                  message_media &&
                  message_media.map((media) => (
                    <div className='flex p-1'>
                      <img src={media.preview} className='rounded-md w-24 h-24' alt='' />
                      <span className='absolute text-white cursor-pointer p-1' >
                        <button
                          className="rounded relative h-8 max-h-[40px] w-8 max-w-[40px] select-none text-center align-middle font-sans text-xs font-medium uppercase dark:text-white transition-all hover:bg-gray-900/60 active:bg-gray-900/70 bg-gray-900/50 disabled:pointer-events-none disabled:opacity-80 disabled:shadow-none"
                          type="button"
                        // onClick={() => { removePostMedia(media.file.name) }}
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <IoIosClose size={40} />
                          </span>
                        </button>
                      </span>
                    </div>

                  ))
                }
              </div>
              <div className="flex gap-4 mt-4 mb-4 mr-4 bg-[#] text-gray">
                <button className="bg-[#64DE92] hover:bg-[#397850] text-white py-2 px-4 rounded flex items-center cursor-pointer" onClick={() => { file_input_ref.current.click() }}>
                  <FaImage />
                </button>
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded border border-gray-300"
                  placeholder="Escribe tu mensaje..."
                  value={newMessage}
                  onChange={(e) => handleSetNewMessage(e.target.value)}
                />
                <button className="bg-[#64DE92] disabled:bg-quick4 enabled:hover:bg-[#397850] text-white py-2 px-4 rounded" onClick={handleSendMessage} disabled={!message_enabled}>
                  <FaPaperPlane />
                </button>
              </div>
            </>
          }
        </div>
      </div>
    </div>

  );
};
