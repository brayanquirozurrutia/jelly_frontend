import React, { useState, useEffect } from 'react';
import {InputAdornment, TextField} from '@mui/material';
import {inputSearchStyles} from "../../../utils/textFieldStyles.ts";
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from "../../../hooks/Commons/useDebounce.ts";

interface CustomTableSearchProps {
    searchTerm: string;
    onSearchChange: (searchTerm: string) => void;
    label?: string;
    id: string;
    setFocusedInput: (value: string | null) => void;
    focusedInput: string | null;
    focusText: string;
}

const CustomTableSearch: React.FC<CustomTableSearchProps> = (
    {
        searchTerm,
        onSearchChange,
        label = 'Buscar',
        id,
        setFocusedInput,
        focusedInput,
        focusText,
    }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const debouncedSearchTerm = useDebounce(localSearchTerm, 500);

    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm !== searchTerm) {
            onSearchChange(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, searchTerm, onSearchChange]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLocalSearchTerm(value);
    };

    return (
        <TextField
            fullWidth
            margin="normal"
            id={id}
            label={label}
            value={localSearchTerm}
            onChange={handleSearchChange}
            sx={inputSearchStyles}
            onFocus={() => setFocusedInput(focusText)}
            onBlur={() => setFocusedInput(null)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: focusedInput === focusText ? '#a57ee8' : '' }} />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default CustomTableSearch;
