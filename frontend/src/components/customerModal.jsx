/* eslint-disable react/prop-types */
import {
    Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import customerIcon from "../assets/icon-new-client.svg"; // Importar el SVG como una imagen
const CustomerModal = ({ open, handleClose }) => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
      <Box display="flex" alignItems="center" gap={1}>
              <img src={customerIcon} alt="Nuevo cliente" width="24" height="24" /> {/* Mostrar el SVG como imagen */}
              <Typography variant="h6">
                Nuevo cliente
              </Typography>
            </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Aquí va el formulario para agregar un nuevo cliente.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Guardar cambios
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
export default CustomerModal;
