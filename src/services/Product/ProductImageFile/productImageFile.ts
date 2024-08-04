import axiosInstance from "../../../../axiosInstance.ts";
import { handleAxiosError } from "../../Error";

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const PRODUCT_UPLOAD_IMAGE = import.meta.env.VITE_PRODUCT_UPLOAD_IMAGE as string;

interface ProductImageFileResponse {
    id: string;
    image: string;
}

export const createProductImageFile = async (
    productId: string,
    data: {
        image: File;
    }
): Promise<ProductImageFileResponse> => {
    const url = `${API_URL}${PRODUCT_UPLOAD_IMAGE.replace('<uuid:product_id>', productId)}`;

    const formData = new FormData();
    formData.append('image', data.image);

    try {
        const response = await axiosInstance.post<ProductImageFileResponse>(url, formData, {
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
};
