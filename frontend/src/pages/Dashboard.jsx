import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import RecentTasksCard from '../components/admin/RecentCardTask';
import ClientsCard from '../components/admin/ClientCard';
import ProjectsCard from '../components/admin/ProyectCard';
import FinanceCard from '../components/admin/FinnanceCard';

function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '600px',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {/* Saludo de bienvenida */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', textAlign: isSmallScreen ? 'center' : 'left' }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Bienvenida, Olivia
          </Typography>
          <Typography variant="body2" sx={{ color: '#475467' }}>
            Siga, gestione y prevea sus clientes, pedidos y tareas.
          </Typography>
        </Box>
      </motion.div>

      {/* Primera fila de tarjetas */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          justifyContent: 'center',
          flexDirection: isTabletScreen ? 'column' : 'row',
          alignItems: 'center',
          maxWidth: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: isTabletScreen ? '100%' : '50%' }}
        >
          <RecentTasksCard />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: isTabletScreen ? '100%' : '50%' }}
        >
          <ClientsCard />
        </motion.div>
      </Box>

      {/* Segunda fila de tarjetas */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          justifyContent: 'center',
          flexDirection: isTabletScreen ? 'column' : 'row',
          alignItems: 'center',
          mt: 3,
          maxWidth: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ width: isTabletScreen ? '100%' : '50%' }}
        >
          <ProjectsCard />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ width: isTabletScreen ? '100%' : '50%' }}
        >
          <FinanceCard />
        </motion.div>
      </Box>
    </Box>
  );
}

export default Dashboard;
