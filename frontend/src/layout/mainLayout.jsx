import Box from "@mui/material/Box";
import Sidebar from "../components/sidebar";
import { CssBaseline } from "@mui/material";
import HelpButtonWithIcon from "../components/chat/HelpButton"; // Asegúrate de que la ruta sea correcta
import PropTypes from "prop-types";

export const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "120vh", overflow: "hidden" }}>
      <CssBaseline />
      <Sidebar />
      
      {/* Agregar el botón de ayuda */}
      <HelpButtonWithIcon />

      {/* Aquí van los componentes hijos */}
      {children}
    </Box>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node, // children puede ser cualquier nodo React
};
