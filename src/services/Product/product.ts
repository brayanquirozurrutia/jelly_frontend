import axiosInstance from '../../../axiosInstance.ts';
import { handleAxiosError } from '../Error';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const GROUP_CREATE_URL = import.meta.env.VITE_GROUP_CREATE as string;

interface CreateGroupResponse {
    id: string;
    name: string;
    description: string;
}

export const createGroup = async (data: {
    name: string;
    description: string;
}): Promise<CreateGroupResponse> => {
    const url = `${API_URL}${GROUP_CREATE_URL}`;
    try {
        const response = await axiosInstance.post<CreateGroupResponse>(url, data, {
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
