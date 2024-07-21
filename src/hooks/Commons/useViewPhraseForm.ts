import useCollapseValidation from "./useCollapseValidation.ts";


const useViewPhraseForm = () => {
    const {
        collapseOpen,
        setCollapseOpen
    } = useCollapseValidation();

    return {
        collapseOpen,
        setCollapseOpen
    }
}

export default useViewPhraseForm;
