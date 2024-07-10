import React, { useState, useEffect } from 'react';
import {Alert, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import { ObjectType } from '../../../../types';
import BaseButton from "../../../commons/BaseButton";

interface EditComponentProps {
    open: boolean;
    onClose: () => void;
    object: ObjectType | null;
    onUpdated: () => void;
    editEndpoint: (id: string, data: { name: string; description: string; }) => Promise<ObjectType>;
    componentName: string;
}

const BaseEdit: React.FC<EditComponentProps> = (
    {
        open,
        onClose,
        object,
        onUpdated,
        editEndpoint,
        componentName,
    }
    ) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (object) {
            setName(object.name);
            setDescription(object.description);
        }
    }, [object]);

    const handleUpdateGroup = async () => {
        if (object) {
            setIsSubmitting(true);
            try {
                await editEndpoint(object.id, { name, description });
                onUpdated();
                onClose();
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('Error al eliminar ' + componentName);
                }
            }
            setTimeout(() => {
                setIsSubmitting(false);
                setErrorMessage(null)
            }, 5000);
        }
    };

    const sx = {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#be87e7',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#a57ee8',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'black',
            fontWeight: 'bold',
        },
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Editar {componentName}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={sx}
                />
                <TextField
                    margin="dense"
                    label="Descripción"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    sx={sx}
                />
                {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                )}
            </DialogContent>
            <DialogActions>
                <BaseButton
                    onClick={onClose}
                    label="Cancelar"
                />
                <BaseButton
                    onClick={handleUpdateGroup}
                    label="Guardar"
                    disabled={isSubmitting}
                />
            </DialogActions>
        </Dialog>
    );
};

export default BaseEdit;
