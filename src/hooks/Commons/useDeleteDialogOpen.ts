import {useState} from "react";

const  useDeleteDialogOpen = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return {
        deleteDialogOpen,
        setDeleteDialogOpen,
    }
}

export default useDeleteDialogOpen;
