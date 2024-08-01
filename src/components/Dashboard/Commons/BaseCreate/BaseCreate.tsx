import React, { useState } from 'react';
import { TextField, Typography, Grid, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BaseButton from '../../../commons/CustomButton';
import CustomSnackBar from "../../../commons/CustomSnackBar";
import { ObjectType } from '../../../../types';

interface CreateComponentProps {
    onCreated: () => void;
    createEndpoint: (data: { name: string; description: string; }) => Promise<ObjectType>;
    componentName: string;
}

const CreateComponent: React.FC<CreateComponentProps> = (
    {
        onCreated,
        createEndpoint,
        componentName
    }
) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [endpointSuccess, setEndpointSuccess] = useState('');
    const [endpointError, setEndpointError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [createCollapseOpen, setCreateCollapseOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (name.trim() === '') {
            setNameError(true);
            return;
        } else {
            setNameError(false);
        }

        if (description.trim() === '') {
            setDescriptionError(true);
            return;
        } else {
            setDescriptionError(false);
        }

        setIsSubmitting(true);

        try {
            await createEndpoint({ name, description });
            setEndpointError('');
            setEndpointSuccess('Creación exitosa');
            setSnackbarOpen(true);
            onCreated();
        } catch (error) {
            if (error instanceof Error) {
                setEndpointError(error.message);
            } else {
                setEndpointError('Error al crear' + componentName);
            }
            setSnackbarOpen(true);
        }

        setName('');
        setDescription('');

        setTimeout(() => {
            setIsSubmitting(false);
        }, 5000);
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
        <div className="p-2 rounded-lg border-2 shadow-md mb-2">
            <CustomSnackBar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={endpointError ? endpointError : endpointSuccess}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                type={endpointError ? 'error' : 'success'}
            />
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setCreateCollapseOpen(!createCollapseOpen)}
            >
                <Typography variant="h5" component="h2" className="font-bold p-2">
                    Crear {componentName}
                </Typography>
                <IconButton
                    aria-label="expand form"
                    className="mx-2 text-black"
                    sx={{
                        '&:hover': { backgroundColor: '#a57ee8' }
                    }}
                >
                    {createCollapseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>
            <Collapse in={createCollapseOpen} timeout="auto" unmountOnExit>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                variant="outlined"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                error={nameError}
                                helperText={nameError ? 'El nombre es requerido' : ''}
                                sx={textFieldStyles(nameError)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                label="Descripción"
                                variant="outlined"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                error={descriptionError}
                                helperText={descriptionError ? 'La descripción es requerida' : ''}
                                sx={textFieldStyles(descriptionError)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} className="text-center">
                            <BaseButton
                                label={`Crear ${componentName}`}
                                className="w-full lg:w-3/5"
                                disabled={isSubmitting}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Collapse>
        </div>
    );
};

export default CreateComponent;
