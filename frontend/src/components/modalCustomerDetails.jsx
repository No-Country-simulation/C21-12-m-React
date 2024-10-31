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
	Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import customerIcon from "../assets/icon-new-client.svg";
import { useEffect } from "react";

const labelChipFormatter = (label) => {
	return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
}

function PriorityChips(props) {
	const { prioridad } = props;

	const formattedLabel = prioridad.charAt(0).toUpperCase() + prioridad.slice(1).toLowerCase();

	const colorPalette = { ALTA: "error", MEDIA: "warning", BAJA: "info" };

	return (
		<Box>
			<Chip
				label={formattedLabel}
				color={colorPalette[prioridad]}
				size="small"
			/>
		</Box>
	);
}

PriorityChips.propTypes = {
	prioridad: PropTypes.string,
};

function formatDateTime(dateString) {
	// Crear un objeto Date a partir de la cadena de fecha ISO
	const date = new Date(dateString);

	// Configurar las opciones de formato
	const options = {
		month: "2-digit",
		day: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	};

	// Formatear la fecha con las opciones establecidas
	return date.toLocaleString("en-US", options);
}

function StateChips(props) {
	const { estado } = props;

	const statusChipData = [
		{ label: "CONTACTO", position: 1 },
		{ label: "REUNION", position: 2 },
		{ label: "PROPUESTA", position: 3 },
		{ label: "NEGOCIACION", position: 4 },
		{ label: "CERRADO", position: 5 },
	];

	let renderMore = true;

	return (
		<Box sx={{ display: "flex", gap: "1rem" }}>
			{statusChipData.map((statusData) => {
				if (!renderMore) return null; // Detener el renderizado si renderMore es falso

				const formattedLabel = labelChipFormatter(statusData.label);

				const isSelected = estado === statusData.label;

				// Cambia renderMore a false si se encuentra el estado
				if (isSelected) renderMore = false;

				return (
					<Chip
						key={statusData.position}
						label={formattedLabel}
						sx={isSelected ? { background: "#7055F5", color: "#FFFFFF" } : {}}
						size="small"
						variant="filled"
						avatar={
							<Avatar
								style={{
									background: isSelected ? "#503CAE" : undefined,
									color: isSelected ? "#fff" : undefined,
								}}
							>
								{statusData.position}
							</Avatar>
						}
					/>
				);
			})}
		</Box>
	);
}

StateChips.propTypes = {
	estado: PropTypes.object.isRequired,
};

export const ModalCustomerDetails = ({ open, customerDetails, handleClose }) => {
	const handleSaveClick = () => {
		const form = document.getElementById("customer-form");
		if (form) {
			form.requestSubmit();
		}
	};

	useEffect(() => {
		console.log(customerDetails);
	}, [customerDetails]);

	const currencyFormatter = (value) => {
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		});
		return formatter.format(value);
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
										<Typography variant="body2" sx={{ color: "#757575" }}>
											Nombre:
										</Typography>
										<Typography>{customerDetails.nombre}</Typography>
									</Grid>

									<Grid item xs={12} sm={6} md={3}>
										<Typography variant="body2" sx={{ color: "#757575" }}>
											Email:
										</Typography>
										<Typography>{customerDetails.email}</Typography>
									</Grid>

									<Grid item xs={12} sm={6} md={3}>
										<Typography variant="body2" sx={{ color: "#757575" }}>
											Teléfono:
										</Typography>
										<Typography>{customerDetails.telefono}</Typography>
									</Grid>

									<Grid item xs={12} sm={6} md={3}>
										<Typography variant="body2" sx={{ color: "#757575" }}>
											Origen:
										</Typography>
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

								<Grid item xs={12} sm={6} md={4}>
									<Typography variant="body2" sx={{ color: "#757575" }}>
										Estado
									</Typography>

									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											gap: "2rem",
										}}
									>
										<Grid container spacing={2}>
											<Grid item>{StateChips(customerDetails)}</Grid>
										</Grid>

										<Grid container spacing={2}>
											<Grid item xs={12} sm={6} md={3}>
												<Typography
													variant="body2"
													sx={{ color: "#757575" }}
												>
													Prioridad:
												</Typography>

												{PriorityChips(customerDetails)}
											</Grid>

											<Grid item xs={12} sm={6} md={3}>
												<Typography
													variant="body2"
													sx={{ color: "#757575" }}
												>
													Encargado:
												</Typography>

												<Box
													sx={{
														display: "flex",
														gap: "16px",
														alignItems: "center",
													}}
												>
													<Avatar
														sx={{
															width: "24px",
															height: "24px",
															borderRadius: "50%",
														}}
														alt="Remy Sharp"
														src={customerDetails.encargado.avatar}
													/>
													<Typography
														variant="body2"
														gutterBottom
														sx={{
															marginBottom: 0,
															lineHeight: "24px",
														}}
													>
														{customerDetails.encargado.nombre}
													</Typography>
												</Box>
											</Grid>

											<Grid item xs={12} sm={6} md={3}>
												<Typography
													variant="body2"
													sx={{ color: "#757575" }}
												>
													Último contacto:
												</Typography>
												<Typography>
													{formatDateTime(customerDetails.ultimoContacto)}
												</Typography>
											</Grid>

											<Grid item xs={12} sm={6} md={3}>
												<Typography
													variant="body2"
													sx={{ color: "#757575" }}
												>
													Expectativa de cierre:
												</Typography>
												<Typography>
													{formatDateTime(
														customerDetails.fechaCierreEstimada
													)}
												</Typography>
											</Grid>
										</Grid>
									</Box>
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

								<Grid container sx={{ flexDirection: "column", gap: "1rem" }}>
									<Grid item xs={12} sm={6} md={4}>
										<Typography variant="body2" sx={{ color: "#757575" }}>
											Proyecto:
										</Typography>
										<Typography>{customerDetails.descripcion}</Typography>
									</Grid>

									<Grid item xs={12} sm={6} md={4}>
										<Typography variant="body2" sx={{ color: "#757575" }}>
											Valor estimado del proyectos:
										</Typography>
										<Typography>
											{currencyFormatter(customerDetails.valorEstimado)}
										</Typography>
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
