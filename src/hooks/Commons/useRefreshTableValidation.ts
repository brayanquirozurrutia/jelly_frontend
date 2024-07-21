import {useState} from "react";

const useRefreshTableValidation = () => {
    const [refreshTable, setRefreshTable] = useState(false);

    return {
        refreshTable,
        setRefreshTable,
    }
}

export default useRefreshTableValidation;
