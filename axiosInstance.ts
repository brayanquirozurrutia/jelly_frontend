import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const API_JWT_REFRESH_URL = import.meta.env.VITE_JWT_REFRESH as string;


const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
    const accessToken = getCookie('access_token')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
        console.warn('No access token found in cookies');
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const refreshToken = Cookies.get('refresh_token');
            if (refreshToken) {
                const response = await axiosInstance.post(API_JWT_REFRESH_URL, {
                    refresh: refreshToken,
                }, { withCredentials: true });

                const {access} = response.data;

                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return axiosInstance(originalRequest);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    return Promise.reject(error);
});

function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookiePart = parts.pop(); // Puede ser undefined
        if (cookiePart) {
            return cookiePart.split(';').shift() || null;
        }
    }
    return null;
}

export default axiosInstance;
