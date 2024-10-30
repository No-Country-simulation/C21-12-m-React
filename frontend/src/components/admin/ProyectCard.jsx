import { Typography, Box, Button, Divider, Paper } from '@mui/material';
import ToolsCard from './ToolsCard';

const ProjectsCard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Card de Proyectos */}
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 3,
          gap: 3,
          maxWidth: 452,
          height: 236,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2)',
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Proyectos
          </Typography>
          <Button variant="text" sx={{ color: '#7C4DFF', cursor: 'pointer', fontWeight: 500 }}>
            Ver Todo
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          {[
            { count: 5, label: 'Sin empezar', bgColor: '#E7E7E7', color: '#121212' },
            { count: 3, label: 'En progreso', bgColor: '#F1EEFE', color: '#2F2467' },
            { count: 4, label: 'En revisión', bgColor: '#E8FBFD', color: '#0A5962' },
            { count: 7, label: 'Listo', bgColor: '#F5FAE7', color: '#3F5608' },
          ].map((task, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px',
                gap: '8px',
                width: '89px',
                height: '84px',
                backgroundColor: task.bgColor || '#E7E7E7',
                borderRadius: '8px',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: task.color || '#121212',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '133.4%',
                }}
              >
                {task.count}
              </Typography>
              
              <Divider
                sx={{
                  width: '15px',
                  borderColor: task.color || '#121212',
                  border: '1px solid',
                }}
              />
              
              <Typography
                variant="body2"
                sx={{
                  color: task.color || '#121212',
                  fontWeight: 400,
                  fontSize: '12px',
                  textAlign: 'center',
                }}
              >
                {task.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Typography variant="caption" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            Última actualización: 28/10/2024
          </Typography>
        </Box>
      </Paper>

      {/* Card de Herramientas (ToolsCard) debajo de Proyectos */}
      <ToolsCard />
    </Box>
  );
};

export default ProjectsCard;
