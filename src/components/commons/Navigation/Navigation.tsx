import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../Dropdown';

interface MenuItem {
    label: string;
    subMenuItems?: MenuItem[];
}

const Navigation: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems: MenuItem[] = [
        { label: "Opción 1" },
        { label: "Opción 2" },
        {
            label: "Opción 3",
            subMenuItems: [
                { label: "Subopción 1" },
                {
                    label: "Subopción 2",
                    subMenuItems: [
                        { label: "Sub-subopción 1" },
                        { label: "Sub-subopción 2" }
                    ]
                },
                { label: "Subopción 3" }
            ]
        },
        { label: "Opción 4" },
        {
            label: "Opción 5",
            subMenuItems: [
                { label: "Subopción 1" },
                { label: "Subopción 2" },
                { label: "Subopción 3" }
            ]
        },
    ];

    return (
        <nav className="bg-white border-t border-b border-slate-400 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="md:hidden">
                    <button className="text-gray-800 hover:text-black focus:outline-none" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} style={{ color: '#a57ee8' }} />
                    </button>
                </div>
                <div className="hidden md:flex justify-center w-full space-x-4">
                    {menuItems.map((menuItem, index) => (
                        <React.Fragment key={index}>
                            <Dropdown menuItem={menuItem} isMobile={false} />
                            {index !== menuItems.length - 1 && (
                                <div className="h-6 border-l border-slate-400"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {isMenuOpen && (
                    <div ref={menuRef} className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
                        <div className="flex flex-col items-start p-4">
                            {menuItems.map((menuItem, index) => (
                                <Dropdown key={index} menuItem={menuItem} isMobile={true} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
