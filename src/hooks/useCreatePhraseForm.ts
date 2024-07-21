import useLoadingValidation from "./Commons/useLoadingValidation.ts";
import useErrorAndSuccessValidation from "./Commons/useErrorAndSuccessValidation.ts";
import useSnackbarValidation from "./Commons/useSnackbarValidation.ts";
import useCollapseValidation from "./Commons/useCollapseValidation.ts";
import useFocusedInputValidation from "./Commons/useFocusedInputValidation.ts";
import usePhraseValidation from "./Commons/usePhraseValidation.ts";

const useCreatePhraseForm = () => {

    const {
        phrase,
        setPhrase,
        phraseError,
        setPhraseError
    } = usePhraseValidation();

    const {
        snackbarOpen,
        setSnackbarOpen
    } = useSnackbarValidation();

    const {
        loading,
        setLoading
    } = useLoadingValidation();

    const {
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
    } = useErrorAndSuccessValidation();

    const {
        collapseOpen,
        setCollapseOpen
    } = useCollapseValidation();

    const {
        focusedInput,
        setFocusedInput
    } = useFocusedInputValidation();

    return {
        phrase,
        setPhrase,
        loading,
        setLoading,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        snackbarOpen,
        setSnackbarOpen,
        collapseOpen,
        setCollapseOpen,
        phraseError,
        setPhraseError,
        focusedInput,
        setFocusedInput
    }
}

export default useCreatePhraseForm;
