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
import { CustomerEditForm } from "./customerEditForm";
import { updateClient } from "../api/route";
import dayjs from "dayjs";

export const CustomerEditModal = ({ open, handleClose, data }) => {

	const editClientData = async (formData) => {
		const { id } = data;
		await updateClient(id, formData);
		
	};

	const handleSubmitForm = (formData) => {
		
		const formattedData = {
			...formData,
			ultimo_contacto: dayjs(formData.ultimo_contacto).toISOString(),
			expected_close: dayjs(formData.expected_close).toISOString(),
		};

		editClientData(formattedData);
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
						<img src={customerIcon} alt="Nuevo cliente" width="24" height="24" />

						<Typography variant="h6">Editar cliente</Typography>
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

				{open && (
					<DialogContent dividers>
						<CustomerEditForm onSubmit={handleSubmitForm} clientData={data} />
					</DialogContent>
				)}

				<DialogActions>
					<Button
						onClick={handleClose}
						color="inherit"
						sx={{ fontWeight: "600" }}
						variant="text"
					>
						Canselar
					</Button>
					<Button
						variant="contained"
						sx={{ backgroundColor: "#5a3fd1", color: "white" }}
						onClick={handleSaveClick}
					>
						Editar Cliente
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};


