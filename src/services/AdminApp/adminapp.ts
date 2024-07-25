import axiosInstance from '../../../axiosInstance.ts';
import { handleAxiosError } from '../Error';

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const CREATE_PHRASE_URL = import.meta.env.VITE_CREATE_PHRASE as string;
const UPDATE_PHRASE_URL = import.meta.env.VITE_UPDATE_PHRASE as string;
const DELETE_PHRASE_URL = import.meta.env.VITE_DELETE_PHRASE as string;

interface PhraseResponse {
    id: string;
    phrase: string;
}


export const createPhrase = async (data: {
    phrase: string;
}): Promise<PhraseResponse> => {
    const url = `${API_URL}${CREATE_PHRASE_URL}`;
    try {
        const response = await axiosInstance.post<PhraseResponse>(url, data, {
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

export const editPhrase = async (id: string, data: {
    phrase: string;
}): Promise<PhraseResponse> => {
    const url = `${API_URL}${UPDATE_PHRASE_URL.replace('<int:id>', id)}`
    try {
        const response = await axiosInstance.put<PhraseResponse>(url, data, {
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

export const deletePhrase = async (id: string): Promise<void> => {
    const url = `${API_URL}${DELETE_PHRASE_URL.replace('<int:id>', id)}`;
    try {
        await axiosInstance.delete(url, {
            headers: {
                'accept': 'application/json',
            },
        });
    } catch (error) {
        return handleAxiosError(error);
    }
}
