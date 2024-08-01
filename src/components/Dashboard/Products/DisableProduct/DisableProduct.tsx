import React from 'react';
import {Typography} from '@mui/material';
import {DisableProductProps} from "./types/DisableProduct.types.ts";
import CustomModal from "../../../commons/CustomModal";

const DisableProduct: React.FC<DisableProductProps> = (
    {
        open,
        onClose,
        productToDisable,
        onConfirm,
        loading = false
    }) => {
    const body = (
        <Typography>
            ¿Está seguro de que desea deshabilitar el producto: {productToDisable.name}?
        </Typography>
    );

    return (
        <CustomModal
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            body={body}
            title="Deshabilitar producto"
            loading={loading}
        />
    );
}

export default DisableProduct;
