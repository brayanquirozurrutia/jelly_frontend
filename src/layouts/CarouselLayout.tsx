import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../components/commons/Header';
import Navigation from '../components/commons/Navigation';
import HeaderCarousel from '../components/HeaderCarousel';
import HeaderBanner from '../components/commons/HeaderBanner';
import Footer from "../components/commons/Footer";

interface CarouselLayoutProps  {
    children: ReactNode;
}

const CarouselLayout: React.FC<CarouselLayoutProps > = ({ children }) => {
    const isNotSmallScreen = useMediaQuery({ minWidth: 768 });

    return (
        <>
            <HeaderBanner />
            <Header />
            <Navigation />
            {isNotSmallScreen && <HeaderCarousel />}
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default CarouselLayout;
