import {useState} from "react";

const  useEditDialogOpen = () => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    return {
        editDialogOpen,
        setEditDialogOpen,
    }
}

export default useEditDialogOpen;
