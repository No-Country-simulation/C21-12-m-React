import { Box, Typography, Grid, Card, CardContent, Divider, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { month: 'Ene', ingresos: 20000, gastos: 15000 },
  { month: 'Feb', ingresos: 25000, gastos: 17000 },
  { month: 'Mar', ingresos: 30000, gastos: 21000 },
  { month: 'Abr', ingresos: 22000, gastos: 18000 },
  { month: 'May', ingresos: 27000, gastos: 19000 },
  { month: 'Jun', ingresos: 32000, gastos: 23000 },
];

const FinancePage = () => {
  const theme = useTheme();
  const primaryColor = '#9f8df8';
  const secondaryColor = '#8d77f7';
  const tertiaryColor = '#7055f5';
  const accentColor = '#664ddf';
  const billscolor = '#4FC3F7';

  return (
    <Box sx={{ padding: 3, backgroundColor: theme.palette.background.default, maxHeight: '600px', overflowY: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Finanzas
      </Typography>

      <Grid container spacing={3}>
        {/* Balance General */}
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card sx={{ backgroundColor: primaryColor, color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>Balance General</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>$75,000</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Ingresos */}
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card sx={{ backgroundColor: secondaryColor, color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>Ingresos</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>$50,000</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Gastos */}
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card sx={{ backgroundColor: tertiaryColor, color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>Gastos</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>$25,000</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Gráfico de Ingresos y Gastos */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
            Tendencias Financieras Mensuales
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ingresos" stroke={primaryColor} strokeWidth={2} />
              <Line type="monotone" dataKey="gastos" stroke={billscolor} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </motion.div>

      <Divider sx={{ my: 3 }} />

      {/* Tabla de Transacciones */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
            Transacciones Recientes
          </Typography>
          <Box
            component="table"
            sx={{
              width: '100%',
              borderSpacing: 0,
              '& th, & td': { padding: 1.5, borderBottom: `1px solid ${accentColor}` },
              '& th': { color: tertiaryColor, fontWeight: 'bold' },
            }}
          >
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01/10/2024</td>
                <td>Venta de Productos</td>
                <td style={{ color: primaryColor }}>Ingreso</td>
                <td style={{ color: primaryColor }}>+ $5,000</td>
              </tr>
              <tr>
                <td>05/10/2024</td>
                <td>Compra de Suministros</td>
                <td style={{ color: secondaryColor }}>Gasto</td>
                <td style={{ color: secondaryColor }}>- $1,500</td>
              </tr>
              <tr>
                <td>10/10/2024</td>
                <td>Servicio de Consultoría</td>
                <td style={{ color: primaryColor }}>Ingreso</td>
                <td style={{ color: primaryColor }}>+ $3,000</td>
              </tr>
            </tbody>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default FinancePage;
