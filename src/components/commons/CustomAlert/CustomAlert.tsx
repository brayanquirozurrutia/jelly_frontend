import React from "react";
import {Alert} from "@mui/material";

interface CustomAlertProps {
    onClose: () => void;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

const CustomAlert: React.FC<CustomAlertProps> = (
    {
        onClose,
        message,
        type,
    }) => {

    const sadPou = import.meta.env.VITE_SAD_POU_ICON as string;
    const heartFinger = import.meta.env.VITE_HEART_ICON as string;

    let iconUrl = '';

    switch (type) {
        case 'success':
            iconUrl = heartFinger;
            break;
        case 'error':
            iconUrl = sadPou;
            break;
        default:
            iconUrl = '';
    }
    const icon = iconUrl ? <img src={iconUrl} alt="icon" style={{ width: 24, height: 24 }} /> : null;

    return (
        <Alert
            onClose={onClose}
            severity={type}
            sx={{
                width: '100%',
                fontWeight: 'bold',
            }}
            icon={icon}
        >
            {message}
        </Alert>
    );
}

export default CustomAlert;
