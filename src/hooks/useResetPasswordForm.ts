import useActivateAccountForm from "./useActivateAccountForm.ts";
import useMatchPasswordValidation from "./Commons/useMatchPasswordValidation.ts";
import { CountDownProps } from "../types.ts";

const useResetPasswordForm = ({ initialCountdown, onCountdownEnd }: CountDownProps) => {
    const {
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
    } = useActivateAccountForm(
        {
            initialCountdown,
            onCountdownEnd,
        }
    );

    const {
        password,
        setPassword,
        passwordError,
        setPasswordError,
        passwordConfirmation,
        setPasswordConfirmation,
        passwordConfirmationError,
        setPasswordConfirmationError,
    } = useMatchPasswordValidation();

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
        password,
        setPassword,
        passwordError,
        setPasswordError,
        passwordConfirmation,
        setPasswordConfirmation,
        passwordConfirmationError,
        setPasswordConfirmationError,
    }
}

export default useResetPasswordForm;
