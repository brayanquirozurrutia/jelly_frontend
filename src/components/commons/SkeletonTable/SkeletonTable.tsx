import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

interface LoadingTableProps {
    columnCount: number;
}

const SkeletonTable: React.FC<LoadingTableProps> = ({ columnCount }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {Array.from({ length: columnCount }).map((_, index) => (
                            <TableCell key={index}><Skeleton /></TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {Array.from({ length: columnCount }).map((_, index) => (
                            <TableCell key={index}><Skeleton /></TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SkeletonTable;
