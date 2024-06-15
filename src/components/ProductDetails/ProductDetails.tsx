import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Skeleton from 'react-loading-skeleton';
import { GET_PRODUCT_DETAILS } from '../../graphql/products/queries';
import BaseButton from '../commons/BaseButton';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, { variables: { id } });

    const [quantity, setQuantity] = useState(1); // Estado para la cantidad seleccionada

    if (loading) return <Skeleton count={5} />;
    if (error) return <p>Error :(</p>;

    const product = data.getProduct;

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="container mx-auto px-4 sm:px-8 py-2">
            <div className="bg-white overflow-hidden flex flex-col sm:flex-row">
                <img src={product.image} alt={product.name} className="w-full sm:w-2/5 h-auto object-cover rounded-lg mb-4 sm:mb-0" />
                <div className="p-4 flex-1">
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <p className="text-xl text-gray-900 mb-4">${product.price}</p>
                    <p className="mb-4">{product.description}</p>
                    <div className="flex items-center mb-4">
                        <span className="font-semibold mr-2">Group:</span>
                        <span>{product.group.name}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="font-semibold mr-2">Category:</span>
                        <span>{product.category.name}</span>
                    </div>
                    {/* Botones para elegir cantidad */}
                    <div className="flex items-center mb-4">
                        <span className="font-semibold mr-2">Cantidad:</span>
                        <button
                            className="bg-gray-200 px-3 py-1 rounded-lg"
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>
                        <span className="mx-2">{quantity}</span>
                        <button
                            className="bg-gray-200 px-3 py-1 rounded-lg"
                            onClick={increaseQuantity}
                        >
                            +
                        </button>
                    </div>
                    <BaseButton label="Agregar al carrito"/>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
