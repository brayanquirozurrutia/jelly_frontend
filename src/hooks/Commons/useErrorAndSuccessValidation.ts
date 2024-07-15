import { useState } from "react";

const useErrorAndSuccessValidation = () => {
    const [endpointError, setEndpointError] = useState('');
    const [endpointSuccess, setEndpointSuccess] = useState<string>('');

    return {
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
    }
}

export default useErrorAndSuccessValidation;
