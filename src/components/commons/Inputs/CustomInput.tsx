import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { textFieldStyles } from '../../../utils/textFieldStyles';
import { InputProps } from '../../../types.ts';


const CustomInput: React.FC<InputProps> = (
    {
        value,
        setValue,
        valueError,
        setFocusedInput,
        focusedInput,
        id,
        label,
        placeholder,
        icon: Icon,
        focusText,
        type,
        maxLength,
        required = false
    }) => {

    return (
        <TextField
            fullWidth
            margin="normal"
            id={id}
            label={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            error={valueError !== ''}
            helperText={valueError}
            sx={textFieldStyles(valueError !== '')}
            placeholder={placeholder}
            onFocus={() => setFocusedInput(focusText)}
            onBlur={() => setFocusedInput(null)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icon sx={{ color: focusedInput === focusText ? '#a57ee8' : '' }} />
                    </InputAdornment>
                ),
            }}
            variant="outlined"
            type={type}
            inputProps={{ maxLength }}
            required={required}
        />
    );
};

export default CustomInput;
