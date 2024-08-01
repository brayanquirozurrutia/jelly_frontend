import React from 'react';
import { createProduct } from '../../../../services/Product';
import CustomSnackBar from '../../../commons/CustomSnackBar';
import BaseButton from '../../../commons/CustomButton/CustomButton.tsx';
import { Button, Grid } from '@mui/material';
import useCreateProduct from './hooks/useCreateProduct.ts';
import CustomInput from '../../../commons/Inputs';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import CategoryDropDown from '../../../commons/CategoryDropDown';
import GroupsDropDown from "../../../commons/GroupsDropDown";

const CreateProduct = () => {
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
        loading,
        setLoading,
        imageFile,
        handleImageChange,
        imageError,
        validateImage,
        resetImage,
        setImageError,
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
    } = useCreateProduct();

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

    return (
        <div className="p-2 rounded-lg border-2 shadow-md mb-2">
            {snackbarOpen && (
                <CustomSnackBar
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                    message={endpointSuccess || endpointError}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    type={endpointSuccess ? 'success' : 'error'}
                />
            )}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <CustomInput
                            value={name}
                            setValue={setName}
                            valueError={nameError}
                            setFocusedInput={setFocusedInput}
                            focusedInput={focusedInput}
                            id="name"
                            label="Nombre"
                            placeholder="Nombre del producto"
                            icon={DriveFileRenameOutlineIcon}
                            focusText="name"
                            type="text"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <CustomInput
                            value={description}
                            setValue={setDescription}
                            valueError={descriptionError}
                            setFocusedInput={setFocusedInput}
                            focusedInput={focusedInput}
                            id="description"
                            label="Descripción"
                            placeholder="Descripción del producto"
                            icon={DriveFileRenameOutlineIcon}
                            focusText="description"
                            type="text"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <CustomInput
                            value={price}
                            setValue={setPrice}
                            valueError={priceError}
                            setFocusedInput={setFocusedInput}
                            focusedInput={focusedInput}
                            id="price"
                            label="Precio"
                            placeholder="Precio del producto"
                            icon={MonetizationOnIcon}
                            focusText="price"
                            type="number"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <CustomInput
                            value={stock}
                            setValue={setStock}
                            valueError={stockError}
                            setFocusedInput={setFocusedInput}
                            focusedInput={focusedInput}
                            id="stock"
                            label="Stock"
                            placeholder="Stock del producto"
                            icon={NumbersIcon}
                            focusText="stock"
                            type="number"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <CategoryDropDown
                            selectedCategory={category}
                            onSelectCategory={setCategory}
                        />
                        {categoryError && <p style={{ color: 'red' }}>{categoryError}</p>}
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <GroupsDropDown
                            selectedGroup={group}
                            onSelectGroup={setGroup}
                        />
                        {groupError && <p style={{ color: 'red' }}>{groupError}</p>}
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <input
                            type="file"
                            id="image_file"
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="image_file">
                            <Button
                                component="span"
                                variant="contained"
                                color="primary"
                                className="w-full flex justify-center items-center"
                            >
                                {imageFile ? imageFile.name : 'Seleccionar Imagen'}
                            </Button>
                        </label>
                        {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                    </Grid>
                </Grid>
                <Grid item xs={12} className="text-center">
                    <BaseButton
                        label="Crear Producto"
                        className="w-full lg:w-3/5"
                        loading={loading}
                    />
                </Grid>
            </form>
        </div>
    );
};

export default CreateProduct;
