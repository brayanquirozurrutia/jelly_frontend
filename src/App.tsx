import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {createApolloClient} from "../apolloClient.ts";
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';

import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import CreateAccount from "./components/CreateAccount";
import CarouselLayout from './layouts/CarouselLayout.tsx';
import NoCarouselLayout from './layouts/NoCarouselLayout.tsx';
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import Dashboard from "./components/Dashboard";
import ActivateAccount from "./components/ActivateAccount/ActivateAccount";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import GroupMain from "./components/Dashboard/Groups";
import CategoryMain from "./components/Dashboard/Categories";
import Phrases from "./components/Dashboard/AdminApp/Phrases";
import CreateProduct from "./components/Dashboard/Products/CreateProduct";
import ListProducts from "./components/Dashboard/Products/ListProducts";
import BaseEditProduct from "./components/Dashboard/Products/EditProduct";

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL as string;
const CSRF_URL = import.meta.env.VITE_CSRF_URL as string;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Skeleton from "react-loading-skeleton";

function App() {
    const [
        client,
        setClient
    ] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const hasRendered = sessionStorage.getItem('hasRendered');

                if (!hasRendered) {
                    const response = await fetch(`${API_URL}${CSRF_URL}`, {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        new Error('Failed to fetch CSRF token');
                    }

                    sessionStorage.setItem('hasRendered', 'true');
                }

                const apolloClient = createApolloClient();
                setClient(apolloClient);
            } catch (error) {
                console.error('Error fetching CSRF token');
            }
        };

        fetchCsrfToken().then(r => r);
    }, []);

    if (!client) {
        return (
            <div className="container mx-auto px-4 sm:px-8 py-4">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    {/* Skeleton para el título principal */}
                    <div className="mb-6">
                        <Skeleton height={60} width={`70%`}/>
                    </div>

                    {/* Skeleton para subtítulos */}
                    <div className="mb-4">
                        <Skeleton height={35} width={`50%`}/>
                    </div>

                    {/* Skeleton para bloques de texto */}
                    <div className="mb-8 space-y-6">
                        <Skeleton count={5} height={22} width={`95%`}/>
                    </div>

                    {/* Skeleton para una imagen o media */}
                    <div className="mb-8">
                        <Skeleton height={300} width={`100%`}/>
                    </div>

                    {/* Skeleton para una sección de información adicional */}
                    <div className="mb-8">
                        <Skeleton height={200} width={`100%`}/>
                    </div>

                    {/* Skeleton para una lista de elementos */}
                    <div className="mb-8 space-y-4">
                        <Skeleton height={40} width={`100%`}/>
                        <Skeleton height={40} width={`100%`}/>
                        <Skeleton height={40} width={`100%`}/>
                    </div>

                    {/* Skeleton para botones */}
                    <div className="flex space-x-6 mt-8">
                        <Skeleton height={60} width={`48%`}/>
                        <Skeleton height={60} width={`48%`}/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/activate-account" element={
                            <ActivateAccount/>
                        }/>
                        <Route path="/reset-password" element={
                            <ResetPassword/>
                        }/>
                        <Route path="/" element={
                            <CarouselLayout>
                                <Products/>
                            </CarouselLayout>
                        }/>
                        <Route path="/product/:id" element={
                            <NoCarouselLayout>
                                <ProductDetails/>
                            </NoCarouselLayout>
                        }/>
                        <Route path="/create-account" element={
                            <NoCarouselLayout>
                                <CreateAccount/>
                            </NoCarouselLayout>
                        }/>
                        <Route path="/dashboard" element={<DashboardLayout/>}>
                            <Route index element={<Dashboard/>}/>
                            <Route path="groups" element={<GroupMain/>}/>
                            <Route path="categories" element={<CategoryMain/>}/>

                            {/* admin-app */}
                            <Route path="admin-app/phrases" element={<Phrases/>}/>

                            {/* products */}
                            <Route path="products">
                                <Route path="create" element={<CreateProduct/>}/>
                                <Route path="list" element={<ListProducts />} />
                                <Route path="edit/:id" element={<BaseEditProduct />} />
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
