import React, {useCallback} from "react";
import CreatePhrase from "./Create";
import ViewPhrase from "./View";
import EditPhrase from "./Edit";
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
        snackbarOpen
    } = usePhraseForm();

    const handleRefreshTable = useCallback(() => {
        setRefreshTable(prev => !prev);
    }, [setRefreshTable]);

    const handleEdit= (object: BannerPhrase) => {
        setSelectedObject(object);
        setEditDialogOpen(true);
        setRefreshTable(false)
    };

    const handleUpdated = () => {
        setEditDialogOpen(false);
        setEndpointSuccess('Actualización exitosa');
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
                refreshTable={refreshTable}
            />
            <EditPhrase
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                object={selectedObject}
                onUpdated={handleUpdated}
            />
        </div>
    );
}

export default Phrases;
