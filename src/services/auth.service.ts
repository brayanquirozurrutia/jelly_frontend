import axiosInstance from '../../axiosInstance.ts';
import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const USER_LOGIN_URL = import.meta.env.VITE_USERS_LOGIN as string;

interface LoginResponse {
    id: string;
}

interface ErrorResponse {
    error: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const url = `${API_URL}${USER_LOGIN_URL}`;
    try {
        const response = await axiosInstance.post<LoginResponse>(url, {
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

const handleAxiosError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.data?.error) {
            throw new Error(axiosError.response.data.error);
        } else {
            throw new Error('Ocurrió un error');
        }
    } else {
        throw new Error('Error inesperado');
    }
};


const LIST_USERS_URL = 'users/list-users/';

export const listUsers = async () => {
    const url = `${API_URL}${LIST_USERS_URL}`;
    try {
        const response = await axiosInstance.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

