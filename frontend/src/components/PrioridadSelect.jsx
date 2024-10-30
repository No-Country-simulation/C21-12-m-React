import PropTypes from "prop-types";
import { TextField, MenuItem } from "@mui/material";

const PrioridadSelect = ({ value, onChange, error, helperText }) => (
	<TextField
		label="Prioridad"
		id="prioridad-select"
		value={value}
		onChange={(e) => onChange(e.target.value)}
		select
		error={!!error}
		helperText={helperText}
		fullWidth
		sx={{ mt: 2 }}
	>
		<MenuItem value="alta">Alta</MenuItem>
		<MenuItem value="media">Media</MenuItem>
		<MenuItem value="baja">Baja</MenuItem>
	</TextField>
);

PrioridadSelect.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.bool,
	helperText: PropTypes.string,
};

export default PrioridadSelect;
