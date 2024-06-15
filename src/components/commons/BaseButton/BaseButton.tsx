import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
    label: string;
    icon?: IconDefinition;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ icon, label, onClick, className }) => {
    return (
        <button
            className={`w-full md:w-auto xl:w-auto px-3 py-2 bg-purple1 hover:bg-purple2 text-black font-bold rounded-lg flex items-center justify-center md:justify-center xl:justify-start space-x-2 ${className}`}
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon icon={icon} className="text-black text-xl" />}
            <span>{label}</span>
        </button>
    );
};

export default Button;
