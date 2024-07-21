import axiosInstance from '../../../axiosInstance.ts';
import { handleAxiosError } from '../Error';
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const GROUP_CREATE_URL = import.meta.env.VITE_GROUP_CREATE as string;
const GROUP_UPDATE_URL = import.meta.env.VITE_GROUP_UPDATE as string;
const GROUP_DELETE_URL = import.meta.env.VITE_GROUP_DELETE as string;
const CATEGORY_CREATE_URL = import.meta.env.VITE_CATEGORY_CREATE as string;
const CATEGORY_UPDATE_URL = import.meta.env.VITE_CATEGORY_UPDATE as string;
const CATEGORY_DELETE_URL = import.meta.env.VITE_CATEGORY_DELETE as string;

interface GroupOrCategoryResponse {
    id: string;
    name: string;
    description: string;
}

export const createGroup = async (data: {
    name: string;
    description: string;
}): Promise<GroupOrCategoryResponse> => {
    const url = `${API_URL}${GROUP_CREATE_URL}`;
    try {
        const response = await axiosInstance.post<GroupOrCategoryResponse>(url, data, {
            withCredentials: true,
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

export const createCategory = async (data: {
    name: string;
    description: string;
}): Promise<GroupOrCategoryResponse> => {
    const url = `${API_URL}${CATEGORY_CREATE_URL}`;
    try {
        const response = await axiosInstance.post<GroupOrCategoryResponse>(url, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
            },
        });
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

export const updateGroup = async (groupId: string, data: {
    name?: string;
    description?: string;
}): Promise<GroupOrCategoryResponse> => {
    const url = `${API_URL}${GROUP_UPDATE_URL.replace('<uuid:group_id>', groupId)}`;
    try {
        const response = await axiosInstance.patch<GroupOrCategoryResponse>(url, data, {
            withCredentials: true,
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

export const updateCategory = async (categoryId: string, data: {
    name?: string;
    description?: string;
}): Promise<GroupOrCategoryResponse> => {
    const url = `${API_URL}${CATEGORY_UPDATE_URL.replace('<uuid:category_id>', categoryId)}`;
    try {
        const response = await axiosInstance.patch<GroupOrCategoryResponse>(url, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

export const deleteGroup = async (groupId: string): Promise<void> => {
    const url = `${API_URL}${GROUP_DELETE_URL.replace('<uuid:group_id>', groupId)}`;
    try {
        await axiosInstance.delete(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        });
    } catch (error) {
        return handleAxiosError(error);
    }
}

export const deleteCategory = async (categoryId: string): Promise<void> => {
    const url = `${API_URL}${CATEGORY_DELETE_URL.replace('<uuid:category_id>', categoryId)}`;
    try {
        await axiosInstance.delete(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        });
    } catch (error) {
        return handleAxiosError(error);
    }
}
