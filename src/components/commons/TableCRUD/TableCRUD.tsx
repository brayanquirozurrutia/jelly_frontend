import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BannerPhrase } from '../../../types';

interface DataTableProps {
    data: BannerPhrase[];
    onEdit: (object: BannerPhrase) => void;
    onDelete: (object: BannerPhrase) => void;
    columnNames: string[];
}

const TableCRUD: React.FC<DataTableProps> = ({ data, onEdit, onDelete, columnNames }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columnNames.map((name, index) => (
                            <TableCell key={index}>{name}</TableCell>
                        ))}
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((phrase) => (
                        <TableRow key={phrase.id}>
                            <TableCell>{phrase.id}</TableCell>
                            <TableCell>{phrase.phrase}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(phrase)} className="hover:text-purple1">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(phrase)} className="hover:text-purple1">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableCRUD;
