import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { getAllClients } from "../api/route";

// function createData(id, name, estado, prioridad, encargado, opciones) {
// 	return {
// 		id,
// 		name,
// 		estado,
// 		prioridad,
// 		encargado,
// 		opciones,
// 	};
// }

// const rows = [
// 	createData(1, "Cupcake", 305, 3.7, 67, 4.3),
// 	createData(2, "Donut", 452, 25.0, 51, 4.9),
// 	createData(3, "Eclair", 262, 16.0, 24, 6.0),
// 	createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
// 	createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
// 	createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
// 	createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
// 	createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
// 	createData(9, "KitKat", 518, 26.0, 65, 7.0),
// 	createData(10, "Lollipop", 392, 0.2, 98, 0.0),
// 	createData(11, "Marshmallow", 318, 0, 81, 2.0),
// 	createData(12, "Nougat", 360, 19.0, 9, 37.0),
// 	createData(13, "Oreo", 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
	{
		id: "name",
		label: "Nombre",
	},
	{
		id: "estado",
		label: "Estado",
	},
	{
		id: "prioridad",
		label: "Prioridad",
	},
	{
		id: "encargado",
		label: "Encargado",
	},
	{
		id: "opciones",
		label: "Opciones",
	},
];

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts",
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.id === "opciones" ? "center" : "left"}
						padding="normal"
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc"
										? "sorted descending"
										: "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
	const { selected } = props;
	const numSelected = selected.length
	return (
		<Toolbar
			sx={[
				{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
				},
				numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				},
			]}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: "1 1 100%" }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected}{" "}
					{numSelected > 1 ? "Seleccionados" : "Seleccionado"}
				</Typography>
			) : (
				<Typography
					sx={{ flex: "1 1 100%" }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					Tabla de Clientes
				</Typography>
			)}
			{numSelected > 0 && (
				<Tooltip title="Delete">
					<IconButton
						onClick={() => {
							console.log("Eliminar Clientes",selected);
						}}
					>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	selected: PropTypes.array.isRequired,
};

export function CustomerTable() {

	const [rows, setRows] = React.useState([]);
	const [loadedData, setLoadedData] = React.useState(false);

	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("estado");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getAllClients();
				if (!result) {
					throw new Error("Error fetching data");
				}
				setRows(result); // Guardar los datos en el estado
				setLoadedData(true); // Indicar que los datos han sido cargados
			} catch (error) {
				console.log("Error:", error);
			}
		};

		fetchData();
	}, []);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Evite un salto de diseño al llegar a la última página con filas vacías.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			[...rows]
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage, rows]
	);


	return (
		<Paper sx={{ width: "100%", overflow: "hidden", mb: 2 }}>
			<EnhancedTableToolbar selected={selected} />
			{loadedData && (
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table
						stickyHeader
						aria-label="sticky table"
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size="medium"
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>

						<TableBody>
							{visibleRows.map((row, index) => {
								const isItemSelected = selected.includes(
									row.id
								);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event) =>
											handleClick(event, row.id)
										}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
										sx={{ cursor: "pointer" }}
									>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													"aria-labelledby": labelId,
												}}
											/>
										</TableCell>

										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="none"
										>
											{row.nombre}
										</TableCell>

										<TableCell align="left">
											{row.estado}
										</TableCell>

										<TableCell align="left">
											{row.prioridad}
										</TableCell>

										<TableCell align="left">
											{row.managerId}
										</TableCell>

										<TableCell align="center">
											{row.opciones}
										</TableCell>
									</TableRow>
								);
							})}

							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			<TablePagination
				labelRowsPerPage="Rows:"
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
