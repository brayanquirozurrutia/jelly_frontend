import useErrorAndSuccessValidation from "./Commons/useErrorAndSuccessValidation.ts";
import useLoadingValidation from "./Commons/useLoadingValidation.ts";

const useDeletePhraseForm = () => {

    const {
        endpointError,
        setEndpointError
    } = useErrorAndSuccessValidation();

    const {
        loading,
        setLoading
    } = useLoadingValidation();

    return {
        endpointError,
        setEndpointError,
        loading,
        setLoading
    }

}

export default useDeletePhraseForm;
