import axios from "axios";

const API_BASE_URL = "https://c21-12-m-react.onrender.com/api";
const withCredentialsConfig = { withCredentials: false };

//* Función para manejar errores uniformemente
const handleApiError = (error) => {
    console.error(error);

    // const errorStatus = error.response.status;
    // if (errorStatus === 403 || errorStatus === 401) {
    //     window.location.href = "/login";
    // }

    throw error;
};

//* Octener Todos los clientes:
export async function getAllClients() {
    try {
        const response = await axios.get(`${API_BASE_URL}/v1/clients`, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

//* Octener Un cliente por su Id:
export async function getClientById(id, data) {
    try {
        const response = await axios.get(`${API_BASE_URL}/v1/clients/${id}`, data, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

//* Crear un Ciente:
export async function createClient(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/v1/clients`, data, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

//* Actualizar un cliente:
export async function updateClient(id, data) {
    try {
        const response = await axios.put(`${API_BASE_URL}/v1/clients/${id}`, data, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

//* Eliminar un cliente:
export async function deleteClient(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/v1/clients/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

//* Octener Todos los clientes:
export async function getListOfManagers() {
    try {
        const response = await axios.get(`${API_BASE_URL}/v1/managers`, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
} 