import {useEffect, useMemo, useState} from "react";
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
    const versions = useMemo(() => product?.productVersion || [], [product]);
    const [carouselImages, setCarouselImages] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const displayStock = stock ?? 0;

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

    useEffect(() => {
        const productImage = product?.image || "";
        const versionImages = versions.map(version => version.image).filter(image => image !== null) as string[];

        const allImages = [productImage, ...versionImages];
        setCarouselImages(allImages);

        // If a version is selected, set the index to that version's image
        if (selectedVersion) {
            const selectedVersionIndex = versions.findIndex(version => version.id === selectedVersion) + 1; // +1 to account for the product image at index 0
            setSelectedImageIndex(selectedVersionIndex);
        } else {
            setSelectedImageIndex(0);
        }
    }, [selectedVersion, product?.image, versions]);

    return {
        productLoading,
        productError,
        product,
        images,
        versions,
        quantity,
        selectedVersion,
        handleVersionChange,
        decreaseQuantity,
        increaseQuantity,
        selectedImageIndex,
        setSelectedImageIndex,
        carouselImages,
        displayStock,
    }
}

export default useProductDetails;
