import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
	Divider,
	Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import customerIcon from "../assets/icon-new-client.svg";

export const ModalCustomerDetails = ({ open, customerDetails, handleClose }) => {
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
					<Box display="flex" alignItems="center" gap={3}>
						<img src={customerIcon} alt="Nuevo cliente" width="24" height="24" />

						<Typography variant="h6">Detalles cliente</Typography>

						<Typography variant="h6">
							<Chip
								label={customerDetails.nombre}
								color="default"
								size="small"
								variant="filled"
							/>
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
										<Typography>Nombre:</Typography>
										<Typography>{customerDetails.nombre}</Typography>
									</Grid>

									<Grid item xs={12} sm={6} md={3}>
										<Typography>Email:</Typography>
										<Typography>{customerDetails.email}</Typography>
									</Grid>

									<Grid item xs={12} sm={6} md={3}>
										<Typography>Teléfono:</Typography>
										<Typography>{customerDetails.telefono}</Typography>
									</Grid>

									<Grid item xs={12} sm={6} md={3}>
										<Typography>Origen:</Typography>
										<Typography>{customerDetails.origen}</Typography>
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
									<Grid item xs={12} sm={6} md={4}></Grid>

									<Grid item xs={12} sm={6} md={4}></Grid>

									<Grid item xs={12} sm={6} md={4}></Grid>

									<Grid item xs={12} sm={6} md={4}></Grid>

									<Grid item xs={12} sm={6} md={4}></Grid>
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

								<Grid container sx={{flexDirection: "column"}}>
									<Grid item xs={12} sm={6} md={4}>
										<Typography>Nombre:</Typography>
										<Typography>{customerDetails.nombre}</Typography>
									</Grid>

									<Grid item xs={12} sm={6} md={4}>
										<Typography>Nombre:</Typography>
										<Typography>{customerDetails.nombre}</Typography>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</LocalizationProvider>
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleClose}
						color="inherit"
						sx={{ fontWeight: "600" }}
						variant="text"
					>
						Cerrar
					</Button>
					<Button
						variant="contained"
						sx={{ backgroundColor: "#5a3fd1", color: "white" }}
						onClick={handleSaveClick}
					>
						Editar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

ModalCustomerDetails.propTypes = {
	open: PropTypes.bool.isRequired,
	customerDetails: PropTypes.object.isRequired,
	handleClose: PropTypes.func.isRequired,
};
