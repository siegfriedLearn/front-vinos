import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajusta según tu configuración
});

export const getPromedioPais = (pais) => api.get(`/vinos/pais/${pais}`);
export const getVinosPorPrecio = (precio) => api.get(`/vinos/precio/${precio}`);
export const getVinosPorPuntuacion = (puntuacion) => api.get(`/vinos/puntuacion/${puntuacion}`);
export const getVinosPorTipo = (tipo) => api.get(`/vinos/tipo/${tipo}`);
export const getVinosPorCepa = (cepa) => api.get(`/vinos/cepa/${cepa}`);

export default api;