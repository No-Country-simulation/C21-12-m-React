import { useState } from 'react';
import BotIcon from '../../assets/icon-chat/icon-bot.png'; 
import CloseIcon from '../../assets/icon-chat/icon-arrow-down.png';
import BubbleChatIcon from '../../assets/icon-chat/bubble-chat.svg';
import { Box } from '@mui/material';
import ChatBox from './ChatBox';

const HelpButtonWithIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Contenedor para el botón de ayuda y el ícono de chat */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          position: 'fixed',
          px: isChatOpen ? '0px' : '16px',
          py: isChatOpen ? '0px' : '4px',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          opacity: isChatOpen ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {/* Botón de ayuda que muestra la burbuja de chat */}
        <Box
          onClick={toggleChat}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: '16px',
            py: '4px',
            color: '#F1EEFE',
            borderRadius: '8px',
            cursor: 'pointer',
            position: 'relative',
            margin: 0,
            padding: 0,
          }}
        >
          {/* Muestra la burbuja de chat solo cuando el chat esté cerrado */}
          {!isChatOpen && (
            <Box
              component="img"
              src={BubbleChatIcon}
              alt="Chat Bubble Icon"
              sx={{
                width: '212px',
                height: '47px',
                position: 'relative',
                transform: 'translateX(-63px)',
              }}
            />
          )}
        </Box>

      </Box>

      {/* Ícono de bot o flecha hacia abajo, que permanece visible cuando el chat está abierto */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#7055F5',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          cursor: 'pointer',
          position: 'fixed', 
          bottom: '20px',
          right: '20px', 
          zIndex: 1001,
        }}
        onClick={toggleChat}
      >
        {/* Cambia entre el ícono del bot y la flecha dependiendo de si el chat está abierto o cerrado */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundImage: `url(${isChatOpen ? CloseIcon : BotIcon})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Box>

      {/* Chat Box desplegable */}
      {isChatOpen && (
        <ChatBox toggleChat={toggleChat} />
      )}
    </>
  );
};

export default HelpButtonWithIcon;
