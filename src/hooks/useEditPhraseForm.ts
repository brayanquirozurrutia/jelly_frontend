import usePhraseValidation from "./Commons/usePhraseValidation.ts";
import useFocusedInputValidation from "./Commons/useFocusedInputValidation.ts";
import useErrorAndSuccessValidation from "./Commons/useErrorAndSuccessValidation.ts";
import useLoadingValidation from "./Commons/useLoadingValidation.ts";

const useEditPhraseForm = () => {

    const {
        phrase,
        setPhrase,
        phraseError,
        setPhraseError,
    } = usePhraseValidation();

    const {
        focusedInput,
        setFocusedInput
    } = useFocusedInputValidation();

    const {
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
    } = useErrorAndSuccessValidation();

    const {
        loading,
        setLoading
    } = useLoadingValidation();

    return {
        phrase,
        setPhrase,
        phraseError,
        setPhraseError,
        focusedInput,
        setFocusedInput,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        loading,
        setLoading
    }

}

export default useEditPhraseForm;
