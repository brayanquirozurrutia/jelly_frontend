import React, { useRef } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderCarousel: React.FC = () => {
    const sliderRef = useRef<Slider>(null);
    const banner1Url = import.meta.env.VITE_BANNER_1 as string;
    const banner2Url = import.meta.env.VITE_BANNER_2 as string;

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        adaptiveHeight: true,
    };

    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    return (
        <div className="slider-container relative overflow-hidden">
            <Slider {...settings} ref={sliderRef}>
                <div className="flex justify-center py-2">
                    <img
                        src={banner1Url}
                        alt="Banner 1 de Tecito Store"
                        className="w-full object-cover"
                    />
                </div>
                <div className="flex justify-center py-2">
                    <img
                        src={banner2Url}
                        alt="Banner 2 de Tecito Store"
                        className="w-full object-cover"
                    />
                </div>
            </Slider>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <button className="text-black px-4 py-2 rounded-full hover:bg-green-200" onClick={prevSlide}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <button className="text-black px-4 py-2 rounded-full hover:bg-green-200" onClick={nextSlide}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </button>
            </div>
        </div>

    );
};

export default HeaderCarousel;
