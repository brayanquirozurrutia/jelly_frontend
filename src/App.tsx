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
                    });

                    if (!response.ok) {
                        new Error('Failed to fetch CSRF token');
                    }

                    sessionStorage.setItem('hasRendered', 'true');
                }

                const apolloClient = createApolloClient();
                setClient(apolloClient);
            } catch (error) {
                console.error('Error fetching CSRF token: ', error);
            }
        };

        fetchCsrfToken().then(r => r);
    }, []);

    if (!client) {
        return <div>Loading...</div>;
    }

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/activate-account" element={
                            <ActivateAccount />
                        } />
                        <Route path="/reset-password" element={
                            <ResetPassword />
                        } />
                        <Route path="/" element={
                            <CarouselLayout>
                                <Products />
                            </CarouselLayout>
                        } />
                        <Route path="/product/:id" element={
                            <NoCarouselLayout>
                                <ProductDetails />
                            </NoCarouselLayout>
                        } />
                        <Route path="/create-account" element={
                            <NoCarouselLayout>
                                <CreateAccount />
                            </NoCarouselLayout>
                        } />
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="groups" element={<GroupMain />} />
                            <Route path="categories" element={<CategoryMain />} />

                            {/* admin-app */}
                            <Route path="admin-app/phrases" element={<Phrases />} />

                            {/* products */}
                            <Route path="products">
                                <Route path="create" element={<CreateProduct />} />
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
