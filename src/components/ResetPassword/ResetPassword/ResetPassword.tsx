import React, {useEffect} from 'react';
import useResetPasswordForm from "../../../hooks/useResetPasswordForm.ts";
import {useNavigate} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import CustomSnackBar from "../../commons/CustomSnackBar";
import CustomInput from "../../commons/Inputs";
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import TokenIcon from "@mui/icons-material/Token";
import BaseButton from "../../commons/BaseButton";
import ResetPasswordNewToken from "../ResetPasswordNewToken";
import {resetPassword} from "../../../services/Auth";

const ResetPassword: React.FC = () => {
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
        startCountdown,
        snackbarOpen,
        setSnackbarOpen,
        focusedInput,
        setFocusedInput,
        password,
        setPassword,
        passwordError,
        setPasswordError,
        passwordConfirmation,
        setPasswordConfirmation,
        passwordConfirmationError,
        setPasswordConfirmationError,
    } = useResetPasswordForm(
        {
            initialCountdown: 5,
            onCountdownEnd: () => navigate('/')
        }
    );

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

        if (!password) {
            setPasswordError('La contraseña es requerida');
            return;
        }

        if (!passwordConfirmation) {
            setPasswordConfirmationError('La confirmación de contraseña es requerida');
            return;
        }

        if (emailError || tokenError || passwordError || passwordConfirmationError) {
            return;
        }

        setEmailError('');
        setTokenError('');
        setPasswordError('');
        setPasswordConfirmationError('');
        setEndpointError('');
        setEndpointSuccess('');

        await handleResetPassword();
    }

    const handleResetPassword = async () => {
        const data = {
            password_reset_token: token,
            email: email,
            password: password,
            password_2: passwordConfirmation,
        };

        try {
            const response = await resetPassword(data);
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
            setPassword('');
            setPasswordConfirmation('');
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
                            <Typography variant="h6" className="text-center">Cambiar contraseña</Typography>
                        </Grid>
                        <Grid item lg={6} xs={12}>
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
                        <Grid item lg={6} xs={12}>
                            <CustomInput
                                value={token}
                                setValue={setToken}
                                valueError={tokenError}
                                setFocusedInput={setFocusedInput}
                                focusedInput={focusedInput}
                                id="token"
                                label="Código"
                                placeholder="123456"
                                icon={TokenIcon}
                                focusText="token"
                                type="text"
                                maxLength={6}
                            />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <CustomInput
                                value={password}
                                setValue={setPassword}
                                valueError={passwordError}
                                setFocusedInput={setFocusedInput}
                                focusedInput={focusedInput}
                                id="password"
                                label="Contraseña"
                                placeholder="********"
                                icon={Lock}
                                focusText="password"
                                type="password"
                            />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <CustomInput
                                value={passwordConfirmation}
                                setValue={setPasswordConfirmation}
                                valueError={passwordConfirmationError}
                                setFocusedInput={setFocusedInput}
                                focusedInput={focusedInput}
                                id="passwordConfirmation"
                                label="Confirmar contraseña"
                                placeholder="********"
                                icon={Lock}
                                focusText="passwordConfirmation"
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} className="text-center">
                            <BaseButton
                                label="Cambiar contraseña"
                                className="w-full"
                            />
                        </Grid>
                    </Grid>
                </form>
                <div className="mt-4 w-full">
                    <ResetPasswordNewToken />
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
