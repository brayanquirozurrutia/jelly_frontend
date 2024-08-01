import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Select, MenuItem, CircularProgress, FormControl, InputLabel } from '@mui/material';
import { CategoryType, CategoriesData } from "../../Dashboard/Categories/category.types.ts";
import { GET_CATEGORIES_WITHOUT_PAGINATION } from "../../../graphql/products/queries.ts";

interface CategoriesDropDownProps {
    selectedCategory?: CategoryType | null;
    onSelectCategory: (category: CategoryType | null) => void;
}

const CategoryDropDown: React.FC<CategoriesDropDownProps> = ({ selectedCategory, onSelectCategory }) => {
    const [getCategories, { loading, error, data }] = useLazyQuery<CategoriesData>(GET_CATEGORIES_WITHOUT_PAGINATION);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        getCategories().then(r => r);
    }, [getCategories]);

    useEffect(() => {
        if (data) {
            setCategories(data.listCategoriesWithoutPagination);
        }
    }, [data]);

    if (loading) return <CircularProgress />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <FormControl fullWidth>
            <InputLabel id="categories-dropdown-label">Seleciona una categoría</InputLabel>
            <Select
                labelId="categories-dropdown-label"
                value={selectedCategory?.id || ''}
                onChange={(e) => {
                    const selectedId = e.target.value as string;
                    const selected = categories.find(category => category.id === selectedId) || null;
                    onSelectCategory(selected);
                }}
            >
                <MenuItem value="">
                    <em>Seleciona una categoría</em>
                </MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CategoryDropDown;
