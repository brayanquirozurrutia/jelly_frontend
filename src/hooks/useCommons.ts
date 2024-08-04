import useBooleanValidation from "./Commons/useBooleanValidation.ts";
import useStringValidation from "./Commons/useStringValidation.ts";
import {useState} from "react";

const useCommons = () => {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const {
        value: snackbarOpen,
        setValue: setSnackbarOpen,
    } = useBooleanValidation('snackbarOpen')

    const {
        value: endpointError,
        setValue: setEndpointError,
    } = useStringValidation('endpointError')

    const {
        value: endpointSuccess,
        setValue: setEndpointSuccess,
    } = useStringValidation('endpointSuccess')

    const {
        value: loading,
        setValue: setLoading,
    } = useBooleanValidation('loading')

    return {
        snackbarOpen,
        setSnackbarOpen,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        loading,
        setLoading,
        focusedInput,
        setFocusedInput,
    }
}

export default useCommons;
