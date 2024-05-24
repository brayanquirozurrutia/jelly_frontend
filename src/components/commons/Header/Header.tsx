import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { logoUrl } from "../../../constants/constants.ts";

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-4 py-4 text-stone-950">
            {/* Logo */}
            <div className="flex items-center space-x-4">
                <img src={logoUrl} alt="Logo" className="w-40 h-auto" />
                <h1 className="text-3xl">PONER ALGUNA FRASE</h1>
            </div>

            {/* Elementos a la derecha */}
            <div className="flex items-center space-x-4 relative">
                {/* Buscador de productos */}
                <div className="relative">
                    <input type="text" placeholder="Buscar productos"
                           className="pl-10 pr-3 py-1 border border-gray-600 rounded-lg focus:border-purple1 focus:outline-none transition-all duration-150 focus:ring-2 focus:ring-purple1"/>
                    <FontAwesomeIcon icon={faSearch}
                                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl cursor-pointer"/>
                </div>

                {/* Inicio de sesión */}
                <button
                    className="px-3 py-1 bg-purple1 hover:bg-purple2 text-black font-bold rounded-lg flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUser} className="text-black text-xl"/>
                    <span>Iniciar sesión</span>
                </button>

                {/* Separador vertical */}
                <div className="border-l border-gray-400 h-6"></div>

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
