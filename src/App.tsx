import { useMediaQuery } from 'react-responsive';
import Header from './components/commons/Header';
import Navigation from "./components/commons/Navigation";
import HeaderCarousel from "./components/HeaderCarousel";
import HeaderBanner from "./components/commons/HeaderBanner";
import Product from "./components/Products";

import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient';

import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
    const isNotSmallScreen = useMediaQuery({ minWidth: 768 });

    return (
        <ApolloProvider client={client}>
            <React.Fragment>
                <HeaderBanner />
                <Header />
                <Navigation />
                {isNotSmallScreen && <HeaderCarousel />}
                <Product />
            </React.Fragment>
        </ApolloProvider>
    );
}

export default App;
