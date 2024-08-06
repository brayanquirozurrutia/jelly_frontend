import React, { useState } from 'react';

const useImageFileValidation = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string>('');
    const [imageFileName, setImageFileName] = useState<string | null>(null)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            if (file.type.startsWith('image/')) {
                setImageFile(file);
                setImageFileName(file.name);
                setImageError('');
            } else {
                setImageError('Solo se permiten archivos de imagen.');
                setImageFile(null);
                setImageFileName(null);
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
        setImageFileName(null);
    };

    return {
        imageFile,
        imageError,
        handleImageChange,
        validateImage,
        resetImage,
        setImageError,
        imageFileName
    };
};

export default useImageFileValidation;
