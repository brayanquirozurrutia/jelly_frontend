import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import client from '../apolloClient';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';

import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import CreateAccount from "./components/CreateAccount";
import CarouselLayout from './layouts/CarouselLayout.tsx';
import NoCarouselLayout from './layouts/NoCarouselLayout.tsx';
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import Dashboard from "./components/Dashboard";
import Groups from "./components/Dashboard/Groups";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
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
                            <Route path="groups" element={<Groups />} />
                        </Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
