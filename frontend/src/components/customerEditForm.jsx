/* eslint-disable react/prop-types */
import {
	Box,
	Divider,
	FormControl,
	FormHelperText,
	Grid,
	TextField,
	Typography,
	MenuItem,
	InputLabel,
	Select,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { getListOfManagers } from "../api/route";
import { useEffect, useState } from "react";
import EncargadoSelect from "./encargadoSelect";
import PrioridadSelect from "./PrioridadSelect";
import EstadoSelect from "./EstadoSelect";
import dayjs from "dayjs";

export const CustomerEditForm = ({ onSubmit, clientData }) => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			nombre: clientData.nombre || "",
			email: clientData.email || "",
			telefono: clientData.telefono || "",
			origen: clientData.origen || "",
			prioridad: clientData.prioridad || "",
			estado: clientData.estado || "",
			encargadoId: clientData.encargadoId || "",
			ultimo_contacto: clientData.ultimoContacto ? dayjs(clientData.ultimoContacto) : null,
			expected_close: clientData.fechaCierreEstimada ? dayjs(clientData.fechaCierreEstimada) : null,
			valor_estimado: clientData.valorEstimado || "",
		},
	});
	const [encargados, setEncargados] = useState([]);

	useEffect(() => {
		const fetchManagers = async () => {
			try {
				const managers = await getListOfManagers();
				setEncargados(managers);
			} catch (error) {
				console.log("Error al traer los encargados:", error);
			}
		};
		fetchManagers();
	}, []);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<form id="customer-form" onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<Box sx={{ border: "1px solid #E0E0E0", p: 2, borderRadius: "8px", mb: 2 }}>
						<Typography sx={{ fontWeight: 600, color: "#7055F5", m: "2" }}>
							Datos personales
						</Typography>
						<Divider sx={{ my: 2 }} />
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} md={3}>
								<Controller
									name="nombre"
									control={control}
									rules={{ required: "El nombre es requerido" }}
									render={({ field, fieldState: { error } }) => (
										<TextField
											{...field}
											label="Nombre"
											error={!!error}
											helperText={
												error
													? error.message
													: "Nombre del cliente o empresa"
											}
											required
											fullWidth
											InputLabelProps={{ shrink: true }}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={3}>
								<Controller
									name="email"
									control={control}
									rules={{
										required: "El email es requerido",
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: "Email inválido",
										},
									}}
									render={({ field, fieldState: { error } }) => (
										<TextField
											{...field}
											label="Email"
											error={!!error}
											helperText={
												error ? error.message : "Correo electrónico válido."
											}
											required
											fullWidth
											InputLabelProps={{ shrink: true }}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={3}>
								<Controller
									name="telefono"
									control={control}
									rules={{ required: "El teléfono es requerido" }}
									render={({ field, fieldState: { error } }) => (
										<TextField
											{...field}
											label="Teléfono"
											error={!!error}
											helperText={
												error
													? error.message
													: "Número de contacto con código de país."
											}
											required
											fullWidth
											InputLabelProps={{ shrink: true }}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={3}>
								<Controller
									name="origen"
									control={control}
									rules={{ required: "El origen es requerido" }}
									render={({ field, fieldState: { error } }) => (
										<FormControl fullWidth error={!!error}>
											<InputLabel id="origen-label">Origen</InputLabel>
											<Select
												labelId="origen-label"
												{...field}
												label="Origen"
											>
												<MenuItem value="contacto directo">
													Contacto directo
												</MenuItem>
												<MenuItem value="campaña marketing">
													Campaña de marketing
												</MenuItem>
												<MenuItem value="referencia">Referencia</MenuItem>
												<MenuItem value="otro">Otro</MenuItem>
											</Select>
											{error && (
												<FormHelperText>{error.message}</FormHelperText>
											)}
										</FormControl>
									)}
								/>
							</Grid>
						</Grid>
					</Box>
					<Box sx={{ border: "1px solid #E0E0E0", p: 2, borderRadius: "8px", mb: 2 }}>
						<Typography sx={{ fontWeight: 600, color: "#7055F5", m: "2" }}>
							Seguimiento
						</Typography>
						<Divider sx={{ my: 2 }} />
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} md={4}>
								<Controller
									name="prioridad"
									control={control}
									rules={{ required: "La prioridad es obligatoria." }}
									render={({ field, fieldState: { error } }) => (
										<PrioridadSelect
											value={field.value}
											onChange={field.onChange}
											error={!!error}
											helperText={
												error ? error.message : "Selecciona una prioridad."
											}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Controller
									name="estado"
									control={control}
									rules={{ required: "El estado es obligatorio." }}
									render={({ field, fieldState: { error } }) => (
										<EstadoSelect
											value={field.value}
											onChange={field.onChange}
											error={!!error}
											helperText={
												error ? error.message : "Selecciona un estado."
											}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Controller
									name="encargadoId"
									control={control}
									rules={{ required: "El encargado es obligatorio." }}
									render={({ field, fieldState: { error } }) => (
										<EncargadoSelect
											{...field}
											encargados={encargados}
											error={!!error}
											helperText={
												error ? error.message : "Selecciona un encargado."
											}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Controller
									name="ultimo_contacto"
									control={control}
									rules={{ required: "Fecha de ultimo contacto" }}
									render={({ field, fieldState: { error } }) => (
										<FormControl fullWidth sx={{ mt: 2 }}>
											<DatePicker
												label="Último contacto"
												value={field.value}
												onChange={(newValue) => field.onChange(newValue)}
												renderInput={(params) => (
													<TextField
														{...params}
														fullWidth
														error={!!error}
														helperText={
															error
																? error.message
																: "Fecha de último contacto."
														}
														InputLabelProps={{ shrink: true }}
													/>
												)}
											/>
										</FormControl>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Controller
									name="expected_close"
									control={control}
									rules={{
										required: "La fecha de cierre estimada es obligatoria.",
									}}
									render={({ field, fieldState: { error } }) => (
										<FormControl fullWidth sx={{ mt: 2 }}>
											<DatePicker
												label="Expectativa cierre"
												value={field.value}
												onChange={(newValue) => field.onChange(newValue)}
												renderInput={(params) => (
													<TextField
														{...params}
														fullWidth
														error={!!error}
														helperText={
															error
																? error.message
																: "Fecha estimada para cerrar."
														}
														InputLabelProps={{ shrink: true }}
													/>
												)}
											/>
										</FormControl>
									)}
								/>
							</Grid>
						</Grid>
					</Box>
					<Box sx={{ border: "1px solid #E0E0E0", p: 2, borderRadius: "8px", mb: 2 }}>
						<Typography sx={{ fontWeight: 600, color: "#7055F5", m: "2" }}>
							Finanzas
						</Typography>
						<Divider sx={{ my: 2 }} />
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} md={3}>
								<Controller
									name="valor_estimado"
									control={control}
									rules={{ required: "El valor estimado es obligatorio." }}
									render={({ field, fieldState: { error } }) => (
										<TextField
											{...field}
											label="Valor estimado"
											error={!!error}
											helperText={
												error
													? error.message
													: "Monto estimado en la moneda especificada."
											}
											required
											fullWidth
											InputLabelProps={{ shrink: true }}
										/>
									)}
								/>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</form>
		</LocalizationProvider>
	);
};
