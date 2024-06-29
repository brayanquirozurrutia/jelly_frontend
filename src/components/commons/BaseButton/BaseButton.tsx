import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
    label: string;
    icon?: IconDefinition;
    onClick?: () => void;
    className?: string;
}

const BaseButton: React.FC<ButtonProps> = (
    {
        icon,
        label,
        onClick,
        className
    }) => {
    return (
        <button
            className={`bg-purple1 hover:bg-purple2 text-black font-bold rounded-lg py-2 px-3 shadow-md ${className}`}
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon icon={icon} className="text-black text-xl pr-2" />}
            <span>{label}</span>
        </button>
    );
};

export default BaseButton;
