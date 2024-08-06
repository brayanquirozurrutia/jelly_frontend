import useCreateProduct from "../../../CreateProduct/hooks/useCreateProduct.ts";
import React from "react";
import useImageFileValidation from "../../../../../../hooks/Commons/useImageFileValidation.ts";
import {createProductVersion} from "../../../../../../services/Product/Version";
import {SelectedProduct} from "../../../types/Products.types.ts";

const useCreateVersion = ({ productId }: SelectedProduct) => {
    const {
        snackbarOpen,
        setSnackbarOpen,
        endpointSuccess,
        setEndpointSuccess,
        endpointError,
        setEndpointError,
        name,
        setName,
        nameError,
        setNameError,
        setFocusedInput,
        focusedInput,
        stock,
        setStock,
        stockError,
        setStockError,
        loading,
        setLoading,
    } = useCreateProduct()

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

        if (!name) {
            setNameError('El nombre es requerido');
            return;
        } else if (!stock) {
            setStockError('El stock es requerido');
            return;
        } else if (!validateImage()) {
            setImageError('Por favor seleccione una imagen válida.');
            return;
        }

        if (
            nameError ||
            stockError ||
            imageError
        )
            return;

        setNameError('');
        setStockError('');
        setImageError('');

        await handleCreateVersion(e);
    }

    const handleCreateVersion = async (e: React.FormEvent) => {
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

            await createProductVersion(productId, {
                name: name,
                stock: stock,
                image: imageFile,
            });

            setEndpointSuccess('Versión creada exitosamente');
            resetImage()
            setName('');
            setStock(0);
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
        endpointSuccess,
        endpointError,
        handleSubmit,
        name,
        setName,
        nameError,
        setFocusedInput,
        focusedInput,
        stock,
        setStock,
        stockError,
        loading,
        handleImageChange,
        imageError,
        imageFileName,
    }
}

export default useCreateVersion;
