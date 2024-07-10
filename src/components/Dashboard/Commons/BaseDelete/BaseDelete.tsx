import React, { useState } from 'react';
import {Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { ObjectType } from '../../../../types';
import BaseButton from "../../../commons/BaseButton";

interface DeleteComponentProps {
    open: boolean;
    onClose: () => void;
    object: ObjectType | null;
    onDeleted: () => void;
    deleteEndpoint: (id: string) => Promise<void>;
    componentName: string;
}

const BaseDelete: React.FC<DeleteComponentProps> = (
    {
        open,
        onClose,
        object,
        onDeleted,
        deleteEndpoint,
        componentName
    }
) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDeleteGroup = async () => {
        if (object) {
            setIsSubmitting(true);
            try {
                await deleteEndpoint(object.id);
                onDeleted();
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
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Eliminar {componentName}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que deseas eliminar el {componentName} "{object?.name}"? Esta acción no se puede deshacer.
                </DialogContentText>
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
                    onClick={handleDeleteGroup}
                    label="Eliminar"
                    disabled={isSubmitting}
                />
            </DialogActions>
        </Dialog>
    );
};

export default BaseDelete;
