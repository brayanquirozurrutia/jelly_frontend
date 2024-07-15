import {useState} from "react";

const useSnackbarValidation = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    return {
        snackbarOpen,
        setSnackbarOpen,
    }
}

export default useSnackbarValidation;
