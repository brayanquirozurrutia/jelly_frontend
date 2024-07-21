import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {ClipLoader} from 'react-spinners'

interface ButtonProps {
    label: string;
    icon?: IconDefinition;
    onClick?: () => void;
    onClickForm?: (e: React.FormEvent) => Promise<void>
    className?: string;
    disabled?: boolean;
    loading?: boolean;
}

const BaseButton: React.FC<ButtonProps> = (
    {
        icon,
        label,
        onClick,
        className,
        disabled = false,
        loading = false,
        onClickForm
    }) => {
    return (
        <button
            className={`bg-purple1 hover:bg-purple2 text-black font-bold rounded-lg py-2 px-3 shadow-md ${className}`}
            onClick={onClick || onClickForm}
            disabled={disabled || loading}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <ClipLoader color="#000000" size={24}/>
                </div>
            ) : (
                <>
                    {icon && <FontAwesomeIcon icon={icon} className="text-black text-xl pr-2"/>}
                    <span>{label}</span>
                </>
            )}
        </button>
    );
};

export default BaseButton;
