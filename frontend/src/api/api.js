import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
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