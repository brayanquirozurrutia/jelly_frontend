import { useState } from 'react';


const useViewCollapseOpenValidation = () => {
    const [viewCollapseOpen, setViewCollapseOpen] = useState(false);

    return {
        viewCollapseOpen,
        setViewCollapseOpen
    };
}

export default useViewCollapseOpenValidation;
