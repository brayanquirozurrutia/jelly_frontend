import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faShoppingCart, faTachometerAlt, faUser, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import BaseButton from "../CustomButton";
import LoginModal from "../LoginModal";
import {useAuth} from "../../../auth/AuthContext.tsx";

const Header: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const { isLoggedIn, userAdmin } = useAuth();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

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
                <a href="/">
                    <img src={logoUrl} alt="Logo" className="w-24 md:w-32 lg:w-40 h-auto"/>
                </a>
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
                           className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg focus:border-purple1 focus:outline-none transition-all duration-100 focus:ring-2 focus:ring-purple1"/>
                    <FontAwesomeIcon icon={faSearch}
                                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl cursor-pointer"/>
                </div>

                {/* Inicio de sesión */}
                <div className="w-full md:w-auto xl:w-auto flex items-center justify-center md:justify-center xl:justify-start space-x-2">
                    {!isLoggedIn ? (
                        <BaseButton icon={faUser} label="Iniciar sesión" onClick={handleShowModal} className="w-100"/>
                    ) : (
                        <>
                            {userAdmin ? (
                                <BaseButton
                                    icon={faTachometerAlt}
                                    label="Dashboard"
                                    onClick={() => window.location.href = '/dashboard'}
                                    className="w-100"
                                />
                            ) : (
                                <BaseButton
                                    icon={faUserCircle}
                                    label="Mi perfil"
                                    onClick={() => window.location.href = '/'}
                                    className="w-100"
                                />
                            )}
                        </>
                    )}
                </div>
                <LoginModal show={showModal} handleClose={handleCloseModal} />

                <div className="flex items-center space-x-2">
                    {/* Icono de carrito */}
                    <FontAwesomeIcon icon={faShoppingCart} className="text-black text-xl cursor-pointer"/>

                    {/* Texto "Carrito" */}
                    <span>Carrito</span>

                    {/* Contador */}
                    <span
                        className="bg-red-500 text-white text-xs font-semibold flex items-center justify-center w-5 h-5 rounded-full">0</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
