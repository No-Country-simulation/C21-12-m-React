import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import ChatHeader from './ChatHeader';
import SendIcon from '../../assets/icon-chat/button-send.svg'; 
import BotIcon from '../../assets/icon-chat/inside-bot.svg'; 
import { useChat } from '../../hooks/use.chat';

const ChatBox = ({ toggleChat }) => {
  const { message, setMessage, messages, sendMessage } = useChat();

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        width: '350px',
        height: '430px',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        opacity: '1',
        zIndex: 1000,
      }}
    >
      {/* Header del chat */}
      <ChatHeader toggleChat={toggleChat} />

      {/* Contenido del chat */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '10px 20px' }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          >
            {msg.sender === 'bot' && (
              <img
                src={BotIcon}
                alt="Bot"
                style={{
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                }}
              />
            )}
            <Box
              sx={{
                backgroundColor: msg.sender === 'user' ? '#E8E8E8' : '#D7CBF6',
                borderRadius: msg.sender === 'user' ? '10px 10px 0px 10px' : '10px 10px 10px 0',
                padding: '10px',
                maxWidth: '80%',
              }}
            >
              <Typography variant="body2" sx={{ color: '#000' }}>
                {msg.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Contenedor para el input y el botón */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        {/* Input para escribir el mensaje */}
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          value={message}
          onChange={handleInputChange}
          style={{
            flexGrow: 1,
            height: '40px',
            padding: '0 12px',
            borderRadius: '10px',
            border: '1px solid #ccc',
          }}
        />

        {/* Botón con ícono SVG */}
        <Box
          component="button"
          onClick={handleSend}
          sx={{
            width: '48px',
            height: '40px',
            marginLeft: '8px',
            border: 'none',
            borderRadius: '10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <img src={SendIcon} alt="Enviar" style={{ width: '48px', height: '40px' }} />
        </Box>
      </Box>
    </Box>
  );
};

// Definir los propTypes
ChatBox.propTypes = {
  toggleChat: PropTypes.func.isRequired,
};

export default ChatBox;
