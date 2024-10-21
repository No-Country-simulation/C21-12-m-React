/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  InputAdornment,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

const CustomerDetailsForm = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form id="customer-form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Box
            sx={{
              border: "1px solid #E0E0E0",
              p: 2,
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "#7055F5", m: "2" }}>
              Datos personales
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="nombre"
                  control={control}
                  defaultValue=""
                  rules={{ required: "El nombre es requerido" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Nombre"
                      error={!!error}
                      helperText={
                        error ? error.message : "Nombre del cliente o empresa"
                      }
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "El email es requerido",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email inválido",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Email"
                      error={!!error}
                      helperText={
                        error ? error.message : "Correo electrónico válido."
                      }
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="telefono"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "El teléfono es requerido",
                    pattern: {
                      value: /^\+\d{9,15}$/,
                      message:
                        "El teléfono debe estar en formato internacional, comenzando con un '+' y seguido de entre 9 y 15 dígitos.",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Teléfono"
                      error={!!error}
                      helperText={
                        error
                          ? error.message
                          : "Número de contacto con código de país."
                      }
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="origen"
                  control={control}
                  defaultValue=""
                  rules={{ required: "El origen es requerido" }}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel id="origen-label">Origen</InputLabel>
                      <Select labelId="origen-label" {...field} label="Origen">
                        <MenuItem value="contacto directo">
                          Contacto directo
                        </MenuItem>{" "}
                        {/* Corrige este valor */}
                        <MenuItem value="campaña marketing">
                          Campaña de marketing
                        </MenuItem>{" "}
                        {/* Corrige este valor */}
                        <MenuItem value="referencia">Referencia</MenuItem>{" "}
                        {/* Cambiado a un valor válido */}
                        <MenuItem value="otro">Otro</MenuItem>
                      </Select>
                      {error && (
                        <FormHelperText>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              border: "1px solid #E0E0E0",
              p: 2,
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "#7055F5", m: "2" }}>
              Seguimiento
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="estado"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Estado"
                      error={!!error}
                      InputLabelProps={{ shrink: true }}
                      id="outlined-size-small"
                      fullWidth
                      helperText="Situación actual del cliente"
                      sx={{ mt: 2 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="prioridad"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Prioridad"
                      error={!!error}
                      InputLabelProps={{ shrink: true }}
                      id="outlined-size-small"
                      fullWidth
                      helperText="Nivel de urgencia."
                      sx={{ mt: 2 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="encargado"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "El encargado es obligatorio.",
                    minLength: {
                      value: 3,
                      message: "Debe tener al menos 3 caracteres.",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Encargado"
                      error={!!error}
                      helperText={
                        error
                          ? error.message
                          : "Persona responsable del cliente."
                      }
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="ultimo_contacto"
                  control={control}
                  defaultValue={null} // inicializar en null como en el backend
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <DatePicker
                        label="Último contacto"
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!error}
                            helperText={
                              error
                                ? error.message
                                : "Fecha del último contacto."
                            }
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="expected_close" // Nombre correcto según el backend
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: "La fecha de cierre estimada es obligatoria.",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <DatePicker
                        label="Expectativa cierre"
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!error}
                            helperText={
                              error
                                ? error.message
                                : "Fecha estimada para cerrar."
                            }
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              border: "1px solid #E0E0E0",
              p: 2,
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "#7055F5", m: "2" }}>
              Información adicional
            </Typography>
            <Divider sx={{ my: 2 }} />
            <TextField
              label="Proyectos"
              InputLabelProps={{ shrink: true }}
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              helperText="Descripción breve del proyecto."
            />

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="valor_estimado" // Asegúrate de usar el nombre correcto
                control={control}
                defaultValue=""
                rules={{ required: "El valor estimado es obligatorio." }} // Validación
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Valor estimado del proyecto"
                    id="outlined-start-adornment"
                    sx={{ my: 2, width: "100%" }} // Ajusta el ancho según lo necesites
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    error={!!error} // Muestra error si existe
                    helperText={
                      error ? error.message : "Ingrese el valor estimado."
                    } // Mensaje de ayuda
                  />
                )}
              />
            </Grid>
          </Box>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default CustomerDetailsForm;
