import React, {useCallback} from "react";
import CreatePhrase from "./Create";
import ViewPhrase from "./View";
import EditPhrase from "./Edit";
import usePhraseForm from "../../../../hooks/usePhraseForm.ts";
import type {BannerPhrase} from "../../../../types.ts";

const Phrases: React.FC = () => {
    const {
        editDialogOpen,
        setEditDialogOpen,
        selectedObject,
        setSelectedObject,
        endpointSuccess,
        setEndpointSuccess,
        setSnackbarOpen,
        setRefreshTable
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
            <CreatePhrase />
            <ViewPhrase
                onEdit={handleEdit}
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
