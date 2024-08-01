import {useEffect, useState} from "react";

const useNumberValidation = (fieldName: string) => {
    const [fieldValue, setFieldValue] = useState<number>(0);
    const [fieldError, setFieldError] = useState<string>('');

    const setFieldValueWrapper = (value: string | number) => {
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        if (!isNaN(numericValue)) {
            setFieldValue(numericValue);
        } else {
            setFieldValue(0);
        }
    };

    useEffect(() => {
        if (fieldValue < 0) {
            setFieldError('El valor no puede ser negativo');
        } else {
            setFieldError('');
        }
    }, [fieldValue]);

    return {
        value: fieldValue,
        setValue: setFieldValueWrapper,
        error: fieldError,
        setError: setFieldError,
        fieldName,
    };
}

export default useNumberValidation;
