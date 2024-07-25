import React, {useCallback} from "react";
import CreatePhrase from "./Create";
import ViewPhrase from "./View";
import EditPhrase from "./Edit";
import DeletePhrase from "./Delete";
import usePhraseForm from "../../../../hooks/usePhraseForm.ts";
import type {BannerPhrase} from "../../../../types.ts";
import CustomSnackBar from "../../../commons/CustomSnackBar";

const Phrases: React.FC = () => {
    const {
        editDialogOpen,
        setEditDialogOpen,
        selectedObject,
        setSelectedObject,
        endpointSuccess,
        setEndpointSuccess,
        setSnackbarOpen,
        setRefreshTable,
        refreshTable,
        snackbarOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
    } = usePhraseForm();

    const handleRefreshTable = useCallback(() => {
        setRefreshTable(prev => !prev);
    }, [setRefreshTable]);

    const handleEdit= (object: BannerPhrase) => {
        setSelectedObject(object);
        setEditDialogOpen(true);
        setRefreshTable(false)
    };

    const handleDelete = (object: BannerPhrase) => {
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
            <CreatePhrase
                onCreated={handleRefreshTable}
            />
            <ViewPhrase
                onEdit={handleEdit}
                onDelete={handleDelete}
                refreshTable={refreshTable}
            />
            <EditPhrase
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                object={selectedObject}
                onUpdated={handleUpdated}
            />
            <DeletePhrase
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                object={selectedObject}
                onDeleted={handleDeleted}
            />
        </div>
    );
}

export default Phrases;
