import { Alert, AlertTitle, Box, Button, debounce, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState, useCallback } from "react";
import CustomerModal from "./customerModal";
import { ModalCustomerDetails } from "./modalCustomerDetails";

import { createClient, searchClients } from "../api/route";
import { CustomerTable } from "./customerTable";

const CostumerForm = () => {
	const [nombre, setNombre] = useState("");
	const [estado, setEstado] = useState("");
	const [prioridad, setPrioridad] = useState("");

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

	const [filteredClients, setFilteredClients] = useState([]);
	const [open, setOpen] = useState(false);

	const [openDetailClient, setOpenDetailClient] = useState(false);
	const [handleSelectedCustomerData, setHandleSelectedCustomerData] = useState({});

	const [alertVisible, setAlertVisible] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpenDetailClient = (customerData) => {
		setHandleSelectedCustomerData(customerData);
		setOpenDetailClient(true);
	};

	const handleCloseDetailClient = () => {
		setOpenDetailClient(false);
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

	const handleSearch = useCallback(async () => {
		try {
			const result = await searchClients({ nombre, estado, prioridad });
			setFilteredClients(result);
		} catch (error) {
			console.error("Error al buscar clientes", error);
		}
	}, [nombre, estado, prioridad]);

	useEffect(() => {
		const fetchFilteredClients = debounce(async () => {
			await handleSearch();
		}, 500);

		fetchFilteredClients();
	}, [nombre, estado, prioridad, handleSearch]);

	return (
		<div>
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
						Hubo un problema al guardar el nuevo cliente. Por favor, revisa los datos
						ingresados y vuelve a intentarlo. Si el problema persiste, contacta al
						soporte técnico.
					</Alert>
				)}

				<CustomerModal open={open} handleClose={handleClose} onSave={handleSave} />

				<ModalCustomerDetails
					open={openDetailClient}
					customerDetails={handleSelectedCustomerData}
					handleClose={handleCloseDetailClient}
				/>
			</Box>

			<CustomerTable
				filteredClients={filteredClients}
				openDetailClient={handleClickOpenDetailClient}
			/>
		</div>
	);
};

export default CostumerForm;
