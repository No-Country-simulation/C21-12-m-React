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
import customerIcon from "../assets/icon-new-client.svg";
import CustomerDetailsForm from "./customerDetailsForm";
import { useState } from "react";

const CustomerModal = ({ open, handleClose }) => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [formErrors, setFormErrors] = useState({});

  const handleFormSubmit = (formData) => {
    console.log("Datos del formulario:", formData);
    handleClose();
  };

  const handleValidate = (errors) => {
    setFormErrors(errors);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Box display="flex" alignItems="center" gap={1}>
          <img src={customerIcon} alt="Nuevo cliente" width="24" height="24" />
          <Typography variant="h6">Nuevo cliente</Typography>
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
        <CustomerDetailsForm
          onSubmit={handleFormSubmit}
          onValidate={handleValidate}
        />
        {Object.keys(formErrors).length > 0 && (
          <Box sx={{ color: 'red', mt: 2 }}>
            <Typography variant="body2">
              Por favor, corrige los errores en el formulario.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}  color="black" sx={{fontWeight:'600'}} variant="text">
          Descartar
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#5a3fd1",}}
          onClick={() => handleFormSubmit()} 
        >
          Guardar Cliente
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CustomerModal;
