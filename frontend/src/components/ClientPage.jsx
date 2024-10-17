import { PeopleAltOutlined as PeopleAltOutlinedIcon } from "@mui/icons-material";
import { Alert, Box, Typography } from "@mui/material";
import CustomerForm from "../components/costumerForm";
import { CustomerTable } from "./customerTable";
import { useState } from "react";
const ClientPage = () => {
  const [alertVisible, setAlertVisible] = useState(false); // Estado para manejar la visibilidad del Alert

  const handleSave = () => {
    setAlertVisible(true); // Muestra el Alert cuando se guarda el cliente
  };

  const handleCloseAlert = () => {
    setAlertVisible(false); // Cierra el Alert
  };
 return(
   <Box sx={{ m: 2 }}>
      <Box display="flex" alignItems="left" sx={{ color: "#2f2467", my: 4 }}>
        <PeopleAltOutlinedIcon sx={{ mr: 2, fontSize: 40 }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Clientes
        </Typography>
      </Box>
      <CustomerForm onSave={handleSave} />
      
      {/* Mostrar el Alert justo después del formulario */}
      {alertVisible && (
        <Alert 
          severity="success" 
          onClose={handleCloseAlert} 
          sx={{ mb: 2 }} // Margen en la parte inferior
        >
          ¡Cliente creado con éxito!
          <br />
          El nuevo cliente ha sido agregado correctamente. Puedes comenzar a gestionarlo desde la lista de clientes.
        </Alert>
      )}

      <CustomerTable />
      </Box>
 )
};

export default ClientPage;
