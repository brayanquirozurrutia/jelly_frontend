import React, { ReactNode } from 'react';
import Header from '../components/commons/Header';
import Navigation from '../components/commons/Navigation';
import HeaderBanner from '../components/commons/HeaderBanner';
import Footer from "../components/commons/Footer";

interface NoCarouselLayoutProps  {
    children: ReactNode;
}

const NoCarouselLayout: React.FC<NoCarouselLayoutProps > = ({ children }) => (
    <>
        <HeaderBanner />
        <Header />
        <Navigation />
        <main>{children}</main>
        <Footer />
    </>
);

export default NoCarouselLayout;
