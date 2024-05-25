import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
    label: string;
    subMenuItems?: MenuItem[];
}

interface DropdownProps {
    menuItem: MenuItem;
    isMobile?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ menuItem, isMobile = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className={`relative ${isMobile ? 'w-full' : 'inline-block'}`}>
            <button
                className={`text-gray-800 focus:outline-none px-4 flex items-center justify-between w-full md:w-auto ${
                    menuItem.subMenuItems ? 'has-dropdown' : 'hover:underline hover:decoration-purple2 hover:underline-offset-2 hover:text-black'
                }`}
                onClick={toggleOpen}
            >
                {menuItem.label}
                {menuItem.subMenuItems && <FontAwesomeIcon icon={faCaretDown} className="ml-2 text-purple1 hover:text-purple2" />}
            </button>
            {isOpen && menuItem.subMenuItems && (
                <div className={`mt-2 ${isMobile ? 'block' : 'absolute left-full top-5'} bg-white rounded-md shadow-lg py-2 z-20 ${isMobile ? 'w-full' : 'w-48'}`}>
                    {menuItem.subMenuItems.map((subMenuItem, index) => (
                        <Dropdown key={index} menuItem={subMenuItem} isMobile={isMobile} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
