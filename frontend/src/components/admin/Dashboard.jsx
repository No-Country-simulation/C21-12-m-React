import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import RecentTasksCard from './RecentCardTask';
import ClientsCard from './ClientCard';
import ProjectsCard from './ProyectCard';
import FinanceCard from './FinnanceCard';

function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // para celulares
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('md')); // para tabletas

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '600px',
        overflowY: 'auto',
      }}
    >
      {/* Saludo de bienvenida */}
      <Box sx={{ mb: 3, textAlign: isSmallScreen ? 'center' : 'left', width: '100%' }}>
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
          justifyContent: isSmallScreen ? 'center' : 'flex-start',
          flexDirection: isTabletScreen ? 'column' : 'row',
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
          justifyContent: isSmallScreen ? 'center' : 'flex-start',
          mt: 3,
          flexDirection: isTabletScreen ? 'column' : 'row',
          alignItems: 'center',
        }}
      >
        <ProjectsCard />
        <FinanceCard />
      </Box>
    </Box>
  );
}

export default Dashboard;
