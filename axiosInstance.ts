import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const API_JWT_REFRESH_URL = import.meta.env.VITE_JWT_REFRESH as string;
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

async function refreshToken() {
    try {
        const response = await axiosInstance.post(API_JWT_REFRESH_URL, {
            refresh: getCookie('refresh_token')
        });
        setCookie('access_token', response.data.access, 60 * 60 * 24);
        return response.data.access;
    } catch (error) {
        console.error('Unable to refresh token', error);
        return null;
    }
}

function setCookie(name: string, value: string, expiresInSeconds: number) {
    const date = new Date();
    date.setTime(date.getTime() + (expiresInSeconds * 1000));
    document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}; SameSite=Lax;`;
}

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

axiosInstance.interceptors.request.use(config => {
    const accessToken = getCookie('access_token');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
        } else {
            // Opción: Manejar la falla del refresco del token (e.g., cerrar sesión del usuario, mostrar mensaje de error)
        }
    }

    return Promise.reject(error);
});

export default axiosInstance;
