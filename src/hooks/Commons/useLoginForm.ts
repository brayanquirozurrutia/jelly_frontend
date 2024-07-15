import useEmailValidation from "./useEmailValidation.ts";
import usePasswordValidation from "./usePasswordValidation.ts";
import useFocusedInputValidation from "./useFocusedInputValidation.ts";
import useSnackbarValidation from "./useSnackbarValidation.ts";
import useErrorAndSuccessValidation from "./useErrorAndSuccessValidation.ts";

const useLoginForm = () => {
    const {
        email,
        setEmail,
        emailError,
        setEmailError,
    } = useEmailValidation();

    const {
        password,
        setPassword,
        passwordError,
        setPasswordError,
    } = usePasswordValidation();

    const {
        focusedInput,
        setFocusedInput,
    } = useFocusedInputValidation();

    const {
        snackbarOpen,
        setSnackbarOpen,
    } = useSnackbarValidation();

    const {
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
    } = useErrorAndSuccessValidation();

    return {
        email,
        setEmail,
        emailError,
        setEmailError,
        password,
        setPassword,
        passwordError,
        setPasswordError,
        focusedInput,
        setFocusedInput,
        snackbarOpen,
        setSnackbarOpen,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
    };
}

export default useLoginForm;
