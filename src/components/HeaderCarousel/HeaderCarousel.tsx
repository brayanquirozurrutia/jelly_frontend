import React, { useRef } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderCarousel: React.FC = () => {
    const sliderRef = useRef<Slider>(null);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
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
        <div className="hidden lg:block slider-container mx-auto max-w-screen-lg relative">
            <Slider {...settings} ref={sliderRef}>
                <div className="flex justify-center py-2">
                    <img
                        src="https://lumiere-a.akamaihd.net/v1/images/bts_10e2829a.jpeg?region=0,409,4096,2304"
                        alt="BTS"
                        className="object-cover w-10/12 mx-auto rounded-lg shadow-lg h-80"
                    />
                </div>
                <div className="flex justify-center py-2">
                    <img
                        src="https://cdn2.dineroenimagen.com/media/dinero/images/2023/12/bts-servicio-militar.jpg"
                        alt="BTS"
                        className="object-cover w-10/12 mx-auto rounded-lg shadow-lg h-80"
                    />
                </div>
                <div className="flex justify-center py-2">
                    <img
                        src="https://altselection.com/wp-content/uploads/2023/12/Ces-membres-de-BTS-sortiront-plusieurs-albums-en-2024-malgre-leur-enrolement.jpeg"
                        alt="BTS"
                        className="object-cover w-10/12 mx-auto rounded-lg shadow-lg h-80"
                    />
                </div>
            </Slider>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <button className="text-black px-4 py-2 rounded-full hover:bg-green-200 ml-1" onClick={prevSlide}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <button className="text-black px-4 py-2 rounded-full hover:bg-green-200 mr-1" onClick={nextSlide}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default HeaderCarousel;
