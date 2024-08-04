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
    } = useCreateProduct();

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
