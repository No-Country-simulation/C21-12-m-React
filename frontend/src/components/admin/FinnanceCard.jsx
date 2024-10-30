import React from 'react';
import { Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Agosto', Ingresos: 40, Gastos: 30 },
  { name: 'Septiembre', Ingresos: 70, Gastos: 20 },
  { name: 'Octubre', Ingresos: 50, Gastos: 40 },
  { name: 'Noviembre', Ingresos: 60, Gastos: 30 },
  { name: 'Diciembre', Ingresos: 80, Gastos: 50 },
  { name: 'Enero', Ingresos: 50, Gastos: 20 },
  { name: 'Febrero', Ingresos: 60, Gastos: 30 },
];

const FinanceCard = () => {
  const [value, setValue] = React.useState('últimos 6 meses');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '520px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" paddingLeft="18px">
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '80%',
          }}
        >
          Finanzas
        </Typography>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Fecha</InputLabel>
          <Select value={value} onChange={handleChange} label="Fecha">
            <MenuItem value="últimos 6 meses">Últimos 6 meses</MenuItem>
            <MenuItem value="último año">Último año</MenuItem>
          </Select>
        </FormControl>
        <Button variant="text" sx={{ color: '#7C4DFF', cursor: 'pointer', fontWeight: 500 }}>
          VER TODO
        </Button>
      </Box>

      {/* Chart */}
      <Box sx={{ padding: '16px' }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ width:'90%',top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Ingresos" fill="#7E57C2" />
            <Bar dataKey="Gastos" fill="#4FC3F7" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          color: '#9E9E9E',
          marginTop: 'auto',
          textAlign: 'right',
          width: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        Última actualización: 16/10/2024
      </Typography>
    </Paper>
  );
};

export default FinanceCard;
