import React, { useState } from 'react';
import { Modal, Link as MuiLink, Snackbar, TextField, InputAdornment, IconButton, Alert, Box, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Email, Lock, Close } from '@mui/icons-material';
import BaseButton from '../BaseButton';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../../../graphql/users/queries';
import { login } from "../../../services";

interface LoginModalProps {
    show: boolean;
    handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ email: boolean; password: boolean }>({
        email: false,
        password: false,
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [getUserDetails, { data: userData }] = useLazyQuery(GET_USER_DETAILS);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

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
            const data = await login(email, password);
            if (data) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user_id', data.id);
                document.cookie = `refresh_token=${data.refresh_token}; path=/; secure; samesite=strict;`;
                await getUserDetails({ variables: { id: data.id } });
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
                            href="#"
                            color="inherit"
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={Fade}
            >
                <div className="flex items-center bg-purple1 text-black p-2 rounded shadow-md font-bold hover:bg-purple2">
                    <div className="mr-2">
                        <img src={heartFinger} alt="Heart finger" className="w-8" />
                    </div>
                    <div className="pr-2">
                        ¡Hola, {userData?.getUser.fullname}! Bienvenido a Tecito Store
                    </div>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
                        <CloseIcon
                            fontSize="small"
                        />
                    </IconButton>
                </div>
            </Snackbar>
        </>
    );
};

export default LoginModal;
