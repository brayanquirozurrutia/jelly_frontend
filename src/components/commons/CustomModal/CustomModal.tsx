import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CustomModalProps } from "./types/CustomModal.types";
import CustomButton from "../CustomButton";

const CustomModal: React.FC<CustomModalProps> = (
    {
        open,
        onClose,
        onConfirm,
        body,
        title,
        loading = false
    }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="custom-modal-title"
            aria-describedby="custom-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                backgroundColor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography id="custom-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="close"
                        className="mx-2 text-black"
                        sx={{
                            '&:hover': { backgroundColor: '#a57ee8' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box id="custom-modal-description" sx={{ mt: 2 }}>
                    {body}
                </Box>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <CustomButton
                        label="Confirmar"
                        onClick={onConfirm}
                        loading={loading}
                    />
                    <CustomButton
                        label="Cancelar"
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-700"
                    />
                </Box>
            </Box>
        </Modal>
    );
}

export default CustomModal;
