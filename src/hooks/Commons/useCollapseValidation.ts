import {useState} from 'react';

const useCollapseValidation = () => {
    const [collapseOpen, setCollapseOpen] = useState(false);

    return {
        collapseOpen,
        setCollapseOpen,
    }
}

export default useCollapseValidation;
