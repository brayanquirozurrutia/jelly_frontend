import React, { useState } from 'react';
import { TextField, Grid, Typography, FormControl, InputLabel , Select, MenuItem} from '@mui/material';
import { validateRut, validateEmail } from '../../utils/validations';
import BaseButton from '../commons/BaseButton';
import CustomPopover from "../commons/Popover";
import { capitalize } from '../../utils/stringUtils';
import { createUser } from "../../services";
import CustomSnackBar from "../commons/CustomSnackBar";

const CreateAccount: React.FC = () => {
    const [rut, setRut] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGenre] = useState('M');
    const [birthDate, setBirthDate] = useState('');
    const [nickname, setNickname] = useState('');
    const [rutError, setRutError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [birthDateError, setBirthDateError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarTitle, setSnackbarTitle] = useState('');
    const [snackbarIcon, setSnackbarIcon] = useState('');
    const [snackbarBackgroundColor, setSnackbarBackgroundColor] = useState('');
    const [snackbarHoverBackgroundColor, setSnackbarHoverBackgroundColor] = useState('');

    const sadPou = import.meta.env.VITE_SAD_POU_ICON as string;
    const heartFinger = import.meta.env.VITE_HEART_ICON as string;

    const handleCreateAccount = async () => {
        try {
            const cleanData = {
                rut: rut.trim(),
                first_name: capitalize(name.trim()),
                last_name: capitalize(lastName.trim()),
                email: email.trim(),
                password: password.trim(),
                gender: gender.toUpperCase(),
                birth_date: birthDate.trim(),
                password_2: confirmPassword.trim(),
                nickname: nickname.trim(),
            };
            const response = await createUser(cleanData);
            console.log(response);
            setSnackbarTitle('¡Cuenta creada!')
            setSnackbarMessage('Revisa tu correo electrónico para activar tu cuenta.')
            setSnackbarIcon(heartFinger)
            setSnackbarBackgroundColor('#be87e7');
            setSnackbarHoverBackgroundColor('#a57ee8')
            setSnackbarOpen(true);
            setRut('');
            setName('');
            setLastName('');
            setEmail('');
            setConfirmEmail('');
            setPassword('');
            setConfirmPassword('');
            setGenre('M');
            setBirthDate('');
            setNickname('');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setSnackbarMessage(errorMessage);
            setSnackbarTitle('Más triste que la ch@&%$#!')
            setSnackbarBackgroundColor('#f5f5f5');
            setSnackbarHoverBackgroundColor('#e0e0e0');
            setSnackbarIcon(sadPou);
            setSnackbarOpen(true);
        }
    };

    const validateBirthDate = (birthDate: string) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        if (age < 15) {
            setBirthDateError('La edad debe ser mayor a 15 años.');
            return false;
        } else if (age > 100) {
            setBirthDateError('La edad debe ser menor a 100 años.');
            return false;
        } else {
            setBirthDateError('');
            return true;
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (!validateRut(rut)) {
            setRutError('RUT inválido');
            isValid = false;
        } else {
            setRutError('');
        }

        if (!validateEmail(email)) {
            setEmailError('Correo electrónico inválido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!validateEmail(confirmEmail)) {
            setConfirmEmailError('Correo electrónico inválido');
            isValid = false;
        } else {
            setConfirmEmailError('');
        }

        if (email !== confirmEmail) {
            setConfirmEmailError('Los correos electrónicos no coinciden');
            isValid = false;
        }

        if (password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!validateBirthDate(birthDate)) {
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            await handleCreateAccount();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
    };

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
        <div className="px-4 py-4">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" className="text-center">Crear cuenta</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            sx={textFieldStyles(false)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Apellido"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            sx={textFieldStyles(false)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError !== ''}
                            helperText={emailError}
                            required
                            sx={textFieldStyles(emailError !== '')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Reingresar Email"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            error={confirmEmailError !== ''}
                            helperText={confirmEmailError}
                            required
                            sx={textFieldStyles(confirmEmailError !== '')}
                            onPaste={handlePaste}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={passwordError !== ''}
                            helperText={passwordError}
                            required
                            sx={textFieldStyles(passwordError !== '')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Reingresar contraseña"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={passwordError !== ''}
                            helperText={passwordError}
                            required
                            sx={textFieldStyles(passwordError !== '')}
                            onPaste={handlePaste}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Fecha de Nacimiento"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            error={birthDateError !== ''}
                            helperText={birthDateError}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            sx={textFieldStyles(birthDateError !== '')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            sx={textFieldStyles(false)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="rut"
                            label="RUT"
                            placeholder="12345678-9"
                            value={rut}
                            onChange={(e) => setRut(e.target.value)}
                            error={rutError !== ''}
                            helperText={rutError}
                            required
                            sx={textFieldStyles(rutError !== '')}
                            InputProps={{
                                endAdornment: (
                                    <CustomPopover
                                        popoverTitle="¿Por qué solicitamos tu RUT?"
                                        popoverContent="Necesitamos tu RUT para validar tu identidad y asegurarnos de que no hayas creado una cuenta previamente."
                                    />
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl
                            fullWidth
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#be87e7',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#a57ee8',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'black',
                                    fontWeight: 'bold',
                                },
                            }}
                        >
                            <InputLabel  component="legend">Género</InputLabel >
                            <Select
                                value={gender}
                                onChange={(e) => setGenre(e.target.value)}
                                label="Género"
                                required
                            >
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Femenino</MenuItem>
                                <MenuItem value="O">Otro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className="text-center">
                        <BaseButton
                            label="Crear cuenta"
                            className="w-full lg:w-3/5"
                        />
                    </Grid>
                </Grid>
            </form>
            <CustomSnackBar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                iconUrl={snackbarIcon}
                title={snackbarTitle}
                message={snackbarMessage}
                backgroundColor={snackbarBackgroundColor}
                hoverBackgroundColor={snackbarHoverBackgroundColor}
            />
        </div>
    );
};

export default CreateAccount;
