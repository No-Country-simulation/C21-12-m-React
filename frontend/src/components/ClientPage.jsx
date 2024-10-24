import { PeopleAltOutlined as PeopleAltOutlinedIcon } from "@mui/icons-material";
import { Alert, Box, Typography } from "@mui/material";
import CustomerForm from "../components/costumerForm";
import { CustomerTable } from "./customerTable";
import { useState } from "react";
const ClientPage = () => {
	const [alertVisible, setAlertVisible] = useState(false);

	const handleSave = () => {
		setAlertVisible(true);
	};

	const handleCloseAlert = () => {
		setAlertVisible(false);
	};
	return (
		<Box sx={{ m: 2 }}>
			<Box
				display="flex"
				alignItems="left"
				sx={{ color: "#2f2467", my: 4 }}
			>
				<PeopleAltOutlinedIcon sx={{ mr: 2, fontSize: 40 }} />
				<Typography variant="h4" sx={{ fontWeight: 600 }}>
					Clientes
				</Typography>
			</Box>
			<CustomerForm onSave={handleSave} />
			{alertVisible && (
				<Alert
					severity="success"
					onClose={handleCloseAlert}
					sx={{ mb: 2 }}
				>
					¡Cliente creado con éxito!
					<br />
					El nuevo cliente ha sido agregado correctamente. Puedes
					comenzar a gestionarlo desde la lista de clientes.
				</Alert>
			)}

			<CustomerTable />
		</Box>
	);
};

export default ClientPage;
