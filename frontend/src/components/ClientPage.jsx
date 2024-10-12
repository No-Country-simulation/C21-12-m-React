import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { PeopleAltOutlined as PeopleAltOutlinedIcon } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
const ClientPage = () => {
  const currencies = [
    { label: "Contacto", value: "contacto" },
    { label: "Reunion", value: "reunion" },
    { label: "Propuesta", value: "propuesta" },
    { label: "Negociacion", value: "negociacion" },
  ];
  const currenciesStatus = [
    { label: "Alta", value: "alta" },
    { label: "Media", value: "media" },
    { label: "Baja", value: "baja" },
  ];
  return (
    <Box sx={{ m: 2 }}>
      <Box display="flex" alignItems="left" sx={{ color: "#2f2467", my: 4 }}>
        <PeopleAltOutlinedIcon sx={{ mr: 2, fontSize: 40 }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Clientes
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        sx={{ mb: 4 }}
      >
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <TextField
            label="Buscar"
            placeholder="Nombre, email, etc..."
            InputLabelProps={{ shrink: true }}
            id="outlined-size-small"
            size="small"
            sx={{
              flex: 1,
              minWidth: "200px",
              width: { xs: "100%", sm: "40%" },
            }}
          />
          <TextField
            label="Estado"
            id="outlined-size-small"
            defaultValue="contacto"
            size="small"
            select
            sx={{
              flex: 1,
              minWidth: "150px",
              width: { xs: "100%", sm: "30%" },
            }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Prioridad"
            id="outlined-size-small"
            defaultValue="alta"
            size="small"
            select
            sx={{
              flex: 1,
              minWidth: "150px",
              width: { xs: "100%", sm: "30%" },
            }}
          >
            {currenciesStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6f52ed",
            borderRadius: "8px",
            fontSize: "14px",
            ml: "auto", // Esto empuja el botón hacia la derecha
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": {
              backgroundColor: "#5a3fd1",
            },
          }}
        >
          Nuevo Cliente
          <AddIcon></AddIcon>
        </Button>
      </Box>
    </Box>
  );
};

export default ClientPage;