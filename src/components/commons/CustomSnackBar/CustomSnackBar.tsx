import React from 'react';
import {Snackbar, SnackbarContent, IconButton, Typography, Grid, Fade} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomSnackBarProps {
    open: boolean;
    onClose: () => void;
    anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
    autoHideDuration?: number;
    backgroundColor?: string;
    iconUrl?: string;
    title?: string;
    message: string;
    hoverBackgroundColor?: string;
}

const CustomSnackBar: React.FC<CustomSnackBarProps> = (
    {
        open,
        onClose,
        anchorOrigin = { vertical: 'top', horizontal: 'right' },
        autoHideDuration = 6000,
        backgroundColor = '#f5f5f5',
        iconUrl,
        title,
        message,
        hoverBackgroundColor = '#e0e0e0',
    }) => {
    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            TransitionComponent={Fade}
        >
            <SnackbarContent
                sx={{
                    backgroundColor: backgroundColor,
                    '&:hover': {
                        backgroundColor: hoverBackgroundColor,
                    },
                }}
                message={
                    <Grid
                        container
                        alignItems="center"
                    >
                        <div>
                            {iconUrl && <img src={iconUrl} alt="Icon" style={{width: 30, marginRight: 10}}/>}
                        </div>
                        <div>
                            {title && (
                                <Typography variant="subtitle1" sx={{color: 'black', fontWeight: 'bold'}}>
                                    {title}
                                </Typography>
                            )}
                            <Typography variant="body1" sx={{color: 'black', fontWeight: 'bold'}}>
                                {message}
                            </Typography>
                        </div>
                    </Grid>
                }
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseIcon
                            fontSize="small"
                            className="text-black"
                        />
                    </IconButton>
                }
            />
        </Snackbar>
    );
};

export default CustomSnackBar;
