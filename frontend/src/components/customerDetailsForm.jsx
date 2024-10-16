import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const CustomerDetailsForm = () => {
  const [lastContact, setLastContact] = useState(null);
  const [expectedClose, setExpectedClose] = useState(null); // Estado separado para "Expectativa de cierre"

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <TextField
                required
                label="Nombre"
                InputLabelProps={{ shrink: true }}
                id="outlined-size-small"
                sx={{
                  flex: 1,
                  minWidth: "200px",
                  width: { xs: "100%", sm: "40%" },
                }}
                helperText="Nombre del cliente o empresa."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                required
                label="Email"
                InputLabelProps={{ shrink: true }}
                id="outlined-size-small"
                sx={{
                  flex: 1,
                  minWidth: "200px",
                  width: { xs: "100%", sm: "40%" },
                }}
                helperText="Correo electrónico válido."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Telefono"
                InputLabelProps={{ shrink: true }}
                id="outlined-size-small"
                sx={{
                  flex: 1,
                  minWidth: "200px",
                  width: { xs: "100%", sm: "40%" },
                }}
                helperText="Número de contacto con código de país."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Origen"
                InputLabelProps={{ shrink: true }}
                id="outlined-size-small"
                sx={{
                  flex: 1,
                  minWidth: "200px",
                  width: { xs: "100%", sm: "40%" },
                }}
                helperText="Selecciona la fuente del cliente"
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
                    <InputAdornment position="start" sx={{fontWeight:'600px'}}>$</InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomerDetailsForm;
