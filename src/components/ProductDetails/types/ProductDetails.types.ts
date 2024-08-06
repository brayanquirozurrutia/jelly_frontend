interface ProductImageFileType {
    id: string;
    image: string;
}

interface ProductVersionType {
    id: string;
    name: string;
    stock: number;
    isDisabled: boolean;
    image: string;
}

interface ProductType {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    image: string;
    group: {
        id: string;
        name: string;
    };
    category: {
        id: string;
        name: string;
    };
    images: ProductImageFileType[];
    productVersion: ProductVersionType[];
}

export interface ProductDetailsData {
    getProduct: ProductType;
}
