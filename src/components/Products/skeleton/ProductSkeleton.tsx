import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductSkeleton: React.FC = () => (
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

export default ProductSkeleton;
