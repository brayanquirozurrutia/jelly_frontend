import React from 'react';
import { createPhrase } from '../../../../../services/AdminApp';
import CustomInput from "../../../../commons/Inputs";
import BaseButton from "../../../../commons/BaseButton";
import useCreatePhraseForm from "../../../../../hooks/useCreatePhraseForm.ts";
import CustomSnackBar from "../../../../commons/CustomSnackBar";
import {Grid} from "@mui/material";
import GestureIcon from '@mui/icons-material/Gesture';
import CustomCollapse from "../../../../commons/CustomCollapse";

const CreatePhrase: React.FC = () => {
    const {
        phrase,
        setPhrase,
        loading,
        setLoading,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        snackbarOpen,
        setSnackbarOpen,
        collapseOpen,
        phraseError,
        setPhraseError,
        focusedInput,
        setFocusedInput,
        setCollapseOpen
    } = useCreatePhraseForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!phrase) {
            setPhraseError('La frase es requerida');
            return;
        }

        if (phraseError) return;

        setPhraseError('');

        await handleCreatePhrase(e);
    }
    const handleCreatePhrase = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setEndpointError('');
        setEndpointSuccess('');

        try {
            await createPhrase({phrase});
            setEndpointSuccess('Frase creada con éxito');
            setPhrase('');
        } catch (error) {
            if (error instanceof Error) {
                setEndpointError(error.message);
            } else {
                setEndpointError('Error inesperado');
            }
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    return (
        <div className="p-2 rounded-lg border-2 shadow-md mb-2">
            {snackbarOpen && (
                <CustomSnackBar
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                    message={endpointSuccess || endpointError}
                    type={endpointError ? 'error' : 'success'}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                />
            )}
            <CustomCollapse
                label="Crear Frase"
                initialOpen={collapseOpen}
                onToggle={() => setCollapseOpen(!collapseOpen)}
                >
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={12} className="text-center">
                                <BaseButton
                                    label="Crear frase"
                                    loading={loading}
                                    className="w-full lg:w-3/5"
                                />
                            </Grid>
                        </Grid>
                    </form>
            </CustomCollapse>
        </div>
    );
};

export default CreatePhrase;
