import {BannerPhrase} from "../View/ViewPhrase.types.ts";
import React from "react";
import useDeletePhraseForm from "../../../../../hooks/useDeletePhraseForm.ts";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import BaseButton from "../../../../commons/CustomButton";
import CustomAlert from "../../../../commons/CustomAlert";
import {deletePhrase} from "../../../../../services/AdminApp";

interface DeletePhraseProps {
    open: boolean;
    onClose: () => void;
    object: BannerPhrase | null;
    onDeleted: () => void;
}

const DeletePhrase: React.FC<DeletePhraseProps> = (
    {
        open,
        onClose,
        object,
        onDeleted,
    }
) => {

    const {
        endpointError,
        setEndpointError,
        loading,
        setLoading
    } = useDeletePhraseForm();

    const handleSubmit = async () => {
        if (object) {
            setLoading(true);
            try {
                await deletePhrase(object.id);
                onDeleted();
                onClose();
            } catch (error) {
                if (error instanceof Error) {
                    setEndpointError(error.message);
                } else {
                    setEndpointError('Error al eliminar la frase');
                }
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Eliminar frase</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que deseas eliminar la frase "{object?.phrase}"? Esta acción no se puede deshacer.
                </DialogContentText>
                {endpointError && (
                    <CustomAlert
                        onClose={() => setEndpointError('')}
                        message={endpointError}
                        type="error"
                    />
                )}
            </DialogContent>
            <DialogActions>
                <BaseButton
                    onClick={onClose}
                    label="Cancelar"
                />
                <BaseButton
                    onClick={handleSubmit}
                    label="Eliminar"
                    loading={loading}
                />
            </DialogActions>
        </Dialog>
    );
}

export default DeletePhrase;
