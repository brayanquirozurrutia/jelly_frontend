import React, { ReactNode } from 'react';
import Header from '../components/commons/Header';
import Navigation from '../components/commons/Navigation';
import HeaderBanner from '../components/commons/HeaderBanner';

interface NoCarouselLayoutProps  {
    children: ReactNode;
}

const NoCarouselLayout: React.FC<NoCarouselLayoutProps > = ({ children }) => (
    <>
        <HeaderBanner />
        <Header />
        <Navigation />
        <main>{children}</main>
    </>
);

export default NoCarouselLayout;
