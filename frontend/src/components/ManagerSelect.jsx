import PropTypes from 'prop-types';
import { MenuItem, TextField } from "@mui/material";

const EncargadoSelect = ({ value, onChange, encargados, error, helperText }) => {
  return (
    <TextField
    label="Encargado"
    id="encargado-select"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    size="small"
    select
    error={!!error}
    helperText={helperText}
    sx={{
      flex: 1,
      minWidth: "150px",
    }}
  >
    {Array.isArray(encargados) && encargados.length > 0 ? (
      encargados.map((encargado) => (
        <MenuItem key={encargado._id} value={encargado._id}>
          <img
            src={encargado._imageUrl}
            alt={encargado._name}
            style={{ width: 24, height: 24, borderRadius: '50%', marginRight: '8px' }}
          />
          {encargado._name}
        </MenuItem>
      ))
    ) : (
      <MenuItem value="" disabled>
        No hay encargados disponibles
      </MenuItem>
    )}
  </TextField>
  
  );
};

EncargadoSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  encargados: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _name: PropTypes.string.isRequired,
      _imageUrl: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string
};

export default EncargadoSelect;
