/* eslint-disable react/prop-types */
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import customerIcon from "../assets/icon-new-client.svg";
import CustomerDetailsForm from "./customerDetailsForm";

const CustomerModal = ({ open, handleClose, onSave }) => {
	const handleSubmitForm = (data) => {
		data.ultimo_contacto = data.ultimo_contacto
			? data.ultimo_contacto.toISOString()
			: null;
		data.expected_close = data.expected_close
			? data.expected_close.toISOString()
			: null;

		onSave(data);
		handleClose();
	};

	const handleSaveClick = () => {
		const form = document.getElementById("customer-form");
		if (form) {
			form.requestSubmit();
		}
	};

	return (
		<>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">

					<Box display="flex" alignItems="center" gap={1}>
						<img
							src={customerIcon}
							alt="Nuevo cliente"
							width="24"
							height="24"
						/>

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
					<CustomerDetailsForm onSubmit={handleSubmitForm} />
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleClose}
						color="inherit"
						sx={{ fontWeight: "600" }}
						variant="text"
					>
						Descartar
					</Button>
					<Button
						variant="contained"
						sx={{ backgroundColor: "#5a3fd1", color: "white" }}
						onClick={handleSaveClick}
					>
						Guardar Cliente
					</Button>
				</DialogActions>

			</Dialog>
		</>
	);
};

export default CustomerModal;
