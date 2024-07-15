import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from '@mui/material';
import Email from '@mui/icons-material/Email';
import TokenIcon from '@mui/icons-material/Token';

import BaseButton from "../../commons/BaseButton";
import CustomInput from "../../commons/Inputs";
import CustomSnackBar from "../../commons/CustomSnackBar";
import { activateAccount } from "../../../services/Auth";
import useActivateAccountForm from "../../../hooks/useActivateAccountForm.ts";
import ActivateAccountNewToken from "../ActivateAccountNewToken";

const ActivateAccount: React.FC = () => {
    const {
        email,
        setEmail,
        emailError,
        setEmailError,
        token,
        setToken,
        tokenError,
        setTokenError,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        countdown,
        snackbarOpen,
        setSnackbarOpen,
        focusedInput,
        setFocusedInput,
        startCountdown,
    } = useActivateAccountForm({
        initialCountdown: 5,
        onCountdownEnd: () => navigate('/')
    });

    const navigate = useNavigate();
    const logoUrl = import.meta.env.VITE_LOGO as string;

    useEffect(() => {
        if (endpointSuccess) {
            startCountdown();
        }
    }, [endpointSuccess, startCountdown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setEmailError('El correo es requerido');
            return;
        }

        if (!token) {
            setTokenError('El código de activación es requerido');
            return;
        }

        if (emailError || tokenError) return;

        setEmailError('');
        setTokenError('');
        setEndpointError('');
        setEndpointSuccess('');

        await handleActivateAccount();
    }

    const handleActivateAccount = async () => {
        const data = {
            email,
            account_activation_token: token,
        };

        try {
            const response = await activateAccount(data);
            setEndpointSuccess(`${response.message}. Redirigiendo en ${countdown} segundos`);
        } catch (error) {
            if (error instanceof Error) {
                setEndpointError(error.message)
            } else {
                setEndpointError('Error al activar la cuenta');
            }
        } finally {
            setSnackbarOpen(true);
            setEmail('');
            setToken('');
        }
    }

    return (
        <div className="flex">
            <div className="bg-purple2 h-screen hidden lg:block basis-1/2">
                <img src={logoUrl} alt="Logo Tecito Store" className="w-1/2 mx-auto mt-4"/>
                <Typography variant="h4" className="text-center text-clack mt-4">Tu tienda favorita</Typography>
            </div>
            <div className="basis-full lg:basis-1/2 px-4 mt-4 lg:mt-0 lg:px-0 flex flex-col items-center">
                {snackbarOpen && (
                    <CustomSnackBar
                        open={snackbarOpen}
                        onClose={() => setSnackbarOpen(false)}
                        message={endpointSuccess || endpointError}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        type={endpointSuccess ? 'success' : 'error'}
                    />
                )}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className="text-center lg:hidden">
                            <img src={logoUrl} alt="Logo Tecito Store" className="w-1/4 mx-auto"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" className="text-center">Activar cuenta</Typography>
                        </Grid>
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
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomInput
                                value={token}
                                setValue={setToken}
                                valueError={tokenError}
                                setFocusedInput={setFocusedInput}
                                focusedInput={focusedInput}
                                id="token"
                                label="Código de activación"
                                placeholder="123456"
                                icon={TokenIcon}
                                focusText="token"
                                type="text"
                                maxLength={6}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} className="text-center">
                            <BaseButton
                                label="Activar cuenta"
                                className="w-full"
                            />
                        </Grid>
                    </Grid>
                </form>
                <ActivateAccountNewToken />
            </div>
        </div>
    );
}

export default ActivateAccount;
