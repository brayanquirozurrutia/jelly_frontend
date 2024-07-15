import { useState } from "react";

const useFocusedInputValidation = () => {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    return {
        focusedInput,
        setFocusedInput,
    }
}

export default useFocusedInputValidation;
