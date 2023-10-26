import { useState, useEffect } from 'react';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  
  // Función para enviar un mensaje
  const sendMessage = (message) => {
    // Aquí puedes implementar la lógica para enviar un mensaje, por ejemplo, usando WebSockets o una API.
    // Después de enviar el mensaje, actualiza el estado de los mensajes.
    setMessages([...messages, { sender: 'Tú', text: message }]);
  };

  useEffect(() => {
    // Aquí puedes implementar la lógica para recibir mensajes entrantes, si es necesario.
  }, []);

  return { messages, sendMessage };
};

export default useChat;
