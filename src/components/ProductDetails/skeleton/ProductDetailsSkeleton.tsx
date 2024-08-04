import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ProductDetailsSkeleton: React.FC = () => (
    <div className="container mx-auto px-4 sm:px-8 py-2">
        <div className="bg-white overflow-hidden flex flex-col sm:flex-row">
            <div className="flex-1 h-[90vh] overflow-y-scroll">
                <div className="flex flex-col space-y-4">
                    {/* Skeleton para la imagen principal */}
                    <Skeleton height={400} />
                    {/* Skeleton para imágenes adicionales */}
                    <Skeleton height={100} />
                    <Skeleton height={100} />
                    <Skeleton height={100} />
                </div>
            </div>
            <div className="p-4 flex-1">
                {/* Skeleton para el nombre del producto */}
                <Skeleton height={32} width={`60%`} />
                <div className="mt-4">
                    {/* Skeleton para el precio del producto */}
                    <Skeleton height={24} width={`40%`} />
                </div>
                <div className="mt-4">
                    {/* Skeleton para la descripción del producto */}
                    <Skeleton count={3} />
                </div>
                <div className="mt-4">
                    {/* Skeleton para el grupo del producto */}
                    <Skeleton height={24} width={`30%`} />
                </div>
                <div className="mt-4">
                    {/* Skeleton para la categoría del producto */}
                    <Skeleton height={24} width={`30%`} />
                </div>
                <div className="mt-4 flex items-center">
                    {/* Skeleton para la cantidad */}
                    <Skeleton height={24} width={50} />
                </div>
                <div className="mt-4">
                    {/* Skeleton para el botón */}
                    <Skeleton height={48} width={`100%`} />
                </div>
            </div>
        </div>
    </div>
);

export default ProductDetailsSkeleton;
