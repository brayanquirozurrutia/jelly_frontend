import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Collapse, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Skeleton from 'react-loading-skeleton';
import { useLazyQuery } from '@apollo/client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-loading-skeleton/dist/skeleton.css';
import { ObjectType } from '../../../../types';
import { DocumentNode } from '@apollo/client';

interface ViewProps {
    onEdit: (object: ObjectType) => void;
    onDelete: (object: ObjectType) => void;
    refreshTable: boolean;
    componentName: string;
    viewEndpoint: DocumentNode;
    listObjects: string;
    totalObjects: string;
}

const ViewGroups: React.FC<ViewProps> = (
    {
        onEdit,
        onDelete,
        refreshTable,
        componentName,
        viewEndpoint,
        listObjects,
        totalObjects,
    }
    ) => {
    const [viewCollapseOpen, setViewCollapseOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 5;

    const [fetchObjects, { loading, data, error }] = useLazyQuery(viewEndpoint, {
        variables: {
            search,
            page,
            pageSize: PAGE_SIZE
        },
        fetchPolicy: 'cache-and-network'
    });

    useEffect(() => {
        if (viewCollapseOpen || refreshTable) {
            fetchObjects().then(r => r);
        }
    }, [viewCollapseOpen, page, search, refreshTable, fetchObjects]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleViewCollapseOpen = () => {
        setViewCollapseOpen(!viewCollapseOpen);
    };

    return (
        <div className="p-2 rounded-lg border-2 shadow-md">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={handleViewCollapseOpen}
            >
                <Typography variant="h5" component="h2" className="font-bold p-2">
                    Ver {componentName}s
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
                <TextField
                    fullWidth
                    label={`Buscar ${componentName}`}
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                    className="mb-2 mt-2"
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
                />
                {error && <p>Error al cargar {componentName}: {error.message}</p>}
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
                                    {data[listObjects]?.map((object: ObjectType) => (
                                        <TableRow key={object.id}>
                                            <TableCell>{object.id}</TableCell>
                                            <TableCell>{object.name}</TableCell>
                                            <TableCell>{object.description}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() => onEdit(object)}
                                                    className="hover:text-purple1"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => onDelete(object)}
                                                    className="hover:text-purple1"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                count={Math.ceil(data[totalObjects] / PAGE_SIZE)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                className="mt-2"
                            />
                        </TableContainer>
                    )
                )}
            </Collapse>
        </div>
    );
};

export default ViewGroups;
