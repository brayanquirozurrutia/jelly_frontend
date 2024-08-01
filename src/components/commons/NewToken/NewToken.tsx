import React, { useEffect } from "react";
import { Grid, Link as MuiLink, Collapse } from "@mui/material";
import BaseButton from "../../commons/CustomButton";
import useNewTokenForm from "../../../hooks/useNewTokenForm.ts";
import CustomAlert from "../../commons/CustomAlert";
import { linkStyles } from "../../../utils/textFieldStyles.ts";
import { NewTokenProps } from "../../../types.ts";
import Email from '@mui/icons-material/Email';
import CustomInput from "../Inputs";

const NewToken: React.FC<NewTokenProps> = (
    {
        endpoint,
        openCollapseMessage,
        labelMessage,
    }) => {

    const {
        email,
        setEmail,
        emailError,
        setEmailError,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        focusedInput,
        setFocusedInput,
        showAlert,
        setShowAlert,
        collapseOpen,
        setCollapseOpen,
        timer,
        isButtonDisabled,
        startTimer,
    } = useNewTokenForm(
        { initialTime: 60, onExpire: () => {} }
    );

    useEffect(() => {
        if (!collapseOpen && !timer) {
            setShowAlert(false);
        }
    }, [collapseOpen, setShowAlert, timer]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setEmailError('El correo es requerido');
            return;
        }

        if (emailError) return;

        setEmailError('');
        setEndpointError('');
        setEndpointSuccess('');
        setShowAlert(false);

        await handleNewToken();
    }

    const handleNewToken = async () => {
        const data = {
            email,
        };

        try {
            const response = await endpoint(data);
            setEndpointSuccess(response.message);
        } catch (error) {
            if (error instanceof Error) {
                setEndpointError(error.message)
            } else {
                setEndpointError('Ocurrió un error al enviar el token')
            }
        } finally {
            setShowAlert(true);
            setEmail('');
            startTimer();
            setCollapseOpen(false)
        }
    }

    return (
        <div className="text-center">
            <MuiLink
                component="button"
                variant="body2"
                onClick={() => setCollapseOpen(!collapseOpen)}
                color="inherit"
                sx={linkStyles}
                disabled={isButtonDisabled}
            >
                {isButtonDisabled ? `Espera ${timer} segundos` : openCollapseMessage}
            </MuiLink>
            <div className="py-2">
                {showAlert && (
                    <CustomAlert
                        onClose={() => setShowAlert(false)}
                        message={endpointError || endpointSuccess}
                        type={endpointError ? 'error' : 'success'}
                    />
                )}
            </div>
            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomInput
                                value={email}
                                setValue={setEmail}
                                valueError={emailError}
                                setFocusedInput={setFocusedInput}
                                focusedInput={focusedInput}
                                id="email"
                                label="Correo"
                                placeholder="correo@mail.com"
                                icon={Email}
                                focusText="email"
                                type="email"
                                />
                        </Grid>
                        <Grid item xs={12} className="text-center">
                            <BaseButton
                                label={labelMessage}
                                className="w-full"
                                disabled={isButtonDisabled}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Collapse>
        </div>
    );
}

export default NewToken;
