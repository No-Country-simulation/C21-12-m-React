import { Box, Typography } from "@mui/material";

const WelcomePage = () => {
	return (
		<Box sx={{ m: 2 }}>
			<Typography variant="h4" sx={{ fontWeight: 600 }}>
				Bienvenida, Olivia
			</Typography>
			<Typography variant="body2" sx={{ color: "#475467" }}>
				Siga, gestione y prevea sus clientes, pedidos y tareas.
			</Typography>
		</Box>
	);
};

export default WelcomePage;
