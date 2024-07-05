import React, { useState } from 'react';
import {
    TextField, Typography, Grid, Collapse, IconButton, Table, TableContainer,
    TableHead, TableBody, TableRow, TableCell, Pagination
} from '@mui/material';
import { createGroup } from '../../../services/Product';
import BaseButton from "../../commons/BaseButton";
import CustomSnackBar from "../../commons/CustomSnackBar";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLazyQuery } from '@apollo/client';
import { GET_GROUPS } from '../../../graphql/products/queries.ts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Group {
    id: string;
    name: string;
    description: string;
}

const Groups: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [createCollapseOpen, setCreateCollapseOpen] = useState(false);
    const [viewCollapseOpen, setViewCollapseOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 5;

    const [fetchGroups, { loading, data, error }] = useLazyQuery(GET_GROUPS, {
        variables: { search: search, page: page, pageSize: PAGE_SIZE },
        fetchPolicy: 'cache-and-network'
    });

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

        try {
            setIsSubmitting(true);
            await createGroup({ name, description });
            setSnackbarOpen(true);
            setTimeout(() => {
                setIsSubmitting(false);
            }, 5000);
        } catch (error) {
            setIsSubmitting(false);
        }

        setName('');
        setDescription('');
    };

    // Estilos para los campos de texto
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

    // Maneja la apertura y carga de grupos al expandir la sección de ver grupos
    const handleViewCollapseOpen = async () => {
        if (!viewCollapseOpen) {
            try {
                await fetchGroups();
            } catch (error) {
                console.error('Error al cargar los grupos:', error);
            }
        }
        setViewCollapseOpen(!viewCollapseOpen);
    };

    // Maneja la edición de un grupo específico
    const handleEditGroup = (groupId: string) => {
        console.log('Editar grupo con ID:', groupId);
    };

    // Maneja la eliminación de un grupo específico
    const handleDeleteGroup = (groupId: string) => {
        console.log('Eliminar grupo con ID:', groupId);
    };

    // Maneja el cambio en el campo de búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1); // Reinicia la página a 1 al cambiar la búsqueda
    };

    // Maneja el cambio de página en la paginación
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div>
            {/* Sección para crear un nuevo grupo */}
            <div className="p-2 rounded-lg border-2 shadow-md mb-2">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setCreateCollapseOpen(!createCollapseOpen)}
                >
                    <Typography variant="h5" component="h2" className="font-bold p-2">
                        Nuevo grupo
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
                                    label="Crear grupo"
                                    className="w-full lg:w-3/5"
                                    disabled={isSubmitting}
                                />
                            </Grid>
                        </Grid>
                    </form>
                    {/* Snackbar personalizado para mostrar mensaje de creación exitosa */}
                    <CustomSnackBar
                        open={snackbarOpen}
                        onClose={() => setSnackbarOpen(false)}
                        message="Grupo creado exitosamente"
                        iconUrl={import.meta.env.VITE_HEART_ICON as string}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        backgroundColor="#be87e7"
                        hoverBackgroundColor="#a57ee8"
                    />
                </Collapse>
            </div>

            {/* Sección para ver grupos existentes */}
            <div className="p-2 rounded-lg border-2 shadow-md">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={handleViewCollapseOpen}
                >
                    <Typography variant="h5" component="h2" className="font-bold p-2">
                        Ver grupos
                    </Typography>
                    <IconButton
                        aria-label="expand view form"
                        className="mx-2 text-black"
                        sx={{
                            '&:hover': { backgroundColor: '#a57ee8' }
                        }}
                    >
                        {viewCollapseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </div>
                <Collapse in={viewCollapseOpen} timeout="auto" unmountOnExit>
                    {/* Campo de búsqueda */}
                    <TextField
                        fullWidth
                        label="Buscar grupo"
                        variant="outlined"
                        value={search}
                        onChange={handleSearchChange}
                        sx={{ marginBottom: '16px' }}
                    />

                    {/* Manejo de errores */}
                    {error && <p>Error al cargar los grupos: {error.message}</p>}

                    {/* Indicador de carga */}
                    {loading ? (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...Array(PAGE_SIZE)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Skeleton /></TableCell>
                                            <TableCell><Skeleton /></TableCell>
                                            <TableCell><Skeleton /></TableCell>
                                            <TableCell><Skeleton /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        // Mostrar datos de grupos si no hay carga ni errores
                        data && (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Descripción</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Mapeo de grupos */}
                                        {data?.listGroups.map((group: Group) => (
                                            <TableRow key={group.id}>
                                                <TableCell>{group.id}</TableCell>
                                                <TableCell>{group.name}</TableCell>
                                                <TableCell>{group.description}</TableCell>
                                                {/* Botones de edición y eliminación */}
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="edit"
                                                        onClick={() => handleEditGroup(group.id)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => handleDeleteGroup(group.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {/* Paginación */}
                                <Pagination
                                    count={Math.ceil(data.totalGroups / PAGE_SIZE)}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    className="mt-4"
                                />
                            </TableContainer>
                        )
                    )}
                </Collapse>
            </div>
        </div>
    );
};

export default Groups;
