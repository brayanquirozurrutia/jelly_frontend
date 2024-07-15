import {useEffect, useState} from "react";
const useTokenValidation = () => {
    const [token, setToken] = useState('');
    const [tokenError, setTokenError] = useState('');

    useEffect(() => {
        if (token) {
            if (token.length !== 6) {
                setTokenError('El token debe tener 6 caracteres');
            } else {
                setTokenError('');
            }
        }
    }, [token]);

    return {
        token,
        setToken,
        tokenError,
        setTokenError
    }
}

export default useTokenValidation;
