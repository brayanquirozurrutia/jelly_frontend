import {useEffect, useState} from "react";
import {validateEmail} from "../../utils/validations.ts";

const useEmailValidation = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (email) {
            if (!validateEmail(email)) {
                setEmailError('Correo inválido');
            } else {
                setEmailError('');
            }
        }
    }, [email]);

    return {
        email,
        setEmail,
        emailError,
        setEmailError,
    }
}

    export default useEmailValidation;
