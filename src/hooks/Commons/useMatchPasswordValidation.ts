import { useState, useEffect } from "react";
import usePasswordValidation from "./usePasswordValidation.ts";

const useMatchPasswordValidation = () => {
    const {
        password,
        setPassword,
        passwordError,
        setPasswordError,
    } = usePasswordValidation();

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

    useEffect(() => {
        if (password && passwordConfirmation) {
            if (password !== passwordConfirmation) {
                setPasswordError('Las contraseñas no coinciden');
                setPasswordConfirmationError('Las contraseñas no coinciden');
            } else {
                setPasswordError('');
                setPasswordConfirmationError('');
            }
        }
    }, [password, passwordConfirmation]);

    return {
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

export default useMatchPasswordValidation;
