import { useMediaQuery } from 'react-responsive';
import Header from './components/commons/Header';
import Navigation from "./components/commons/Navigation";
import HeaderCarousel from "./components/HeaderCarousel";
import HeaderBanner from "./components/commons/HeaderBanner";

import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

function App() {
    const isNotSmallScreen = useMediaQuery({ minWidth: 768 });

    return (
        <React.Fragment>
            <HeaderBanner />
            <Header />
            <Navigation />
            {isNotSmallScreen && <HeaderCarousel />}
        </React.Fragment>
    );
}

export default App;
