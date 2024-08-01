import React, { useState } from 'react';

const useImageFileValidation = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string>('');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            if (file.type.startsWith('image/')) {
                setImageFile(file);
                setImageError('');
            } else {
                setImageError('Solo se permiten archivos de imagen.');
                setImageFile(null);
            }
        }
    };

    const validateImage = () => {
        if (!imageFile) {
            setImageError('La imagen es requerida');
            return false;
        }
        setImageError('');
        return true;
    };

    const resetImage = () => {
        setImageFile(null);
        setImageError('');
    };

    return {
        imageFile,
        imageError,
        handleImageChange,
        validateImage,
        resetImage,
        setImageError,
    };
};

export default useImageFileValidation;
