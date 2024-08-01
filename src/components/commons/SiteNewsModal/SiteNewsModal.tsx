import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from "../CustomButton";

interface SiteNewsModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    body: string;
}

const logoUrl = import.meta.env.VITE_LOGO as string;

const SiteNewsModal: React.FC<SiteNewsModalProps> = ({ open, onClose, title, body }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="site-news-modal-title"
            aria-describedby="site-news-modal-body"
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
            }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    className="mx-2 text-black"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        '&:hover': { backgroundColor: '#a57ee8' }
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <img src={logoUrl} alt="Logo" style={{ width: '50px' }} />
                </Box>
                <Typography id="site-news-modal-title" variant="h6" component="h2" gutterBottom className="text-center">
                    {title}
                </Typography>
                <Typography id="site-news-modal-body" variant="body1" component="p">
                    {body}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CustomButton
                        label="Ver productos"
                        onClick={onClose}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default SiteNewsModal;
