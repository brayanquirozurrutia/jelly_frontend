import axiosInstance from '../../axiosInstance.ts';
import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const USER_LOGIN_URL = import.meta.env.VITE_USERS_LOGIN as string;
const USER_CREATE_URL = import.meta.env.VITE_USERS_CREATE as string;

interface LoginResponse {
    id: string;
}

interface CreateUserResponse {
    id: string;
    rut: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    birth_date: string;
    nickname: string;
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

export const createUser = async (data: {
    rut: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    gender: string;
    birth_date: string;
    password_2: string;
    nickname: string;
}): Promise<CreateUserResponse> => {
    const url = `${API_URL}${USER_CREATE_URL}`;
    try {
        const response = await axiosInstance.post<CreateUserResponse>(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
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
