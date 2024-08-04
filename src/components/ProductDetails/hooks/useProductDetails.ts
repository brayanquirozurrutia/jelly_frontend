import {useState} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {ProductDetailsData} from "../types/ProductDetails.types.ts";
import {GET_PRODUCT_DETAILS} from "../../../graphql/products/queries.ts";
import {SelectChangeEvent} from "@mui/material";

const useProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const {
        loading: productLoading,
        error: productError,
        data: productData
    } = useQuery<ProductDetailsData>(
        GET_PRODUCT_DETAILS, { variables: { id } }
    );

    const [quantity, setQuantity] = useState(1);
    const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
    const [stock, setStock] = useState<number | null>(null);
    const product = productData?.getProduct;
    const images = product?.images || [];
    const versions = product?.productVersion || [];

    const handleVersionChange = (event: SelectChangeEvent<string | null>) => {
        const selectedVersionId = event.target.value;
        setSelectedVersion(selectedVersionId);

        const selectedVersion = versions.find(
            version => version.id === selectedVersionId
        );
        setStock(selectedVersion?.stock || 0);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return {
        productLoading,
        productError,
        product,
        images,
        versions,
        quantity,
        selectedVersion,
        stock,
        handleVersionChange,
        decreaseQuantity,
        increaseQuantity,
    }
}

export default useProductDetails;
