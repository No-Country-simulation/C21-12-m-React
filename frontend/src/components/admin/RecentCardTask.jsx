import { Typography, Box, Button, Divider, Paper } from '@mui/material';

const RecentTasksCard = () => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 3,
        gap: 3,
        maxWidth: 500, // Cambiado para acortar el ancho
        width: '100%',
        height: 296,
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2)',
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Tareas Recientes
        </Typography>
        <Button variant="text" sx={{ color: '#7C4DFF', cursor: 'pointer', fontWeight: 500 }}>
          Ver Todo
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        {[
          { count: 12, label: 'Sin empezar', bgColor: '#E7E7E7', color: '#121212' },
          { count: 23, label: 'En progreso', bgColor: '#F1EEFE', color: '#2F2467' },
          { count: 2, label: 'En revisión', bgColor: '#E8FBFD', color: '#0A5962' },
          { count: 5, label: 'Listo', bgColor: '#F5FAE7', color: '#3F5608' },
        ].map((task, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
              gap: 1,
              width: '100%',
              maxWidth: 100, 
              height: 144,
              backgroundColor: task.bgColor,
              borderRadius: 1,
            }}
          >
            <Typography variant="h5" sx={{ color: task.color }}>
              {task.count}
            </Typography>
            <Divider sx={{ width: 15, borderColor: task.color }} />
            <Typography variant="body2" sx={{ color: task.color, textAlign: 'center' }}>
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
  );
};

export default RecentTasksCard;
