import Header from './components/commons/Header';
import Navigation from "./components/commons/Navigation";
import HeaderCarousel from "./components/HeaderCarousel";
import React from "react";

function App() {
    return (
        <React.Fragment>
            <Header />
            <Navigation />
            <HeaderCarousel />
        </React.Fragment>
    );
}

export default App;
