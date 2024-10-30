import PropTypes from "prop-types";
import { TextField, MenuItem } from "@mui/material";

const EstadoSelect = ({ value, onChange, error, helperText }) => (
	<TextField
		label="Estado"
		id="estado-select"
		value={value}
		onChange={(e) => onChange(e.target.value)}
		select
		error={!!error}
		helperText={helperText}
		fullWidth
		sx={{ mt: 2 }}
	>
		<MenuItem value="Contacto">Contacto</MenuItem>
		<MenuItem value="Reunion">Reunion</MenuItem>
		<MenuItem value="Propuesta">Propuesta</MenuItem>
		<MenuItem value="Negociacion">Negociacion</MenuItem>
	</TextField>
);

EstadoSelect.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.bool,
	helperText: PropTypes.string,
};

export default EstadoSelect;
