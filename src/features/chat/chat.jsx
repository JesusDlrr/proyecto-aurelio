import React, { useState, useEffect } from 'react';
import UseChat from './UseChat';
import './chat.modules.css';

export const Chat = () => {
  const { messages, sendMessage } = UseChat();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  useEffect(() => {
    // Puedes implementar lógica adicional aquí, como desplazarte automáticamente al último mensaje.
  }, [messages]);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Rectángulo superior */}
      <div className="bg-blue-500 h-16 text-white flex items-center justify-center">
        <p>Rectángulo superior</p>
      </div>

      {/* Área de chat */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === 'Tú' ? 'text-right' : 'text-left'}`}
          >
            <span className="font-bold">{message.sender}:</span> {message.text}
          </div>
        ))}
      </div>

      {/* Rectángulo inferior */}
      <div className="p-4 border-t bg-blue-500 text-black">
        <input
          type="text"
          className="w-full py-2 px-3 rounded border border-gray-300"
          placeholder="Escribe tu mensaje..."
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

;
