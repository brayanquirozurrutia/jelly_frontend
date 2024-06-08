import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';

const Header: React.FC = () => {
    const isSmallScreen = useMediaQuery({ maxWidth: 575.98 });
    const logoUrl = import.meta.env.VITE_LOGO as string;
    const fontImport = `
    @import url('https://fonts.googleapis.com/css2?family=Amita:wght@400;700&family=Satisfy&family=Shrikhand&display=swap');
  `;
    return (
        <header
            className="flex flex-col xl:flex-row items-center justify-between px-4 py-4 text-stone-950 space-y-4 xl:space-y-0">
            {/* Logo y H1 */}
            <style>
                {fontImport}
            </style>
            <div className={`flex items-center ${isSmallScreen ? 'flex-col space-y-4' : 'space-x-4'} w-full xl:w-auto`}>
                <img src={logoUrl} alt="Logo" className="w-24 md:w-32 lg:w-40 h-auto"/>
                <h1 className="text-lg md:text-xl lg:text-3xl"
                    style={{fontFamily: 'Shrikhand'}}>
                    Bienvenidos a Tecito Store
                </h1>
            </div>

            {/* Elementos a la derecha */}
            <div
                className="flex flex-col md:flex-row xl:flex-row items-center justify-center md:justify-center xl:justify-between space-y-2 md:space-y-0 md:space-x-2 xl:space-y-0 w-full xl:w-auto">
                {/* Buscador de productos */}
                <div className="relative w-full md:w-64 xl:w-64">
                    <input type="text" placeholder="Buscar productos"
                           className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg focus:border-purple1 focus:outline-none transition-all duration-150 focus:ring-2 focus:ring-purple1"/>
                    <FontAwesomeIcon icon={faSearch}
                                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl cursor-pointer"/>
                </div>

                {/* Inicio de sesión */}
                <button
                    className="w-full md:w-auto xl:w-auto px-3 py-2 bg-purple1 hover:bg-purple2 text-black font-bold rounded-lg flex items-center justify-center md:justify-center xl:justify-start space-x-2">
                    <FontAwesomeIcon icon={faUser} className="text-black text-xl"/>
                    <span>Iniciar sesión</span>
                </button>

                <div className="flex items-center space-x-2">
                    {/* Icono de carrito */}
                    <FontAwesomeIcon icon={faShoppingCart} className="text-black text-xl cursor-pointer"/>

                    {/* Texto "Carrito" */}
                    <span>Carrito</span>

                    {/* Contador */}
                    <span
                        className="bg-red-500 text-white text-xs font-semibold flex items-center justify-center w-5 h-5 rounded-full">3</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
