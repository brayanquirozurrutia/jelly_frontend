import { useState } from "react";

const useButtonDisabledValidation = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    return {
        isButtonDisabled,
        setIsButtonDisabled,
    }
}

export default useButtonDisabledValidation;
