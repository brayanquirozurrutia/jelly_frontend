import useEditDialogOpen from "./Commons/useEditDialogOpen";
import useDeleteDialogOpen from "./Commons/useDeleteDialogOpen.ts";
import useErrorAndSuccessValidation from "./Commons/useErrorAndSuccessValidation.ts";
import useSnackbarValidation from "./Commons/useSnackbarValidation.ts";
import useRefreshTableValidation from "./Commons/useRefreshTableValidation.ts";
import {useState} from "react";
import {BannerPhrase} from "../components/Dashboard/AdminApp/Phrases/View/ViewPhrase.types.ts";

const usePhraseForm = () => {
    const [
        selectedObject,
        setSelectedObject
    ] = useState<BannerPhrase | null>(null);

    const {
        editDialogOpen,
        setEditDialogOpen
    } = useEditDialogOpen();

    const {
        endpointSuccess,
        setEndpointSuccess,
    } = useErrorAndSuccessValidation();

    const {
        snackbarOpen,
        setSnackbarOpen,
    } = useSnackbarValidation();

    const {
        refreshTable,
        setRefreshTable,
    } = useRefreshTableValidation();

    const {
        deleteDialogOpen,
        setDeleteDialogOpen,
    } = useDeleteDialogOpen();

    return {
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
    };

}

export default usePhraseForm;
