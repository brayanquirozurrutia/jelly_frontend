import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import { GET_PRODUCTS_WITHOUT_PAGINATION } from '../../graphql/products/queries';
import SiteNewsModal from "../commons/SiteNewsModal";
import ProductSkeleton from "./skeleton/ProductSkeleton.tsx";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    discountPrice?: number;
    isDisabled: boolean;
    group: {
        name: string;
    };
    category: {
        name: string;
    };
}


const Products: React.FC = () => {
    const {
        loading,
        error,
        data
    } = useQuery<{ listProductsWithoutPagination: Product[] }>(GET_PRODUCTS_WITHOUT_PAGINATION);

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-2">
            <h2 className="text-2xl font-bold my-4 text-center">Nuestros productos</h2>
            {loading && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array(6).fill(0).map((_, index) => (
                            <ProductSkeleton key={index}/>
                        ))}
                    </div>
                </div>
            )}
            {error && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
                            <h3 className="text-lg font-semibold">Ocurrió un error</h3>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-xl font-bold text-red-600">Por favor, intenta nuevamente</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <SiteNewsModal
                open={isModalOpen}
                onClose={handleCloseModal}
                title="Sitio en construcción"
                body="Estamos trabajando en la construcción de nuestro sitio web, puedes revisar nuesto catálogo de productos mientras tanto."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.listProductsWithoutPagination.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform
                            hover:shadow-purple1/50 hover:shadow-xl">
                            <img
                                src={product.image}
                                alt={product.name}
                                className={`w-full h-48 object-cover ${product.isDisabled ? 'grayscale' : ''}`}
                                style={{filter: product.isDisabled ? 'grayscale(100%)' : 'none'}}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.name} - {product.group.name}</h3>
                                <div className="mt-4 flex justify-between items-center">
                                    {product.discountPrice ? (
                                        <>
                                            <span
                                                className="text-xl font-bold text-gray-900 line-through">${product.price}</span>
                                            <span
                                                className="text-xl font-bold text-red-600">${product.discountPrice}</span>
                                        </>
                                    ) : (
                                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                    )}
                                </div>
                            </div>
                            <div className="bg-purple2 p-2 text-black text-center font-bold">
                                {product.category.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Products;
