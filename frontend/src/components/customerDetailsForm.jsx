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

  const { control, handleSubmit } = useForm();
  const [encargados, setEncargados] = useState([]);
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const managers = await getListOfManagers();
        setEncargados(managers);
      } catch (error) {
        console.log("Error al traer los encargados:", error);
      }
    };
    fetchManagers();
  }, []);

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

                    </FormControl>
                  )}
                />
              </Grid>

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

                      sx={{ mt: 2 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Controller

                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Prioridad"
                      error={!!error}

                      sx={{ mt: 2 }}
                    />
                  )}
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
              </Grid> */}
                  <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="ultimo_contacto" // Nombre correcto según el backend
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: "Fecha de ultimo contacto",
                  }}
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
                                : "Fecha de último contacto."
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

                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth

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

          </Box>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default CustomerDetailsForm;
