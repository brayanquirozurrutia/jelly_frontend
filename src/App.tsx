import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import client from '../apolloClient';

import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import CarouselLayout from './layouts/CarouselLayout.tsx';
import NoCarouselLayout from './layouts/NoCarouselLayout.tsx';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
    return (
        <ApolloProvider client={client}>
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
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
