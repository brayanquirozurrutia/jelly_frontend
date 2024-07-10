import React from "react";
import BaseMain from "../Commons/BaseMain";
import { createCategory, updateCategory, deleteCategory } from "../../../services/Product";
import { GET_CATEGORIES } from "../../../graphql/products/queries.ts";

const CategoryMain: React.FC = () => {
    return (
        <div>
            <BaseMain
                componentName="Categoría"
                createEndpoint={createCategory}
                deleteEndpoint={deleteCategory}
                viewEndpoint={GET_CATEGORIES}
                listObjects="listCategories"
                totalObjects="totalCategories"
                editEndpoint={updateCategory}
            />
    </div>
);
}

export default CategoryMain
