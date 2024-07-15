import useEmailValidation from "./Commons/useEmailValidation.ts";
import useErrorAndSuccessValidation from "./Commons/useErrorAndSuccessValidation.ts";
import useFocusedInputValidation from "./Commons/useFocusedInputValidation.ts";
import useAlertValidation from "./Commons/useAlertValidation.ts";
import useCollapseValidation from "./Commons/useCollapseValidation.ts";
import useTimerValidation from "./Commons/useTimerValidation.ts";
import { UseTimerProps } from "../types.ts";

const useNewTokenForm = ({ initialTime, onExpire }: UseTimerProps) => {
    const {
        email,
        setEmail,
        emailError,
        setEmailError,
    } = useEmailValidation();

    const {
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
    } = useErrorAndSuccessValidation();

    const {
        focusedInput,
        setFocusedInput,
    } = useFocusedInputValidation();

    const {
        showAlert,
        setShowAlert,
    } = useAlertValidation();

    const {
        collapseOpen,
        setCollapseOpen,
    } = useCollapseValidation();

    const {
        timer,
        isButtonDisabled,
        startTimer,
    } = useTimerValidation({ initialTime, onExpire });

    return {
        email,
        setEmail,
        emailError,
        setEmailError,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        focusedInput,
        setFocusedInput,
        showAlert,
        setShowAlert,
        collapseOpen,
        setCollapseOpen,
        timer,
        isButtonDisabled,
        startTimer,
    }
}

export default useNewTokenForm;
