import axios from 'axios';

const api = axios.create({
  baseURL: 'https://c21-12-m-react.onrender.com/api/v1',
});

// Puedes agregar interceptores si necesitas manejar autorizaciones o errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    // Manejo global de errores
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;