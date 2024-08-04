import React from 'react';
import BaseButton from '../commons/CustomButton';
import ProductDetailsSkeleton from "./skeleton/ProductDetailsSkeleton.tsx";
import AlbumIcon from '@mui/icons-material/Album';
import CustomDropDown from "../commons/CustomDropDown";
import useProductDetails from "./hooks/useProductDetails.ts";

const ProductDetails: React.FC = () => {
    const {
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
    } = useProductDetails();

    if (productLoading || productError) return <ProductDetailsSkeleton />;

    if (!product) {
        return <p>Producto no encontrado</p>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-8 py-2">
            <div className="bg-white overflow-hidden flex flex-col sm:flex-row">
                <div className="flex-1 h-[90vh] overflow-y-scroll">
                    {/* Contenedor de imagen principal y las imágenes adicionales */}
                    <div className="flex flex-col space-y-4">
                        {/* Imagen principal */}
                        <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg"/>
                        {/* Imágenes adicionales */}
                        {images.length > 0 ? (
                            images.map((img, index) => (
                                <img key={index} src={img.image} alt={`Additional ${index}`}
                                     className="w-full h-auto object-cover rounded-lg"/>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="p-4 flex-1">
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    {product.discountPrice ? (
                        <div className="flex items-center mb-4">
                            <span className="text-xl font-bold text-gray-900 line-through mr-2">${product.price}</span>
                            <span className="text-xl font-bold text-red-600">${product.discountPrice}</span>
                        </div>
                    ) : (
                        <p className="text-xl text-gray-900 mb-4">${product.price}</p>
                    )}
                    <p className="mb-4">{product.description}</p>
                    <div className="flex items-center mb-4">
                        <span className="font-semibold mr-2">Group:</span>
                        <span>{product.group.name}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="font-semibold mr-2">Category:</span>
                        <span>{product.category.name}</span>
                    </div>
                    <div className="mb-4">
                        <CustomDropDown
                            label="Versión"
                            placeholder="Selecciona una versión"
                            items={versions}
                            icon={AlbumIcon}
                            selectedValue={selectedVersion}
                            onChange={handleVersionChange}
                        />
                        {selectedVersion && (
                            <p className="mt-2 text-lg font-semibold">
                                Stock: {stock}
                            </p>
                        )}
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
