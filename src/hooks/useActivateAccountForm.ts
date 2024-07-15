import useEmailValidation from "./Commons/useEmailValidation.ts";
import useTokenValidation from "./Commons/useTokenValidation.ts";
import useErrorAndSuccessValidation from "./Commons/useErrorAndSuccessValidation.ts";
import useCountdownValidation from "./Commons/useCountdownValidation.ts";
import useSnackbarValidation from "./Commons/useSnackbarValidation.ts";
import useFocusedInputValidation from "./Commons/useFocusedInputValidation.ts";
import { CountDownProps } from "../types.ts";

const useActivateAccountForm = ({ initialCountdown, onCountdownEnd }: CountDownProps) => {
    const {
        email,
        setEmail,
        emailError,
        setEmailError,
    } = useEmailValidation();

    const {
        token,
        setToken,
        tokenError,
        setTokenError,
    } = useTokenValidation();

    const {
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
    } = useErrorAndSuccessValidation();

    const {
        countdown,
        startCountdown,
    } = useCountdownValidation(
        initialCountdown,
        onCountdownEnd,
        setEndpointSuccess
    );

    const {
        snackbarOpen,
        setSnackbarOpen
    } = useSnackbarValidation();

    const {
        focusedInput,
        setFocusedInput,
    } = useFocusedInputValidation();

    return {
        email,
        setEmail,
        emailError,
        setEmailError,
        token,
        setToken,
        tokenError,
        setTokenError,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        countdown,
        startCountdown,
        snackbarOpen,
        setSnackbarOpen,
        focusedInput,
        setFocusedInput,
    }
}

export default useActivateAccountForm;
