import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    TableFooter,
    TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { GenericObject } from "../../../types";
import { isImageUrl } from "../../../utils/stringUtils";
import {Link} from "react-router-dom";

interface DataTableProps<T> {
    data: T[];
    onEdit: (object: T) => void;
    onDelete: (object: T) => void;
    columnNames: string[];
    columnKeys: (keyof T)[];
    pagination?: {
        count: number;
        page: number;
        rowsPerPage: number;
        onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    };
    redirectOnImageClick?: string;
}

const TableCRUD = <T extends GenericObject>(
    {
        data,
        onEdit,
        onDelete,
        columnNames,
        columnKeys,
        pagination,
        redirectOnImageClick,
    }: DataTableProps<T>) => {

    return (
        <TableContainer>
            <Table>
                <TableHead
                    sx={{
                        "& .MuiTableCell-root": {
                            color: "black",
                            fontWeight: "bold",
                        },
                    }}
                >
                    <TableRow
                    >
                        {columnNames.map((name, index) => (
                            <TableCell
                                key={index}
                            >
                                {name}
                            </TableCell>
                        ))}
                        <TableCell
                        >Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            {columnKeys.map((key) => (
                                <TableCell key={key as string}>
                                    {isImageUrl(String(item[key])) ? (
                                        redirectOnImageClick ? (
                                            <Link to={`${redirectOnImageClick}/${item.id}`}>
                                                <img
                                                    src={String(item[key])}
                                                    alt="preview"
                                                    className="w-40 h-40 rounded"
                                                />
                                            </Link>
                                        ) : (
                                            <img
                                                src={String(item[key])}
                                                alt="preview"
                                                className="w-40 h-40 rounded"
                                            />
                                        )
                                    ) : (
                                        columnNames[columnKeys.indexOf(key)] === 'Precio' ? (
                                            `$${String(item[key])}`
                                        ) : (
                                            String(item[key])
                                        )
                                    )}
                                </TableCell>
                            ))}
                            <TableCell>
                                <IconButton onClick={() => onEdit(item)} className="hover:text-purple1">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(item)} className="hover:text-purple1">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {pagination && (
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={pagination.count}
                                page={pagination.page}
                                rowsPerPage={pagination.rowsPerPage}
                                onPageChange={pagination.onPageChange}
                                rowsPerPageOptions={[pagination.rowsPerPage]}
                                sx={{
                                    "& .MuiTablePagination-actions button": {
                                        color: "#a57ee8",
                                        "&:hover": {
                                            backgroundColor: "#f3e8ff",
                                        },
                                    },
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </TableContainer>
    );
}

export default TableCRUD;
