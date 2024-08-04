import React, {useEffect} from "react";
import SkeletonTable from "../../../commons/SkeletonTable";
import TableCRUD from "../../../commons/TableCRUD";
import CustomTableSearch from "../../../commons/CustomTableSearch";
import { GET_PRODUCTS } from "../../../../graphql/products/queries.ts";
import { useLazyQuery } from "@apollo/client";
import useListProducts from "./hooks/useListProducts.ts";
import {GetProductInterface, ProductsData} from "./types/CreateProduct.types.ts";
import {useNavigate} from "react-router-dom";
import DisableProduct from "../DisableProduct";
import {disableProduct} from "../../../../services/Product";
import CustomSnackBar from "../../../commons/CustomSnackBar";

const ListProducts = () => {

    const {
        search,
        setSearch,
        page,
        setPage,
        focusedInput,
        setFocusedInput,
        isModalOpen,
        setIsModalOpen,
        setSelectedProductToDisable,
        selectedProductToDisable,
        endpointError,
        setEndpointError,
        endpointSuccess,
        setEndpointSuccess,
        snackbarOpen,
        setSnackbarOpen,
        loading: endpointLoading,
        setLoading,
    } = useListProducts();

    const navigate = useNavigate();
    const PAGE_SIZE = 10;

    const columnNames = [
        'Imagen',
        'Nombre',
        'Precio',
    ];

    const columnKeys: (keyof GetProductInterface)[] = [
        'image',
        'name',
        'price',
    ];

    const [getProducts, {
        loading,
        data,
        error
    }] = useLazyQuery<ProductsData>(GET_PRODUCTS, {
        fetchPolicy: 'cache-and-network',
        variables: {
            search,
            page: page + 1,
            pageSize: PAGE_SIZE
        }
    });

    useEffect(() => {
        getProducts().then(r => r);
    }, [search, page, getProducts]);

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    }

    const handleSearchChange = (searchTerm: string) => {
        setSearch(searchTerm);
        setPage(0);
    }

    const handleEdit = (product: GetProductInterface) => {
        navigate(`/dashboard/products/edit/${product.id}`);
    };

    const handleDelete = (product: GetProductInterface) => {
        setSelectedProductToDisable({
            id: product.id,
            name: product.name
        });
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setLoading(true);
        setEndpointError('');
        setEndpointSuccess('');

        if (selectedProductToDisable) {
            try {
                await disableProduct(selectedProductToDisable.id);
                await getProducts();
                setEndpointSuccess('Producto desactivado con éxito');
            } catch (error) {
                if (error instanceof Error) {
                    setEndpointError(error.message);
                } else {
                    setEndpointError('Error inesperado');
                }
            } finally {
                setIsModalOpen(false);
                setSelectedProductToDisable(null);
                setLoading(false);
                setSnackbarOpen(true);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProductToDisable(null);
    };

    return (
        <div className="p-2 rounded-lg border-2 shadow-md">
            <CustomTableSearch
                searchTerm={search}
                onSearchChange={handleSearchChange}
                label="Buscar productos"
                id="search-products"
                setFocusedInput={setFocusedInput}
                focusedInput={focusedInput}
                focusText={"search-products"}
            />
            {error && <p>Error al cargar productos {error.message}</p>}
            {loading ? (
                <SkeletonTable columnCount={columnNames.length + 1} />
            ) : (
                data && (
                    <>
                        <TableCRUD<GetProductInterface>
                            columnNames={columnNames}
                            columnKeys={columnKeys}
                            data={data.listProducts}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            pagination={{
                                count: data.totalProducts,
                                page: page,
                                rowsPerPage: PAGE_SIZE,
                                onPageChange: handlePageChange
                            }}
                            redirectOnImageClick="/dashboard/products/edit"
                        />
                        {selectedProductToDisable && (
                            <DisableProduct
                                open={isModalOpen}
                                onClose={handleCloseModal}
                                productToDisable={selectedProductToDisable}
                                onConfirm={handleConfirmDelete}
                                loading={endpointLoading}
                            />
                        )}
                        {snackbarOpen && (
                            <CustomSnackBar
                                open={snackbarOpen}
                                onClose={() => setSnackbarOpen(false)}
                                message={endpointSuccess || endpointError}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                type={endpointSuccess ? 'success' : 'error'}
                            />
                        )}
                    </>
                )
            )}
        </div>
    );
}

export default ListProducts;
