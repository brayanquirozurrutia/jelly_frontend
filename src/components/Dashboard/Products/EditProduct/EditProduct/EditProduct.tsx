import useEditProduct from "./hooks/useEditProduct.ts";
import CircularProgress from "@mui/material/CircularProgress";
import CustomSnackBar from "../../../../commons/CustomSnackBar";
import {Grid} from "@mui/material";
import CustomInput from "../../../../commons/Inputs";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NumbersIcon from "@mui/icons-material/Numbers";
import CategoryDropDown from "../../../../commons/CategoryDropDown";
import GroupsDropDown from "../../../../commons/GroupsDropDown";
import BaseButton from "../../../../commons/CustomButton/CustomButton.tsx";
import {SelectedProduct} from "../../types/Products.types.ts";

const EditProduct = ({ productId }: SelectedProduct) => {

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
    } = useEditProduct({ productId });

    if (loading) return <CircularProgress />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-2 rounded-lg border-2 shadow-md mb-2">
            {snackbarOpen && (
                <CustomSnackBar
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                    message={endpointSuccess || endpointError}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
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
                        {categoryError && <p style={{color: 'red'}}>{categoryError}</p>}
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <GroupsDropDown
                            selectedGroup={group}
                            onSelectGroup={setGroup}
                        />
                        {groupError && <p style={{color: 'red'}}>{groupError}</p>}
                    </Grid>
                    <Grid item xs={12} className="text-center">
                        <BaseButton
                            label="Actualizar Producto"
                            className="w-full lg:w-3/5"
                            loading={updating}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default EditProduct
