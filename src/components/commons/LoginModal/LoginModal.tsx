import React from 'react';
import {
    Box,
    Modal,
    Alert,
    IconButton,
    Link as MuiLink
} from '@mui/material';
import {
    Email,
    Lock,
    Close
} from '@mui/icons-material';
import { useLazyQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';

import BaseButton from '../BaseButton';
import CustomInput from "../Inputs";
import CustomSnackBar from "../CustomSnackBar";
import ResetPasswordNewToken from "../../ResetPassword/ResetPasswordNewToken";
import { useAuth } from "../../../auth/AuthContext.tsx";
import { login } from "../../../services/Auth";
import { GET_USER_DETAILS } from '../../../graphql/users/queries';
import useLoginForm from "../../../hooks/Commons/useLoginForm.ts";
import Cookies from "js-cookie";

interface LoginModalProps {
    show: boolean;
    handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
    const {
        email,
        setEmail,
        emailError,
        setEmailError,
        password,
        setPassword,
        passwordError,
        setPasswordError,
        focusedInput,
        setFocusedInput,
        snackbarOpen,
        setSnackbarOpen,
        endpointError,
        setEndpointError,
        setEndpointSuccess,
    } = useLoginForm();

    const { loginContext } = useAuth();
    const [getUserDetails, {
        data: userData,
        error
    }] = useLazyQuery(GET_USER_DETAILS);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setEmailError('El correo es requerido');
            return;
        }

        if (!password) {
            setPasswordError('La contraseña es requerida');
            return;
        }

        if (emailError || passwordError) return;

        setEmailError('');
        setPasswordError('');
        setEndpointSuccess('');
        setEndpointError('');

        await handleLogin(e);
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = {
            email: email,
            password: password
        };

        try {
            const response = await login(data);
            const userId = response.id;
            const userAdmin = response.user_admin.toString().toLowerCase();
            const access_token = response.access_token;
            const refresh_token = response.refresh_token;

            Cookies.set('access_token', access_token, { expires: 1, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
            Cookies.set('refresh_token', refresh_token, { expires: 7, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });

            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('userAdmin', userAdmin);
            await getUserDetails({ variables: { id: userId } });
            loginContext();
            setSnackbarOpen(true);
            handleClose();
        } catch (error) {
            if (error instanceof Error) {
                setEndpointError(error.message);
            } else {
                setEndpointError('Error inesperado');
            }
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    const logoUrl = import.meta.env.VITE_LOGO as string;

    return (
        <div className="overflow-auto">
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className="flex items-center justify-center overflow-y-auto"
            >
                <Box className="bg-white rounded shadow-lg p-6 w-full max-w-md mx-auto overflow-y-auto">
                    <div className="flex justify-between items-center">
                        <div></div>
                        <IconButton onClick={handleClose} sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            '&:hover': { backgroundColor: '#a57ee8' }
                        }}>
                            <Close />
                        </IconButton>
                    </div>
                    <div className="flex flex-col items-center pb-4 border-bottom">
                        <img src={logoUrl} alt="Logo" className="w-20 mb-2" />
                        <div className="text-lg font-medium">Ingresa a tu cuenta</div>
                    </div>
                    <form onSubmit={handleSubmit}>
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
                        <CustomInput
                            value={password}
                            setValue={setPassword}
                            valueError={passwordError}
                            setFocusedInput={setFocusedInput}
                            focusedInput={focusedInput}
                            id="password"
                            label="Contraseña"
                            placeholder="Contraseña"
                            icon={Lock}
                            focusText="password"
                            type="password"
                            required={true}
                        />

                        {endpointError && (
                            <Alert severity="error">{endpointError}</Alert>
                        )}
                        <div className="mt-4">
                            <BaseButton label="Iniciar sesión" className="w-full text-center" />
                        </div>
                    </form>
                    <div className="mt-2 text-center">
                        <MuiLink
                            component={RouterLink}
                            to="/create-account"
                            color="inherit"
                            onClick={handleClose}
                            sx={{
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                                textDecoration: 'none',
                            }}>
                            ¿No posees cuenta?</MuiLink>
                    </div>
                    <div className="mt-2 text-center">
                        <ResetPasswordNewToken/>
                    </div>
                </Box>
            </Modal>
            {snackbarOpen && (
                <CustomSnackBar
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                    message={`¡Hola, ${error ? ':) ' : userData?.getUser.fullname}! Bienvenido a Tecito Store!`}
                    type={error ? 'error' : 'success'}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                />
            )}
        </div>
    );
};

export default LoginModal;
