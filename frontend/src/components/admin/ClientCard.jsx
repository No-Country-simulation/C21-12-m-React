import {
  Card,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from '@mui/material';
import PropTypes from 'prop-types';

const clients = [
  { name: 'Tech Innovators', state: 'Contacto', priority: 'Alta' },
  { name: 'Global Solutions', state: 'Reunion', priority: 'Media' },
  { name: 'Creative Studio', state: 'Propuesta', priority: 'Alta' },
];

const StateChips = ({ state }) => {
  const colorPalette = {
    Contacto: '#E0E0E0',
    Reunion: '#E0E0E0',
    Propuesta: '#E0E0E0',
  };

  return (
    <Chip
      label={state}
      size="small"
      avatar={<Avatar>{state[0]}</Avatar>}
      sx={{
        backgroundColor: colorPalette[state],
        color: '#000',
        fontWeight: 500,
        fontSize: '12px',
        marginRight: '8px',
      }}
    />
  );
};

StateChips.propTypes = {
  state: PropTypes.string.isRequired,
};

const PriorityChip = ({ priority }) => {
  const colorPalette = {
    Alta: '#ff6347', // Rojo tomate
    Media: '#ffa500', // Naranja
    Baja: '#87ceeb',  // Azul claro
  };

  return (
    <Chip
      label={priority}
      size="small"
      variant="outlined"
      sx={{
        color: colorPalette[priority],
        borderColor: colorPalette[priority],
        fontWeight: 500,
        fontSize: '12px',
        backgroundColor: 'white',
      }}
    />
  );
};

PriorityChip.propTypes = {
  priority: PropTypes.string.isRequired,
};

function ClientsCard() {
  return (
    <Card
      sx={{
        width: 452,
        height: 296,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Clientes
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#7C4DFF', cursor: 'pointer', fontWeight: 500 }}
        >
          VER TODO
        </Typography>
      </Box>

      <Table sx={{ marginTop: '16px' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 500, color: '#616161' }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: 500, color: '#616161' }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 500, color: '#616161' }}>Prioridad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client, index) => (
            <TableRow key={index}>
              <TableCell>{client.name}</TableCell>
              <TableCell>
                <StateChips state={client.state} />
              </TableCell>
              <TableCell>
                <PriorityChip priority={client.priority} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography
        variant="caption"
        sx={{
          color: '#9E9E9E',
          marginTop: 'auto',
          textAlign: 'right',
          width: '100%',
        }}
      >
        Última actualización: 16/10/2024
      </Typography>
    </Card>
  );
}

ClientsCard.propTypes = {
  clients: PropTypes.array,
};

export default ClientsCard;
