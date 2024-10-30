import { Card, Typography, Button, Paper, Box } from '@mui/material';
import SlackIcon from '../../assets/admin/slack.png';
import NotionIcon from '../../assets/admin/notion.png';
import GoogleCalendarIcon from '../../assets/admin/calendar.png';

function ToolsCard() {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 0,
        width: '452px',
        height: '208px',
        
        borderRadius: '4px',
      }}
    >
      {/* Header */}
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
         
        }}
      >
       <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, paddingLeft:'20px' }}>
          Herramientas
        </Typography>
        <Button variant="text" sx={{ color: '#7C4DFF', cursor: 'pointer', fontWeight: 500 }}>
          Ver Todo
        </Button>
      </Box>
      </Paper>

      {/* Datos */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '100%',
          padding: '20px',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2)',
          gap: '16px',
        }}
      >
        {/* Individual Tool Box */}
        {[{name: 'Slack', icon: SlackIcon}, {name: 'Notion', icon: NotionIcon}, {name: 'Google Calendar', icon: GoogleCalendarIcon}].map((tool, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 8px',
              gap: '8px',
              width: '124px',
              height: '100px',
              border: '1px solid #E7E7E7',
              borderRadius: '8px',
            }}
          >
            <Box
              component="img"
              src={tool.icon}
              alt={`${tool.name} icon`}
              sx={{
                width: '40px',
                height: '40px',
              }}
            />
            <Typography variant="caption" sx={{ fontSize: '12px', color: '#121212' }}>
              {tool.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default ToolsCard;
