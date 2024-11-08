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
    console.log(data)
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

export async function deleteClient(customersId) {
    if (Array.isArray(customersId)) {
        // Eliminación de múltiples clientes
        try {
            const response = await axios.delete(`${API_BASE_URL}/v1/clients/multi/delete`, {
                ...withCredentialsConfig,
                data: { ids: customersId }
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    } else {
        // Eliminación de un solo cliente
        try {
            const response = await axios.delete(`${API_BASE_URL}/v1/clients/${customersId}`, withCredentialsConfig);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
}

export async function getListOfManagers() {
    try {
        const response = await axios.get(`${API_BASE_URL}/v1/managers`, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export const searchClients = async ({ nombre, estado, prioridad }) => {
    const params = new URLSearchParams({
        nombre: nombre.trim(),
        estado,
        prioridad,
    }).toString();

    const response = await axios.get(`${API_BASE_URL}/v1/clients/search?${params}`);
    return response.data;
};