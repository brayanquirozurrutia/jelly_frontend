import useEditDialogOpen from "./Commons/useEditDialogOpen";
import useErrorAndSuccessValidation from "./Commons/useErrorAndSuccessValidation.ts";
import useSnackbarValidation from "./Commons/useSnackbarValidation.ts";
import useRefreshTableValidation from "./Commons/useRefreshTableValidation.ts";
import {useState} from "react";
import {BannerPhrase} from "../types.ts";

const usePhraseForm = () => {
    const [
        selectedObject,
        setSelectedObject] = useState<BannerPhrase | null>(null);

    const {
        editDialogOpen,
        setEditDialogOpen
    } = useEditDialogOpen();

    const {
        endpointError,
        setEndpointError,
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

    return {
        editDialogOpen,
        setEditDialogOpen,
        selectedObject,
        setSelectedObject,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        snackbarOpen,
        setSnackbarOpen,
        refreshTable,
        setRefreshTable
    };

}

export default usePhraseForm;
