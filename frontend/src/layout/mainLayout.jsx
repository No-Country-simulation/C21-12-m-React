import Box from "@mui/material/Box";
import Sidebar from "../components/sidebar";
import { CssBaseline } from "@mui/material";
import PropTypes from "prop-types";

export const MainLayout = ({ children }) => {
	return (
		<Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
			<CssBaseline />
			<Sidebar />
			{children}
		</Box>
	);
};

MainLayout.propTypes = {
	children: PropTypes.node, // children puede ser cualquier nodo React
};
