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
  Select
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";

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
      helperText={error ? error.message : "Nombre del cliente o empresa"}
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
                      InputLabelProps={{ shrink: true }} // Asegúrate de que esto esté aquí

                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="telefono"
                  control={control}
                  defaultValue=""
                  rules={{ required: "El teléfono es requerido" }}
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
                      InputLabelProps={{ shrink: true }} // Asegúrate de que esto esté aquí

                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
              <Controller
                name="origen"
                control={control}
                defaultValue=""
                rules={{ required: "El origen es requerido" }} // Agrega validación si es necesario
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth error={!!error}>
                    <InputLabel id="origen-label">Origen</InputLabel>
                    <Select
                      labelId="origen-label"
                      {...field}
                      label="Origen"

                    >
                      <MenuItem value="contacto_directo">Contacto directo</MenuItem>
                      <MenuItem value="campana_marketing">Campaña de marketing</MenuItem>
                      <MenuItem value="recomendacion">Recomendación</MenuItem>
                      <MenuItem value="redes_sociales">Redes sociales</MenuItem>
                      <MenuItem value="otro">Otro</MenuItem>
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>} {/* Mensaje de error */}
                  </FormControl>
                )}
              />
            </Grid>
            </Grid>
          </Box>

         {/*  <Box
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
                <TextField
                  label="Estado"
                  InputLabelProps={{ shrink: true }}
                  id="outlined-size-small"
                  fullWidth
                  helperText="Situacion actual del cliente"
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Prioridad"
                  InputLabelProps={{ shrink: true }}
                  id="outlined-size-small"
                  fullWidth
                  helperText="Nivel de urgencia."
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Encargado"
                  InputLabelProps={{ shrink: true }}
                  id="outlined-size-small"
                  fullWidth
                  helperText="Persona responsable del cliente."
                  sx={{ mt: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <DatePicker
                    label="Último contacto"
                    value={lastContact}
                    onChange={(newValue) => setLastContact(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                  <FormHelperText>Fecha del último contacto.</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <DatePicker
                    label="Expectativa cierre"
                    value={expectedClose}
                    onChange={(newValue) => setExpectedClose(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                  <FormHelperText>Fecha estimada para cerrar.</FormHelperText>
                </FormControl>
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
            />{" "}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Valor estimado del proyecto"
                id="outlined-start-adornment"
                sx={{ my: 2, width: "25ch" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ fontWeight: "600px" }}
                      >
                        $
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Box> */}
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default CustomerDetailsForm;
