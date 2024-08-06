import React from "react";
import useImageFileValidation from "../../../../../hooks/Commons/useImageFileValidation.ts";
import {createProductImageFile} from "../../../../../services/Product/ProductImageFile";
import useCommons from "../../../../../hooks/useCommons.ts";
import {SelectedProduct} from "../../types/Products.types.ts";

const useAddProductImage = ({ productId }: SelectedProduct) => {

    const {
        snackbarOpen,
        setSnackbarOpen,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        loading,
        setLoading,
    } = useCommons();

    const {
        imageFile,
        imageError,
        handleImageChange,
        validateImage,
        resetImage,
        setImageError,
        imageFileName,
    } = useImageFileValidation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateImage()) {
            setImageError('Por favor seleccione una imagen válida.');
            return;
        }

        if (
            imageError
        ) return;

        setImageError('');

        await handleAddProductImage(e);
    };

    const handleAddProductImage = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setEndpointError('');
        setEndpointSuccess('');

        try {
            if (!imageFile) {
                setImageError('Por favor seleccione una imagen válida.');
                return;
            } else if (!productId) {
                setEndpointError('ID de producto no encontrado');
                return;
            }

            await createProductImageFile(productId, {
                image: imageFile,
            });

            setEndpointSuccess('Imagen agregada exitosamente');
            resetImage();
        } catch (error) {
            if (error instanceof Error) {
                setEndpointError(error.message);
            } else {
                setEndpointError('Error inesperado');
            }
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    }

    return {
        snackbarOpen,
        setSnackbarOpen,
        endpointError,
        endpointSuccess,
        loading,
        handleImageChange,
        handleSubmit,
        imageError,
        imageFileName,
    }
};

export default useAddProductImage
