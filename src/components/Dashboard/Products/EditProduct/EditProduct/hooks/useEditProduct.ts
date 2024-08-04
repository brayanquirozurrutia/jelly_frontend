import useCreateProduct from "../../../CreateProduct/hooks/useCreateProduct.ts";
import useBooleanValidation from "../../../../../../hooks/Commons/useBooleanValidation.ts";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT_DETAILS} from "../../../../../../graphql/products/queries.ts";
import React, {useEffect} from "react";
import {CategoryType} from "../../../../Categories/category.types.ts";
import {GroupType} from "../../../../Groups/group.types.ts";
import {updateProduct} from "../../../../../../services/Product";
import {SelectedProduct} from "../../../types/Products.types.ts";

const useEditProduct = ({ productId }: SelectedProduct) => {

    const {
        value: initialized,
        setValue: setInitialized,
    } = useBooleanValidation('initialized')

    const {
        name,
        setName,
        nameError,
        setNameError,
        description,
        setDescription,
        descriptionError,
        setDescriptionError,
        price,
        setPrice,
        priceError,
        setPriceError,
        stock,
        setStock,
        stockError,
        setStockError,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        loading: updating,
        setLoading,
        snackbarOpen,
        setSnackbarOpen,
        focusedInput,
        setFocusedInput,
        category,
        setCategory,
        categoryError,
        setCategoryError,
        group,
        setGroup,
        groupError,
        setGroupError,
    } = useCreateProduct()

    const {
        loading,
        error,
        data
    } = useQuery(GET_PRODUCT_DETAILS, { variables: { id:productId } });

    useEffect(() => {
        if (data && !initialized) {
            setName(data.getProduct.name);
            setDescription(data.getProduct.description);
            setPrice(data.getProduct.price);
            setStock(data.getProduct.stock);
            setCategory(data.getProduct.category as CategoryType);
            setGroup(data.getProduct.group as GroupType);
            setInitialized(true);
        }
    }, [
        data,
        setName,
        setDescription,
        setPrice,
        setStock,
        setCategory,
        setGroup,
        initialized,
        setInitialized
    ]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            setNameError('El nombre es requerido');
            return;
        } else if (!description) {
            setDescriptionError('La descripción es requerida');
            return;
        } else if (!price) {
            setPriceError('El precio es requerido');
            return;
        } else if (!stock) {
            setStockError('El stock es requerido');
            return;
        } else if (!category) {
            setCategoryError('La categoria es requerida');
            return;
        } else if (!group) {
            setGroupError('El grupo es requerido');
            return;
        }

        if (
            nameError ||
            descriptionError ||
            priceError ||
            stockError ||
            categoryError ||
            groupError
        )
            return;

        setNameError('');
        setDescriptionError('');
        setPriceError('');
        setStockError('');
        setCategoryError('');
        setGroupError('');

        await handleEditProduct();
    };

    const handleEditProduct = async () => {
        if (!productId) {
            setEndpointError('ID de producto no encontrado');
            return;
        }

        setLoading(true);
        setEndpointError('');
        setEndpointSuccess('');

        try {
            if (!category || !category.id) {
                setCategoryError('La categoría es requerida');
                setLoading(false);
                return;
            } else if (!group || !group.id) {
                setGroupError('El grupo es requerido');
                setLoading(false);
                return;
            }

            await updateProduct(productId, {
                name,
                description,
                price,
                stock,
                category: category.id,
                group: group.id,
            });
            setEndpointSuccess('Producto actualizado con éxito');
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
    };

    return {
        name,
        setName,
        nameError,
        description,
        setDescription,
        descriptionError,
        price,
        setPrice,
        priceError,
        stock,
        setStock,
        stockError,
        endpointError,
        endpointSuccess,
        updating,
        snackbarOpen,
        setSnackbarOpen,
        focusedInput,
        setFocusedInput,
        category,
        setCategory,
        categoryError,
        group,
        setGroup,
        groupError,
        loading,
        error,
        handleSubmit,
    }
}

export default useEditProduct;
