import { useState } from "react";

const useLoadingValidation = () => {
    const [loading, setLoading] = useState<boolean>(false);

    return {
        loading,
        setLoading,
    }
}

export default useLoadingValidation;
