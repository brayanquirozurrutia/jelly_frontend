import { useState } from "react";

const useStringValidation = (fieldName: string) => {
    const [fieldValue, setFieldValue] = useState<string>('');
    const [fieldError, setFieldError] = useState<string>('');

    return {
        value: fieldValue,
        setValue: setFieldValue,
        error: fieldError,
        setError: setFieldError,
        fieldName,
    };
}

export default useStringValidation;
