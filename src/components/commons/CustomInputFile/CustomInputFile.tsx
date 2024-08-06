import React from 'react';
import { Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface CustomInputFileProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
    buttonText: string;
    buttonStyle?: object;
    startIcon?: React.ReactNode;
    error?: string;
    fileName?: string | null;
}

const CustomInputFile: React.FC<CustomInputFileProps> = ({
                                                             onChange,
                                                             id,
                                                             buttonText,
                                                             buttonStyle,
                                                             startIcon,
                                                             error,
    fileName
                                                         }) => {
    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                id={id}
                hidden
            />
            <label htmlFor={id} className="w-full py-2">
                <Button
                    sx={{
                        backgroundColor: '#b1e788',
                        '&:hover': {
                            backgroundColor: '#9de06a',
                        },
                        color: 'black',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        paddingY: '15px',
                        paddingX: '12px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                        ...buttonStyle,
                    }}
                    component="span"
                    startIcon={startIcon || <AddPhotoAlternateIcon />}
                >
                    {buttonText}
                </Button>
            </label>
            {fileName && <p className="mt-2 text-gray-700">Archivo seleccionado: {fileName}</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default CustomInputFile;
