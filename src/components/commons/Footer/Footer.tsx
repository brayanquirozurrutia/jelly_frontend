import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
    const logoUrl = import.meta.env.VITE_LOGO as string;

    return (
        <footer className="bg-blue1 text-black py-10">
            <div className="grid grid-cols-6">
                {/* Sección 1: Logo y descripción */}
                <div className="text-center col-span-6 xl:col-span-2 pb-8 xl:pb-0">
                    <img src={logoUrl} alt="Logo" className="h-16 mb-4 mx-auto"/>
                    <p>
                        Bienvenido a nuestra tienda, tu mejor elección para productos de calidad.
                    </p>
                </div>
                <div className="col-span-6 xl:col-span-4">
                    <div className="grid grid-cols-4 px-4 text-center">
                        {/* Sección 2: Ubicación con dirección y el mapa */}
                        <div className="col-span-4 w-100 md:col-span-2 lg:col-span-1">
                            <h2 className="text-lg font-semibold mb-4">Nuestra Ubicación</h2>
                            <p>Metro Santa Ana, Satiago, Chile</p>
                            <div className="mt-4 w-full h-48">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1979.7005711909715!2d-70.65916191813685!3d-33.43767909783297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5af90d78215%3A0x9cd113c27aec4cee!2sSanta%20Ana%20L5!5e0!3m2!1ses-419!2scl!4v1721002944456!5m2!1ses-419!2scl"
                                    width="100%"
                                    height="100%"
                                    allowFullScreen={false}
                                    loading="lazy"
                                    className="border-0"
                                ></iframe>
                            </div>
                        </div>

                        {/* Sección 3: Menú */}
                        <div className="col-span-4 w-100 md:col-span-2 lg:col-span-1">
                            <h2 className="text-lg font-semibold mb-4">Menú</h2>
                            <ul className="text-center">
                                <li className="mb-2"><a href="#">Inicio</a></li>
                                <li className="mb-2"><a href="#">Productos</a></li>
                                <li className="mb-2"><a href="#">Sobre Nosotros</a></li>
                                <li className="mb-2"><a href="#">Contacto</a></li>
                            </ul>
                        </div>
                        {/* Sección 4: Políticas */}
                        <div className="col-span-4 w-100 md:col-span-2 lg:col-span-1">
                            <h2 className="text-lg font-semibold mb-4">Políticas</h2>
                            <ul className="text-center">
                                <li className="mb-2"><a href="#">Política de privacidad</a></li>
                                <li className="mb-2"><a href="#">Política de envíos y entregas</a></li>
                                <li className="mb-2"><a href="#">Política de devoluciones</a></li>
                                <li className="mb-2"><a href="#">Términos y condiciones</a></li>
                                <li className="mb-2"><a href="#">Política de cookies</a></li>
                            </ul>
                        </div>
                        {/* Sección 5: Redes Sociales */}
                        <div className="col-span-4 w-100 md:col-span-2 lg:col-span-1">
                            <h2 className="text-lg font-semibold mb-4">Síguenos en</h2>
                            <div className="">
                                <a href="https://www.instagram.com/storetecito" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} size="2x" bounce/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 text-center">
                <p>&copy; 2024 Tecito Store. Todos los derechos reservados.</p>
                <p><a
                    href="https://github.com/brayanquirozurrutia/"
                    target="_blank"
                    rel="noopener noreferrer">Made with <FontAwesomeIcon
                    icon={faHeart}
                    beatFade
                    style={{color: "#ff0000",}}/> by Brayan Quiroz
                </a></p>
            </div>
        </footer>
    );
};

export default Footer;
