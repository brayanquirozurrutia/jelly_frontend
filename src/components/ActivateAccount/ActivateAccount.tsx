import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Typography, Alert, AlertTitle, Button, Collapse } from '@mui/material';
import BaseButton from "../commons/BaseButton";
import { activateAccount, activateAccountNewToken } from "../../services/Auth";
import { validateEmail } from "../../utils/validations";

const ActivateAccount: React.FC = () => {
    const [email, setEmail] = useState('');
    const [activateAccountToken, setActivateAccountToken] = useState('');
    const [emailError, setEmailError] = useState('');
    const [activateAccountTokenError, setActivateAccountTokenError] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activateAccountSuccess, setActivateAccountSuccess] = useState(false);
    const [resendEmail, setResendEmail] = useState('');
    const [resendEmailError, setResendEmailError] = useState('');
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [timer, setTimer] = useState<number | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const navigate = useNavigate();
    const logoUrl = import.meta.env.VITE_LOGO as string;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer !== null && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer !== null ? prevTimer - 1 : null));
            }, 1000);
        } else if (timer === 0) {
            setIsButtonDisabled(false);
            setTimer(null);
        }
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (error || success) {
            const timerId = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 6000);
            return () => clearTimeout(timerId);
        }
    }, [error, success]);

    useEffect(() => {
        let countdownInterval: NodeJS.Timeout;

        if (success && countdown > 0 && activateAccountSuccess) {
            countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            navigate('/');
        }

        return () => clearInterval(countdownInterval);
    }, [success, countdown, navigate, activateAccountSuccess]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        setActivateAccountTokenError('');
        setError('');

        let valid = true;

        if (email === '') {
            setEmailError('El correo es requerido');
            valid = false;
        }
        if (!validateEmail(email)) {
            setEmailError('Correo inválido');
            valid = false;
        }
        if (activateAccountToken.length !== 6) {
            setActivateAccountTokenError('El token debe tener 6 caracteres de largo');
            valid = false;
        }

        if (valid) {
            await handleActivateAccount();
        }
    }

    const handleActivateAccount = async () => {
        const data = {
            email,
            account_activation_token: activateAccountToken,
        };

        try {
            const response = await activateAccount(data);
            setSuccess(response.message);
            setActivateAccountSuccess(true)
            setCountdown(5);
            setEmail('');
            setActivateAccountToken('');
            setEmailError('');
            setActivateAccountTokenError('');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Error al activar la cuenta');
            }
        }
    }

    const handleResendToken = async (e: React.FormEvent) => {
        e.preventDefault();
        setResendEmailError('');

        if (resendEmail === '') {
            setResendEmailError('El correo es requerido');
            return;
        }
        if (!validateEmail(resendEmail)) {
            setResendEmailError('Correo inválido');
            return;
        }

        const data = {
            email: resendEmail,
        };

        try {
            const response = await activateAccountNewToken(data);
            setSuccess(response.message)
            setResendEmail('');
            setCollapseOpen(false);
            setIsButtonDisabled(true);
            setTimer(60);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Error al reenviar el token');
            }
        }
    }

    const textFieldStyles = (error: boolean) => ({
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#be87e7',
            },
            '&.Mui-focused fieldset': {
                borderColor: error ? 'red' : '#a57ee8',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'black',
            fontWeight: 'bold',
        },
    });

    return (
        <div className="flex">
            <div className="bg-purple2 h-screen hidden lg:block basis-1/2">
                <img src={logoUrl} alt="Logo Tecito Store" className="w-1/2 mx-auto mt-4"/>
                <Typography variant="h4" className="text-center text-clack mt-4">Tu tienda favorita</Typography>
            </div>
            <div className="basis-full lg:basis-1/2 px-4 mt-4 lg:mt-0 lg:px-0 flex flex-col items-center">
                {error && (
                    <Alert severity="error" onClose={() => setError('')} className="mb-4">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" onClose={() => setSuccess('')} className="mb-4">
                        <AlertTitle>Éxito</AlertTitle>
                        {success} {activateAccountSuccess && `Redirigiendo en ${countdown} segundos`}
                    </Alert>
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
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                error={emailError !== ''}
                                helperText={emailError}
                                sx={textFieldStyles(emailError !== '')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Código de activación"
                                value={activateAccountToken}
                                onChange={(e) => setActivateAccountToken(e.target.value)}
                                required
                                error={activateAccountTokenError !== ''}
                                helperText={activateAccountTokenError}
                                inputProps={{maxLength: 6}}
                                sx={textFieldStyles(activateAccountTokenError !== '')}
                            />
                        </Grid>
                        <Grid item xs={12} className="text-center">
                            <BaseButton
                                label="Activar cuenta"
                                className="w-full lg:w-3/5"
                            />
                        </Grid>
                    </Grid>
                </form>
                <Grid container spacing={2} className="mt-4">
                    <Grid item xs={12} className="text-center">
                        <Button
                            onClick={() => setCollapseOpen(!collapseOpen)}
                            className="mt-2 bg-transparent text-black"
                            disabled={isButtonDisabled}
                        >
                            {isButtonDisabled ? `Espera ${timer} segundos` : 'Nuevo código'}
                        </Button>
                    </Grid>
                    <Collapse in={collapseOpen} timeout={200} unmountOnExit className="p-4 w-full">
                        <form onSubmit={handleResendToken}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Correo"
                                    value={resendEmail}
                                    onChange={(e) => setResendEmail(e.target.value)}
                                    required
                                    error={resendEmailError !== ''}
                                    helperText={resendEmailError}
                                    sx={textFieldStyles(resendEmailError !== '')}
                                />
                            </Grid>
                            <Grid item xs={12} className="text-center mt-2">
                                <BaseButton
                                    label="Enviar"
                                    className="w-full lg:w-3/5"
                                    disabled={isButtonDisabled}
                                />
                            </Grid>
                        </form>
                    </Collapse>
                </Grid>
            </div>
        </div>
    );
}

export default ActivateAccount;
