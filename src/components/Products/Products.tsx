import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { GET_PRODUCTS } from '../../graphql/products/queries';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    group: {
        name: string;
    };
    category: {
        name: string;
    };
}

// Componente para el placeholder
const ProductPlaceholder: React.FC = () => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
        <Skeleton height={192} />
        <div className="p-4">
            <Skeleton height={24} width={`80%`} />
            <div className="mt-4 flex justify-between items-center">
                <Skeleton height={24} width={`40%`} />
            </div>
        </div>
        <div className="bg-purple2 p-2 text-black text-center font-bold">
            <Skeleton height={24} width={`60%`} />
        </div>
    </div>
);

const Products: React.FC = () => {
    // Ejecuta la consulta GraphQL
    const { loading, error, data } = useQuery<{ listProducts: Product[] }>(GET_PRODUCTS);

    if (loading) {
        return (
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold my-4 text-center">Nuestros productos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array(6).fill(0).map((_, index) => (
                        <ProductPlaceholder key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) return <p>Error :(</p>;

    return (
        <div className="container mx-auto px-4 py-2">
            <h2 className="text-2xl font-bold my-4 text-center">Nuestros productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.listProducts.map(product => (
                    <div key={product.id}
                         className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform
                          hover:shadow-purple1/50 hover:shadow-xl">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{product.name} - {product.group.name}</h3>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                            </div>
                        </div>
                        <div className="bg-purple2 p-2 text-black text-center font-bold">
                            {product.category.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
