import React, { useState } from 'react';
import { Modal, Link as MuiLink, TextField, InputAdornment, IconButton, Alert, Box } from '@mui/material';
import { Email, Lock, Close } from '@mui/icons-material';
import BaseButton from '../BaseButton';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../../../graphql/users/queries';
import { login } from "../../../services/Auth";
import { validateEmail } from '../../../utils/validations';
import { Link as RouterLink } from 'react-router-dom';
import CustomSnackBar from "../CustomSnackBar";
import {useAuth} from "../../../auth/AuthContext.tsx";

interface LoginModalProps {
    show: boolean;
    handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
    const { authenticateUser, authenticateAdmin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ email: boolean; password: boolean }>({
        email: false,
        password: false,
    });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [getUserDetails, { data: userData, error }] = useLazyQuery(GET_USER_DETAILS);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailValid = validateEmail(email);
        const passwordValid = password.length > 0;

        if (!emailValid || !passwordValid) {
            setErrors({
                email: !emailValid,
                password: !passwordValid,
            });
            return;
        }

        try {
            const data = await login({ email, password });
            if (data) {
                sessionStorage.setItem('user_id', data.id);
                await getUserDetails({ variables: { id: data.id } });
                const isAdmin = data.user_admin;

                if (isAdmin) {
                    authenticateAdmin();
                } else {
                    authenticateUser();
                }
                setSnackbarOpen(true);
            }

            setErrors({ email: false, password: false });
            setEmail('');
            setPassword('');
            setErrorMessage('');
            handleClose();
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Error inesperado');
            }
        }
    };

    const logoUrl = import.meta.env.VITE_LOGO as string;
    const heartFinger = import.meta.env.VITE_HEART_ICON as string;

    return (
        <>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className="flex items-center justify-center"
            >
                <Box className="bg-white rounded shadow-lg p-6 w-full max-w-md mx-auto">
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
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="formBasicEmail"
                            label="Correo"
                            type="email"
                            placeholder="correo@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                            required
                            error={errors.email}
                            helperText={errors.email ? "Ingrese un correo válido" : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: focusedInput === 'email' ? '#a57ee8' : '' }} />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#be87e7',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: errors.email ? 'red' : '#a57ee8',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'black',
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="formBasicPassword"
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                            required
                            error={errors.password}
                            helperText={errors.password ? "Ingrese una contraseña válida" : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: focusedInput === 'password' ? '#a57ee8' : '' }} />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#be87e7',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: errors.password ? 'red' : '#a57ee8',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'black',
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
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
                </Box>
            </Modal>
            <CustomSnackBar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                backgroundColor="#be87e7"
                iconUrl={heartFinger}
                message={`¡Hola, ${error? ':) ' : userData?.getUser.fullname}!
                    Bienvenido a Tecito Store!`}
                hoverBackgroundColor="#a57ee8"
            />
        </>
    );
};

export default LoginModal;
