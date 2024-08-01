import useStringValidation from "../../../../../hooks/Commons/useStringValidation.ts";
import useNumberValidation from "../../../../../hooks/Commons/useNumberValidation.ts";
import useFocusedInputValidation from "../../../../../hooks/Commons/useFocusedInputValidation.ts";
import useBooleanValidation from "../../../../../hooks/Commons/useBooleanValidation.ts";
import {SelectedProductToDisable} from "../types/CreateProduct.types.ts";
import {useState} from "react";

const useListProducts = () => {

    const [
        selectedProductToDisable,
        setSelectedProductToDisable
    ] = useState<SelectedProductToDisable | null>(null);

    const {
        value: search,
        setValue: setSearch,
    } = useStringValidation('search')

    const {
        value: page,
        setValue: setPage,
    } = useNumberValidation('page')

    const {
        focusedInput,
        setFocusedInput,
    } = useFocusedInputValidation();

    const {
        value: isModalOpen,
        setValue: setIsModalOpen,
    } = useBooleanValidation('isModalOpen')

    const {
        value: endpointError,
        setValue: setEndpointError,
    } = useStringValidation('endpointError')

    const {
        value: endpointSuccess,
        setValue: setEndpointSuccess,
    } = useStringValidation('endpointSuccess')

    const {
        value: snackbarOpen,
        setValue: setSnackbarOpen,
    } = useBooleanValidation('snackbarOpen')

    const {
        value: loading,
        setValue: setLoading,
    } = useBooleanValidation('loading')

    return {
        search,
        setSearch,
        page,
        setPage,
        focusedInput,
        setFocusedInput,
        isModalOpen,
        setIsModalOpen,
        selectedProductToDisable,
        setSelectedProductToDisable,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        snackbarOpen,
        setSnackbarOpen,
        loading,
        setLoading,
    };
}

export default useListProducts;
