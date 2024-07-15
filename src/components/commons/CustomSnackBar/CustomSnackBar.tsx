import React from 'react';
import {Snackbar, Fade, SnackbarContent} from '@mui/material';
import CustomAlert from "../CustomAlert";

interface CustomSnackBarProps {
    open: boolean;
    onClose: () => void;
    anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
    autoHideDuration?: number;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

const CustomSnackBar: React.FC<CustomSnackBarProps> = (
    {
        open,
        onClose,
        anchorOrigin = { vertical: 'top', horizontal: 'right' },
        autoHideDuration = 6000,
        message,
        type,
    }) => {

    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            TransitionComponent={Fade}
            sx={{
                backgroundColor: 'transparent',
            }}
        >
            <SnackbarContent
                sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    padding: 0,
                }}
                message={<CustomAlert onClose={onClose} message={message} type={type}/>}
            />
        </Snackbar>
    );
};

export default CustomSnackBar;
