import { Alert, AlertTitle, Box, Button, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CustomerModal from "./customerModal";
import { createClient } from "../api/route";

const CostumerForm = () => {
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

  const [open, setOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (data) => {
    try {
      console.log("Guardando nuevo cliente:", data);

      // Validation (if necessary)
      if (!data.nombre || !data.email) {
        console.error("Missing required fields: name or email.");
        setErrorAlert(true);
        return;
      }

      await createClient(data);

      setAlertVisible(true);
      handleClose();

      // Hide success alert after 3 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Error al crear cliente:", error.response ? error.response.data : error.message);

      // Display error alert
      setErrorAlert(true);
      handleClose();

      // Hide error alert after 3 seconds
      setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        sx={{ mb: 4 }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          component="form"
        >
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

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6f52ed",
              borderRadius: "8px",
              fontSize: "14px",
              ml: "auto",
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                backgroundColor: "#5a3fd1",
              },
            }}
            onClick={handleClickOpen}
          >
            Nuevo Cliente
            <AddIcon />
          </Button>
        </Box>
      </Box>
      
      {alertVisible && (
        <Alert severity="success">
          <AlertTitle sx={{ fontWeight: "600" }}>
            Cliente guardado exitosamente.
          </AlertTitle>
          El nuevo cliente ha sido agregado correctamente. Puedes comenzar a gestionarlo desde la lista de clientes.
        </Alert>
      )}

      {errorAlert && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle sx={{ fontWeight: "600" }}>Error al guardar cliente.</AlertTitle>
          Hubo un problema al guardar el nuevo cliente. Por favor, revisa los datos ingresados y vuelve a intentarlo. Si el problema persiste, contacta al soporte técnico.
        </Alert>
      )}

      <CustomerModal open={open} handleClose={handleClose} onSave={handleSave} />
    </Box>
  );
};

export default CostumerForm;
