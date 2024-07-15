import { useState } from "react";

const usePasswordValidation = () => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    return {
        password,
        setPassword,
        passwordError,
        setPasswordError,
    }
}

export default usePasswordValidation;
