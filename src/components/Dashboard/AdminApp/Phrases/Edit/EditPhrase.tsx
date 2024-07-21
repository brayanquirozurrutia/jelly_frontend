import React, {useEffect} from "react";
import useEditPhraseForm from "../../../../../hooks/useEditPhraseForm.ts";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CustomInput from "../../../../commons/Inputs";
import GestureIcon from "@mui/icons-material/Gesture";
import CustomAlert from "../../../../commons/CustomAlert";
import BaseButton from "../../../../commons/BaseButton";
import {BannerPhrase} from "../../../../../types.ts";
import {editPhrase} from "../../../../../services/AdminApp";

interface EditPhraseProps {
    open: boolean;
    onClose: () => void;
    object: BannerPhrase | null;
    onUpdated: () => void;
}

const EditPhrase: React.FC<EditPhraseProps> = (
    {
        open,
        onClose,
        object,
        onUpdated,
    }
) => {
    const {
        phrase,
        setPhrase,
        phraseError,
        setPhraseError,
        focusedInput,
        setFocusedInput,
        endpointError,
        setEndpointError,
        loading,
        setLoading,
    } = useEditPhraseForm();

    useEffect(() => {
        if (object) {
            setPhrase(object.phrase);
        }
    }, [object, setPhrase]);

    useEffect(() => {
        if (!open) {
            setEndpointError('');
        }
    }, [open, setEndpointError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!phrase) {
            setPhraseError('La frase es requerida');
            return;
        }

        if (phraseError) return;

        setPhraseError('');

        await handleUpdatePhrase(e);
    }

    const handleUpdatePhrase = async (event: React.FormEvent) => {
        event.preventDefault();

        if (object) {
            setLoading(true);
            try {
                await editPhrase(object.id, { phrase });
                onUpdated();
                onClose();
            } catch (error) {
                if (error instanceof Error) {
                    setEndpointError(error.message);
                } else {
                    setEndpointError('Error al actualizar la frase');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Editar frase</DialogTitle>
                <DialogContent>
                    <CustomInput
                        value={phrase}
                        setValue={setPhrase}
                        valueError={phraseError}
                        setFocusedInput={setFocusedInput}
                        focusedInput={focusedInput}
                        id="phrase"
                        label="Frase"
                        placeholder="Frase"
                        icon={GestureIcon}
                        focusText="phrase"
                        type="text"
                        required={true}
                    />
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
                        onClickForm={handleSubmit}
                        label="Guardar"
                        loading={loading}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditPhrase;
