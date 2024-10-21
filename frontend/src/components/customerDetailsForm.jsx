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
  InputAdornment
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers';
import EncargadoSelect from "./ManagerSelect";
import { getAllManagers } from '../api/manager.service' // Ajusta la ruta según sea necesario

import { useState, useEffect } from "react";

const CustomerDetailsForm = ({ onSubmit }) => {
  const [lastContact, setLastContact] = useState();
  /* const [expectedClose, setExpectedClose]= useState(); */
  const [encargados, setEncargados] = useState([]);
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    const fetchEncargados = async () => {
      try {
        const response = await getAllManagers();
        console.log('Encargados:', response.data); // Verifica que se está accediendo correctamente a los datos
        setEncargados(response.data); // Asegúrate de acceder a response.data
      } catch (error) {
        console.error("Error al obtener los encargados:", error);
      }
    };
  
    fetchEncargados();
  }, []);
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
                  name="origen" // Nombre del campo "origen"
                  control={control}
                  defaultValue=""
                  rules={{ required: "El origen es requerido" }} // Validación requerida
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
                      {error && <FormHelperText>{error.message}</FormHelperText>} {/* Muestra mensaje de error */}
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
                  rules={{ required: "El estado es obligatorio" }}  // Agrega la validación requerida
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Estado"
                      error={!!error}
                      helperText={error ? error.message : "Situación actual del cliente"}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{ mt: 2 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="prioridad" // Asegúrate de usar este nombre de campo de forma consistente
                  control={control}
                  defaultValue=""
                  rules={{ required: "La prioridad es obligatoria" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Prioridad"
                      error={!!error}
                      helperText={error ? error.message : "Nivel de urgencia."}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{ mt: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
  <Controller
    name="encargadoId"
    control={control}
    defaultValue=""
    rules={{ required: "El encargado es requerido" }}
    render={({ field, fieldState: { error } }) => {
       // Verifica si la lista de encargados está llegando correctamente
      return (
        <EncargadoSelect
          value={field.value} // Valor actual del campo
          onChange={field.onChange} // Función para actualizar el valor
          encargados={encargados} // Lista de encargados
          error={!!error} // Si hay un error
          helperText={error ? error.message : "Persona responsable del cliente."} // Texto de ayuda
        />
      );
    }}
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
                <Controller
                  name="expected_close" // Nombre del campo esperado
                  control={control} // Control de react-hook-form
                  defaultValue={null} // Valor por defecto como null

                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
                      <DatePicker
                        label="Expectativa cierre"
                        value={value ? value : null} // Usa null si no hay valor
                        onChange={(newValue) => {
                          onChange(newValue); // Actualiza el valor en el formulario
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={!!error} // Muestra error si existe
                            helperText={error ? error.message : "Fecha estimada para cerrar."} // Mensaje de ayuda
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
          </Box>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default CustomerDetailsForm;
