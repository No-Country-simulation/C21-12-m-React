/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";

import { alpha } from "@mui/material/styles";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Typography,
	Paper,
	Checkbox,
	IconButton,
	Tooltip,
	Avatar,
	Chip,
} from "@mui/material";

import { EyeIcon, EditIcon, TrashIcon } from "../icon/custonIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { getAllClients } from "../api/route";
import { deleteClient } from "../api/route";

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
		id: "nombre",
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
		id: "managerNombre",
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
            indeterminate={numSelected > 0 && numSelected < rowCount}
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
            sx={{ padding: "1rem" }}
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
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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

function EnhancedTableToolbar({ selected, handleClientDelete }) {
  const numSelected = selected.length;
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
          {numSelected} {numSelected > 1 ? "Seleccionados" : "Seleccionado"}
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
              handleClientDelete(selected); // Trabajando
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
	handleClientDelete: PropTypes.func.isRequired,
};
function PriorityChips(props) {
	const { priority } = props;

  const formattedLabel =
    priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();

	const colorPalette = { ALTA: "error", MEDIA: "warning", BAJA: "info" };

	return (
		<Box>
			<Chip
				label={formattedLabel}
				color={colorPalette[priority]}
				variant="outlined"
				size="small"
			/>
		</Box>
	);
}

PriorityChips.propTypes = {
	priority: PropTypes.string,
};

function StateChips(props) {
	const { state } = props;

  const formattedLabel =
    state.charAt(0).toUpperCase() + state.slice(1).toLowerCase();

	const colorPalette = {
		CONTACTO: 1,
		REUNION: 2,
		PROPUESTA: 3,
		NEGOCIACION: 4,
	};

	return (
		<Box>
			<Chip
				label={formattedLabel}
				color="default"
				size="small"
				variant="filled"
				avatar={<Avatar>{colorPalette[state]}</Avatar>}
			/>
		</Box>
	);
}

StateChips.propTypes = {
	state: PropTypes.string,
};

export function CustomerTable({ filteredClients }) {
	const [rows, setRows] = React.useState([]);
	const [loadedData, setLoadedData] = React.useState(false);

	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("estado");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	React.useEffect(() => {
		if (Array.isArray(filteredClients)) {
			setRows(filteredClients); // Actualiza rows solo si es un array
		}
	}, [filteredClients]);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getAllClients();
				if (Array.isArray(result)) {
					setRows(result);
					setLoadedData(true);
				} else {
					throw new Error("Data received is not an array");
				}
			} catch (error) {
				console.log("Error:", error);
			}
		};
		fetchData();
	}, []);

  // Trabajando
  const deleteClientFromTable = (customersId) => {
    // Si customersId es un array, eliminamos todos los IDs que estén en ese array
    if (Array.isArray(customersId)) {
      setRows((prevRows) =>
        prevRows.filter((row) => !customersId.includes(row.id))
      );
    } else {
      // Si customersId es un número, eliminamos solo ese ID
      setRows((prevRows) => prevRows.filter((row) => row.id !== customersId));
    }
  };

	//Trabajando
	const handleClientDelete = async (customersId) => {
		try {
			await deleteClient(customersId);
			deleteClientFromTable(customersId); // Revisa aquí que esté usando la prop correctamente
		} catch (error) {
			console.error(error);
		}
	};

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
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((row) => ({
					...row,
					managerNombre: row.encargado ? row.encargado.nombre : "Sin encargado", // Maneja el caso de undefined
					managerAvatar: row.encargado
						? row.encargado.avatar
						: "ruta/a/avatar/default.png", // Avatar por defecto si es undefined
				})),
		[order, orderBy, page, rowsPerPage, rows]
	);

	return (
		<Paper sx={{ width: "100%", overflow: "hidden", mb: 2 }}>
			<EnhancedTableToolbar selected={selected} handleClientDelete={handleClientDelete} />
			{loadedData && rows.length === 0 ? (
				<Typography
					align="center"
					sx={{
						color: "red",
					}}
				>
					No se encuentran resultados
				</Typography>
			) : (
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table
						stickyHeader
						aria-label="sticky table"
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size="small"
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
							{rows.length === 0 ? (
								<TableRow>
									<TableCell
										align="center"
										sx={{
											color: "red",
											fontWeight: "bold",
											fontSize: "1.25rem",
										}}
									>
										No se encuentran resultados
									</TableCell>
								</TableRow>
							) : (
								visibleRows.map((row, index) => {
									const isItemSelected = selected.includes(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													color="primary"
													checked={isItemSelected}
													inputProps={{
														"aria-labelledby": labelId,
													}}
													onClick={(event) => handleClick(event, row.id)}
													sx={{
														cursor: "pointer",
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
												<StateChips state={row.estado} />
											</TableCell>

											<TableCell align="left">
												<PriorityChips priority={row.prioridad} />
											</TableCell>

											<TableCell align="left">
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
														src={row.managerAvatar}
													/>
													<Typography
														variant="body2"
														gutterBottom
														sx={{
															marginBottom: 0,
															lineHeight: "24px",
														}}
													>
														{row.managerNombre}
													</Typography>
												</Box>
											</TableCell>

											<TableCell align="center">
												<Tooltip title="Ver" arrow>
													<IconButton
														onClick={() => {
															console.log("Ver Cliente", row.id);
														}}
													>
														<EyeIcon />
													</IconButton>
												</Tooltip>

												<Tooltip title="Editar" arrow>
													<IconButton
														onClick={() => {
															console.log("Editar Cliente", row.id);
														}}
													>
														<EditIcon />
													</IconButton>
												</Tooltip>

												<Tooltip title="Eliminar" arrow>
													<IconButton
														onClick={() => {
															handleClientDelete(row.id);
														}}
													>
														<TrashIcon />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									);
								})
							)}

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
