import { useState } from "react";

const useAlertValidation = () => {
    const [showAlert, setShowAlert] = useState(false);

    return {
        showAlert,
        setShowAlert,
    }
}

export default useAlertValidation;
