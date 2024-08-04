import useStringValidation from "../../../../../hooks/Commons/useStringValidation.ts";
import useNumberValidation from "../../../../../hooks/Commons/useNumberValidation.ts";
import useImageFileValidation from "../../../../../hooks/Commons/useImageFileValidation.ts";
import {CategoryType} from "../../../Categories/category.types.ts";
import React, {useState} from "react";
import {GroupType} from "../../../Groups/group.types.ts";
import useCommons from "../../../../../hooks/useCommons.ts";
import {createProduct} from "../../../../../services/Product";

const useCreateProduct = () => {

    const [category, setCategory] = useState<CategoryType | null>(null);
    const [group, setGroup] = useState<GroupType | null>(null);

    const {
        snackbarOpen,
        setSnackbarOpen,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        loading,
        setLoading,
        focusedInput,
        setFocusedInput,
    } = useCommons();

    const {
        value: categoryError,
        setValue: setCategoryError,
    } = useStringValidation('categoryError')

    const {
        value: groupError,
        setValue: setGroupError,
    } = useStringValidation('groupError')

    const {
        value: name,
        setValue: setName,
        error: nameError,
        setError: setNameError,
    } = useStringValidation('name')

    const {
        value: description,
        setValue: setDescription,
        error: descriptionError,
        setError: setDescriptionError,
    } = useStringValidation('description')

    const {
        value: price,
        setValue: setPrice,
        error: priceError,
        setError: setPriceError,
    } = useNumberValidation('price')

    const {
        value: stock,
        setValue: setStock,
        error: stockError,
        setError: setStockError,
    } = useNumberValidation('stock')

    const {
        imageFile,
        imageError,
        handleImageChange,
        validateImage,
        resetImage,
        setImageError,
    } = useImageFileValidation();

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
        } else if (!validateImage()) {
            return;
        }

        if (
            nameError ||
            descriptionError ||
            priceError ||
            stockError ||
            categoryError ||
            groupError ||
            imageError
        )
            return;

        setNameError('');
        setDescriptionError('');
        setPriceError('');
        setStockError('');
        setCategoryError('');
        setGroupError('');
        setImageError('');

        await handleCreateProduct(e);
    };

    const handleCreateProduct = async (event: React.FormEvent) => {
        event.preventDefault();
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
            await createProduct({
                name,
                description,
                price,
                stock,
                category: category.id,
                group: group.id,
                image_file: imageFile,
            });
            setEndpointSuccess('Producto creado con éxito');
            setName('');
            setDescription('');
            setPrice('');
            setStock('');
            setCategory(null);
            setGroup(null);
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
        loading,
        imageFile,
        handleImageChange,
        imageError,
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
        handleSubmit,
        setNameError,
        setDescriptionError,
        setPriceError,
        setStockError,
        setCategoryError,
        setGroupError,
        setEndpointError,
        setEndpointSuccess,
        setLoading,
    }
};

export default useCreateProduct;
