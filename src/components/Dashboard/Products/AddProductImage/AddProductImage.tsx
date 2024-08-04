import React from "react";
import CustomSnackBar from "../../../commons/CustomSnackBar";
import useAddProductImage from "./hooks/useAddProductImage.ts";
import {Grid} from "@mui/material";
import BaseButton from "../../../commons/CustomButton/CustomButton.tsx";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CustomCollapse from "../../../commons/CustomCollapse";
import {SelectedProduct} from "../types/Products.types.ts";
import CustomInputFile from "../../../commons/CustomInputFile";

const AddProductImage: React.FC<SelectedProduct> = ({ productId }) => {
    const {
        snackbarOpen,
        setSnackbarOpen,
        endpointError,
        endpointSuccess,
        loading,
        handleImageChange,
        handleSubmit,
        imageError,
    } = useAddProductImage({ productId });

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
            <CustomCollapse
                label="Agregar Imágenes"
                initialOpen={false}
                onToggle={() => {}}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <CustomInputFile
                                onChange={handleImageChange}
                                id="file-input"
                                buttonText="Subir Imagen"
                                startIcon={<AddPhotoAlternateIcon/>}
                                error={imageError}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="text-right">
                        <BaseButton
                            label="Crear Producto"
                            className="w-full lg:w-1/2"
                            loading={loading}
                        />
                    </Grid>
                </form>
            </CustomCollapse>
        </div>
    );
}

export default AddProductImage;
