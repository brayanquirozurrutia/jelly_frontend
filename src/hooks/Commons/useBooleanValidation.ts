import {useState} from "react";


const useBooleanValidation = (fieldName: string) => {
    const [fieldValue, setFieldValue] = useState<boolean>(false);

    return {
        value: fieldValue,
        setValue: setFieldValue,
        fieldName,
    };
}

export default useBooleanValidation;
