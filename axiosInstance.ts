import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const API_JWT_REFRESH_URL = import.meta.env.VITE_JWT_REFRESH as string;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Asegura que las cookies se envían con las solicitudes
});

// Interceptor de respuestas para manejar errores de autenticación y refresh de tokens
axiosInstance.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            // Realiza una solicitud para refrescar el token
            await axios.post(API_JWT_REFRESH_URL, {}, { withCredentials: true });

            // El backend se encarga de gestionar las cookies y enviar el nuevo token de acceso
            return axiosInstance(originalRequest);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    return Promise.reject(error);
});

export default axiosInstance;
