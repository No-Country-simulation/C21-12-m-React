import {
  Card,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const clients = [
  { name: 'Tech Innovators', state: 'Contacto', priority: 'Alta' },
  { name: 'Global Solutions', state: 'Reunion', priority: 'Media' },
  { name: 'Creative Studio', state: 'Propuesta', priority: 'Baja' },
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
        color: '#424242',
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
    Alta: '#ff6347',
    Media: '#ffa500',
    Baja: '#87ceeb',
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
  const theme = useTheme();
  return (
    <Card
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 292, 
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
        [theme.breakpoints.up('md')]: {
          width: '80%',
          borderRadius: '5px',
        },
        [theme.breakpoints.up('lg')]: {
          width: 452,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '80%',
            mb: { xs: 1, sm: 0 },
          }}
        >
          Clientes
        </Typography>
        <Button
        component={Link}
  to="/clientes"
          variant="text"
          sx={{
            color: '#7C4DFF',
            cursor: 'pointer',
            fontWeight: 500,
            textAlign: { xs: 'center', sm: 'right' },
          }}
        >
          VER TODO
        </Button>
      </Box>

      <Table sx={{ my: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 500, color: '#616161', padding: '6px' }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: 500, color: '#616161', padding: '6px' }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 500, color: '#616161', padding: '6px' }}>Prioridad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client, index) => (
            <TableRow key={index} sx={{ borderBottom: '1px solid #E0E0E0' }}>
              <TableCell sx={{ padding: '6px' }}>{client.name}</TableCell>
              <TableCell sx={{ padding: '6px' }}>
                <StateChips state={client.state} />
              </TableCell>
              <TableCell sx={{ padding: '6px' }}>
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
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
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
