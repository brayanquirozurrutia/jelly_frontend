import React from 'react';
import Marquee from 'react-fast-marquee';
import BurgerMenu from '../BurgerMenu';
import { useMediaQuery } from 'react-responsive';

import { useQuery } from '@apollo/react-hooks';
import { GET_BANNER_PHRASES } from '../../../graphql/app/queries';

interface BannerPhrasesData {
    bannerPhrases: {
        id: string;
        phrase: string;
    }[];
}

const HeaderBanner: React.FC = () => {
    const isMobile = useMediaQuery({ maxWidth: 1020 });

    const {
        error,
        data
    } = useQuery<BannerPhrasesData>(GET_BANNER_PHRASES);

    if (error) return <p>Error: {error.message}</p>;

    const phrases = data?.bannerPhrases.map(({ phrase }) => phrase) || [];

    return (
        <div className="bg-purple1 text-black font-bold py-3 flex items-center">
            {isMobile && (
                <div className="ml-4">
                    <BurgerMenu />
                </div>
            )}
            <div className="flex-grow overflow-hidden whitespace-nowrap">
                <Marquee gradient={false} speed={50} loop={0}>
                    {phrases.concat(phrases).map((phrase, index) => (
                        <span key={index} className="mx-4">
                            {phrase}
                        </span>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default HeaderBanner;
