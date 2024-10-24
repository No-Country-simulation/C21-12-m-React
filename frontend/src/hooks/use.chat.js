import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://c21-12-m-react.onrender.com/');  // Usa la URL correcta de tu backend

export const useChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Verificar la conexión al servidor
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });

    // Escuchar el evento de bienvenida
    socket.on('welcome', (message) => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: message }]);
    });

    // Escuchar respuestas del servidor (chatbot)
    socket.on('response', (message) => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: message }]);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.IO');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('welcome');
      socket.off('response');
    };
  }, []);

  // Enviar mensaje al servidor
  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: message }]);
      socket.emit('message', message);  // Emitir evento 'message' al backend
      setMessage('');
    }
  };

  return {
    message,
    setMessage,
    messages,
    sendMessage,
  };
};
