/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  debounce,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CustomerModal from "./customerModal";
import { createClient, searchClients } from "../api/route";
import axios from "axios";

const CostumerForm = () => {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  const currencies = [
    { label: "Contacto", value: "Contacto" },
    { label: "Reunion", value: "Reunion" },
    { label: "Propuesta", value: "Propuesta" },
    { label: "Negociacion", value: "Negociacion" },
  ];

  const currenciesStatus = [
    { label: "Alta", value: "Alta" },
    { label: "Media", value: "Media" },
    { label: "Baja", value: "Baja" },
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
      await createClient(data);
      setAlertVisible(true);
      handleClose();

      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Error al crear cliente:", error);
      setErrorAlert(true);
      handleClose();

      setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
    }
  };
  const handleSearch = async () => {
    console.log("Buscando clientes con:", { nombre, estado, prioridad });
    try {
      const result = await searchClients({ nombre, estado, prioridad });
      setFilteredClients(result); 
    } catch (error) {
      console.error("Error al buscar clientes", error);
    }
  };


  useEffect(() => {
    const source = axios.CancelToken.source(); 
    const fetchFilteredClients = debounce(async () => {
      console.log("Parámetros de búsqueda:", { nombre, estado, prioridad });
      await handleSearch();
    }, 500);

    fetchFilteredClients();

    return () => {
      source.cancel("Operación cancelada por el usuario."); 
    };
  }, [nombre, estado, prioridad]);
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
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
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
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
          <Box>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <div key={client.id}>
                  {client.nombre} - {client.estado} - {client.prioridad}
                </div>
              ))
            ) : (
              <p>
                No se encontraron clientes que coincidan con los criterios de
                búsqueda.
              </p>
            )}
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6f52ed",
            borderRadius: "8px",
            fontSize: "14px",
            paddingY: 1,
            marginRight: 4,
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

      {alertVisible && (
        <Alert severity="success">
          <AlertTitle sx={{ fontWeight: "600" }}>
            Cliente guardado exitosamente.
          </AlertTitle>
          El nuevo cliente ha sido agregado correctamente. Puedes comenzar a
          gestionarlo desde la lista de clientes.
        </Alert>
      )}

      {errorAlert && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle sx={{ fontWeight: "600" }}>
            Error al guardar cliente.
          </AlertTitle>
          Hubo un problema al guardar el nuevo cliente. Por favor, revisa los
          datos ingresados y vuelve a intentarlo. Si el problema persiste,
          contacta al soporte técnico.
        </Alert>
      )}

      <CustomerModal
        open={open}
        handleClose={handleClose}
        onSave={handleSave}
      />
    </Box>
  );
};

export default CostumerForm;
