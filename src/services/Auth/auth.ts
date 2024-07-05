import axiosInstance from '../../../axiosInstance.ts';
import { handleAxiosError } from '../Error';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const USER_LOGIN_URL = import.meta.env.VITE_USERS_LOGIN as string;
const USER_CREATE_URL = import.meta.env.VITE_USERS_CREATE as string;

interface LoginResponse {
    id: string;
    user_admin: boolean;
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

export const login = async (data: {
    email: string,
    password: string
}): Promise<LoginResponse> => {
    const url = `${API_URL}${USER_LOGIN_URL}`;
    try {
        const response = await axiosInstance.post<LoginResponse>(url, data, {
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
