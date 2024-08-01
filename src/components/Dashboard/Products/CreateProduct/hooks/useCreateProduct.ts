import useStringValidation from "../../../../../hooks/Commons/useStringValidation.ts";
import useNumberValidation from "../../../../../hooks/Commons/useNumberValidation.ts";
import useBooleanValidation from "../../../../../hooks/Commons/useBooleanValidation.ts";
import useImageFileValidation from "../../../../../hooks/Commons/useImageFileValidation.ts";
import useFocusedInputValidation from "../../../../../hooks/Commons/useFocusedInputValidation.ts";
import {CategoryType} from "../../../Categories/category.types.ts";
import {useState} from "react";
import {GroupType} from "../../../Groups/group.types.ts";

const useCreateProduct = () => {

    const [category, setCategory] = useState<CategoryType | null>(null);
    const [group, setGroup] = useState<GroupType | null>(null);

    const {
        value: categoryError,
        setValue: setCategoryError,
    } = useStringValidation('categoryError')

    const {
        value: groupError,
        setValue: setGroupError,
    } = useStringValidation('groupError')

    const {
        value: name,
        setValue: setName,
        error: nameError,
        setError: setNameError,
    } = useStringValidation('name')

    const {
        value: description,
        setValue: setDescription,
        error: descriptionError,
        setError: setDescriptionError,
    } = useStringValidation('description')

    const {
        value: price,
        setValue: setPrice,
        error: priceError,
        setError: setPriceError,
    } = useNumberValidation('price')

    const {
        value: stock,
        setValue: setStock,
        error: stockError,
        setError: setStockError,
    } = useNumberValidation('stock')


    const {
        value: endpointError,
        setValue: setEndpointError,
    } = useStringValidation('endpointError')

    const {
        value: endpointSuccess,
        setValue: setEndpointSuccess,
    } = useStringValidation('endpointSuccess')

    const {
        value: snackbarOpen,
        setValue: setSnackbarOpen,
    } = useBooleanValidation('snackbarOpen')

    const {
        value: loading,
        setValue: setLoading,
    } = useBooleanValidation('loading')

    const {
        imageFile,
        imageError,
        handleImageChange,
        validateImage,
        resetImage,
        setImageError,
    } = useImageFileValidation();

    const {
        focusedInput,
        setFocusedInput,
    } = useFocusedInputValidation();

    return {
        name,
        setName,
        nameError,
        setNameError,
        description,
        setDescription,
        descriptionError,
        setDescriptionError,
        price,
        setPrice,
        priceError,
        setPriceError,
        stock,
        setStock,
        stockError,
        setStockError,
        group,
        setGroup,
        groupError,
        setGroupError,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        loading,
        setLoading,
        imageFile,
        handleImageChange,
        imageError,
        validateImage,
        resetImage,
        setImageError,
        snackbarOpen,
        setSnackbarOpen,
        focusedInput,
        setFocusedInput,
        category,
        setCategory,
        categoryError,
        setCategoryError,
    }
};

export default useCreateProduct;
