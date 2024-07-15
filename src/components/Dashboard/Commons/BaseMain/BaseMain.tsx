import React, { useState, useCallback } from "react";
import BaseCreate from "../BaseCreate";
import BaseView from "../BaseView/BaseView.tsx";
import BaseDelete from "../BaseDelete";
import BaseEdit from "../BaseEdit";
import type { ObjectType } from "../../../../types";
import CustomSnackBar from "../../../commons/CustomSnackBar";
import {DocumentNode} from "@apollo/client";

interface MainProps {
    componentName: string;
    createEndpoint: (data: { name: string; description: string; }) => Promise<ObjectType>;
    deleteEndpoint: (id: string) => Promise<void>;
    viewEndpoint: DocumentNode;
    listObjects: string;
    totalObjects: string;
    editEndpoint: (id: string, data: { name: string; description: string; }) => Promise<ObjectType>;
}

const BaseMain: React.FC<MainProps> = (
    {
        componentName,
        createEndpoint,
        deleteEndpoint,
        viewEndpoint,
        listObjects,
        totalObjects,
        editEndpoint,
    }
) => {
    const [selectedObject, setSelectedObject] = useState<ObjectType | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [endpointSuccess, setEndpointSuccess] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleRefreshTable = useCallback(() => {
        setRefreshTable(prev => !prev);
    }, []);

    const handleEdit= (object: ObjectType) => {
        setSelectedObject(object);
        setEditDialogOpen(true);
        setRefreshTable(false)
    };

    const handleDelete = (object: ObjectType) => {
        setSelectedObject(object);
        setDeleteDialogOpen(true);
        setRefreshTable(false)
    };

    const handleUpdated = () => {
        setEditDialogOpen(false);
        setEndpointSuccess('Actualización exitosa');
        setSnackbarOpen(true);
        handleRefreshTable();
    };

    const handleDeleted = () => {
        setDeleteDialogOpen(false);
        setEndpointSuccess('Eliminación exitosa');
        setSnackbarOpen(true);
        handleRefreshTable();
    };

    return (
        <div>
            <CustomSnackBar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={endpointSuccess}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                type="success"
            />
            <BaseCreate
                onCreated={handleRefreshTable}
                createEndpoint={createEndpoint}
                componentName={componentName}
            />
            <BaseView
                onEdit={handleEdit}
                onDelete={handleDelete}
                refreshTable={refreshTable}
                componentName={componentName}
                viewEndpoint={viewEndpoint}
                listObjects={listObjects}
                totalObjects={totalObjects}
            />
            <BaseEdit
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                object={selectedObject}
                onUpdated={handleUpdated}
                editEndpoint={editEndpoint}
                componentName={componentName}
            />
            <BaseDelete
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                object={selectedObject}
                onDeleted={handleDeleted}
                deleteEndpoint={deleteEndpoint}
                componentName={componentName}
            />
        </div>
    );
}

export default BaseMain
