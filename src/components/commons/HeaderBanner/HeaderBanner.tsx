import React from 'react';
import Marquee from 'react-fast-marquee';
import BurgerMenu from '../BurgerMenu';
import { useMediaQuery } from 'react-responsive';

// TODO: LAS FRASES DEBEN VENIR D EUN ENDPOINT PARA QUE SE PUEDNA ACTUALIZAR

const HeaderBanner: React.FC = () => {
    const phrases = [
        "BIENVENIDOS A TECITO STORE ☕",
        "FALTAN 7 DÍAS PARA QUE JIN SALGA DEL EJÉRCITO 🥺",
        "¿POR QUÉ TAEHYUNG ESTÁ ABRIGADO? PORQUE TAELAO' 😂",
        "¿CUÁL ES EL COLOR DE CABELLO MÁS ICONICO DE JIMIN? 🌈",
        "¿CUÁL ES EL MEJOR SHIP DE BTS? 🚢",
        "QUIERES UN TÉ CON O SIN SUGA? 🍵",
    ];

    const isMobile = useMediaQuery({ maxWidth: 1020 });

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
