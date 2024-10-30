import { Box, Typography, useMediaQuery } from '@mui/material';
import RecentTasksCard from './RecentCardTask';
import ClientsCard from './ClientCard';
import ProjectsCard from './ProyectCard';
import FinanceCard from './FinnanceCard';

function Dashboard() {
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Verifica si la pantalla es pequeña

  return (
    <Box sx={{ m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center',maxHeight: '600px',overflowY: 'auto' }}>
      {/* Saludo de bienvenida */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Bienvenida, Olivia
        </Typography>
        <Typography variant="body2" sx={{ color: '#475467' }}>
          Siga, gestione y prevea sus clientes, pedidos y tareas.
        </Typography>
      </Box>

      {/* Primera fila de tarjetas */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          justifyContent: 'flex-start',
          flexDirection: isSmallScreen ? 'column' : 'row',
          alignItems: 'center',
        }}
      >
        <RecentTasksCard />
        <ClientsCard />
      </Box>

      {/* Segunda fila de tarjetas */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          mt: 3,
          flexDirection: isSmallScreen ? 'column' : 'row',
          alignItems: 'center'
        }}
      >
        <ProjectsCard />
        <FinanceCard />
      </Box>
    </Box>
  );
}

export default Dashboard;
