import axiosInstance from "../../../../axiosInstance.ts";
import { handleAxiosError } from "../../Error";

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const PRODUCT_CREATE_VERSION = import.meta.env.VITE_PRODUCT_CREATE_VERSION as string;

interface ProductVersionResponse {
    id: string;
    name: string;
    stock: number;
    image: string;
}

export const createProductVersion = async (
    productId: string,
    data: {
        name: string;
        stock: number;
        image: File;
    }
): Promise<ProductVersionResponse> => {
    const url = `${API_URL}${PRODUCT_CREATE_VERSION.replace('<uuid:product_id>', productId)}`;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('stock', data.stock.toString());
    formData.append('image', data.image);

    try {
        const response = await axiosInstance.post<ProductVersionResponse>(url, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}
