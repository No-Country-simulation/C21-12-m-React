import { Box, Typography, useMediaQuery } from '@mui/material';
import RecentTasksCard from './RecentCardTask';
import ClientsCard from './ClientCard';

function Dashboard() {
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Verifica si la pantalla es pequeña

  return (
    <Box sx={{ m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Saludo de bienvenida */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Bienvenida, Olivia
        </Typography>
        <Typography variant="body2" sx={{ color: '#475467' }}>
          Siga, gestione y prevea sus clientes, pedidos y tareas.
        </Typography>
      </Box>

      {/* Secciones de tarjetas */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          justifyContent: 'center',
          flexDirection: isSmallScreen ? 'column' : 'row', // Cambia a columna en pantallas pequeñas
          alignItems: 'center',
        }}
      >
        <RecentTasksCard />
        <ClientsCard />
      </Box>

      {/* Secciones adicionales abajo */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: 2,
          width: '100%',
          mt: 3,
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#f0f0f0',
            height: '200px',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Sección Adicional 1</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#e0e0e0',
            height: '200px',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Sección Adicional 2</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
