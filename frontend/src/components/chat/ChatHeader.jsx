import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import BotIcon from '../../assets/icon-chat/icon-bot-inside.svg'; 
import CloseIcon from '../../assets/icon-chat/icon-close.svg';

const ChatHeader = ({ toggleChat }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        gap: '16px',
        width: '350px',
        height: '56px',
        borderRadius: '8px',
        backgroundColor: '#7055F5',
        color: 'white',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src={BotIcon} alt="Bot Icon" style={{ width: '40px', height: '40px' }} />
        <Typography variant="h6" sx={{ fontSize: '20px' }}>
          ProBot
        </Typography>
      </Box>

      <Box
        sx={{
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '50%',
        }}
        onClick={toggleChat} // Llamada a la función para cerrar el chat
      >
        <img src={CloseIcon} alt="Close Icon" style={{ width: '32px', height: '32px' }} />
      </Box>
    </Box>
  );
};

// Definir las PropTypes
ChatHeader.propTypes = {
  toggleChat: PropTypes.func.isRequired, // toggleChat debe ser una función
};

export default ChatHeader;
