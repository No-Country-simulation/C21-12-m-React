import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import { CssBaseline } from "@mui/material";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
	return (
		<Box sx={{ display: "flex", gap: "1rem" }}>
			<CssBaseline />
			<Sidebar />
			{children}
		</Box>
	);
};

MainLayout.propTypes = {
	children: PropTypes.node, // children puede ser cualquier nodo React
};

export default MainLayout;
