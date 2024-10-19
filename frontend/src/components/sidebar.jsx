import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useMediaQuery,
	IconButton,
	Divider,
	TextField,
	Typography,
} from "@mui/material";

import {
	Menu as MenuIcon,
	Search as SearchIcon,
	DashboardOutlined as DashboardOutlinedIcon,
	CreateOutlined as CreateOutlinedIcon,
	PeopleAltOutlined as PeopleAltOutlinedIcon,
	HandymanOutlined as HandymanOutlinedIcon,
	SavingsOutlined as SavingsOutlinedIcon,
	DataSaverOffOutlined as DataSaverOffOutlinedIcon,
	CardTravelOutlined as CardTravelOutlinedIcon,
	SettingsOutlined as SettingsOutlinedIcon,
	LogoutOutlined as LogoutOutlinedIcon,
} from "@mui/icons-material";

import logo from "../assets/logo.png";
import avatarSideBar from "../assets/AvatarSidebar.png";

const listStyles = {
	justifyContent: "flex-start",
	backgroundColor: "transparent",
	color: "#664ddf",
	"&:hover": {
		backgroundColor: "#e8eaf6",
		transform: "scale(1.02)",
	},
	borderRadius: 2,
	padding: 1,
};

const Sidebar = () => {
	const drawerWidth = 290;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null); // Initialize as null or -1

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	const handleItemClick = (indexItem) => {
		setSelectedItem(indexItem);
	};

	const menuItems = [
		{
			text: "Dashboard",
			icon: <DashboardOutlinedIcon sx={{ color: "#664ddf" }} />,
		},
		{
			text: "Tareas",
			icon: <CreateOutlinedIcon sx={{ color: "#664ddf" }} />,
		},
		{
			text: "Clientes",
			icon: <PeopleAltOutlinedIcon sx={{ color: "#664ddf" }} />,
			link: "/clientes",
		},
		{
			text: "Proyectos",
			icon: <CardTravelOutlinedIcon sx={{ color: "#664ddf" }} />,
		},
		{
			text: "Herramientas",
			icon: <HandymanOutlinedIcon sx={{ color: "#664ddf" }} />,
		},
		{
			text: "Finanzas",
			icon: <SavingsOutlinedIcon sx={{ color: "#664ddf" }} />,
		},
	];

	const optionsItems = [
		{
			text: "Soporte",
			icon: <DataSaverOffOutlinedIcon sx={{ color: "#664ddf" }} />,
		},
		{
			text: "Ajustes",
			icon: <SettingsOutlinedIcon sx={{ color: "#664ddf" }} />,
		},
	];

	return (
		<>
			{isMobile && (
				<IconButton
					edge="start"
					color="inherit"
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { sm: "none" } }}
				>
					<MenuIcon />
				</IconButton>
			)}
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						backgroundColor: "#f1eefe",
						border: 0,
					},
				}}
				variant={isMobile ? "temporary" : "permanent"}
				anchor="left"
				open={isMobile ? open : true}
				onClose={handleDrawerToggle}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						px: 2,
						my: 4,
					}}
				>
					<Box
						component={Link}
						to="/"
						sx={{
							display: "flex",
							width: "100%",
						}}
					>
						<Box component="img" src={logo} alt="Logo" />
					</Box>
					<Box sx={{ my: 4 }}>
						<TextField
							label="Buscar"
							id="outlined-size-small"
							defaultValue="Nombre, email, etc..."
							size="small"
							InputProps={{
								endAdornment: (
									<SearchIcon
										sx={{ color: "#664ddf", ml: 1 }}
									/>
								),
							}}
							sx={{
								"& .MuiInputBase-input": {
									color: "#664ddf",
								},
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderColor: "#664ddf",
									},
									"&:hover fieldset": {
										borderColor: "#664ddf",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#664ddf",
									},
								},
								"& .MuiInputLabel-root": {
									color: "#664ddf",
								},
								"& .MuiInputLabel-root.Mui-focused": {
									color: "#664ddf",
								},
							}}
						/>
					</Box>

					<List>
						{menuItems.map((item, index) => {
							// Aplicar diferentes estilos si el artículo está seleccionado.
							const isSelected = selectedItem === index;
							const itemStyles = {
								...listStyles,
								backgroundColor: isSelected
									? "#d3cafc"
									: "transparent",
								"&:hover": {
									backgroundColor: "#d3cafc",
									transform: "scale(1.02)",
								},
							};

							return (
								<ListItem key={index} disablePadding>
									<ListItemButton
										component={Link}
										to={item.link}
										sx={itemStyles}
										onClick={() => handleItemClick(index)}
									>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText
											primary={
												<Typography variant="subtitle2">
													{item.text}
												</Typography>
											}
										/>
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>

					<Divider />
					<List>
						{optionsItems.map((item, index) => {
							// Ajuste el desplazamiento del índice para los elementos de opciones para evitar conflictos con los elementos del menú
							const adjustedIndex = menuItems.length + index;
							const isSelected = selectedItem === adjustedIndex;
							const itemStyles = {
								...listStyles,
								backgroundColor: isSelected
									? "#d3cafc"
									: "transparent",
								"&:hover": {
									backgroundColor: "#d3cafc",
									transform: "scale(1.02)",
								},
							};

							return (
								<ListItem key={index} disablePadding>
									<ListItemButton
										sx={itemStyles}
										onClick={() =>
											handleItemClick(adjustedIndex)
										}
									>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText
											primary={
												<Typography variant="subtitle2">
													{item.text}
												</Typography>
											}
										/>
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>

					<Divider />
					<Box
						sx={{
							mt: 2,
							mb: 5,
							display: "flex",
							alignItems: "center",
						}}
					>
						<Box component="img" src={avatarSideBar} alt="Logo" />
						<Box>
							<Typography
								variant="subtitle2"
								sx={{
									ml: 2,
									color: "#664ddf",
									fontWeight: 600,
								}}
							>
								Olivia Rhye
							</Typography>
							<Typography
								variant="body"
								sx={{
									ml: 2,
									color: "#2F2467",
									fontSize: "14px",
								}}
							>
								olivia@untitledui.com{" "}
							</Typography>
						</Box>
						<IconButton
							sx={{ marginLeft: "auto", color: "#664ddf" }}
						>
							<LogoutOutlinedIcon />
						</IconButton>
					</Box>
					<Box sx={{ color: "#2F2467", fontSize: "12px" }}>
						© {new Date().getFullYear()} ProManage.
					</Box>
				</Box>
			</Drawer>
		</>
	);
};

export default Sidebar;
