import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    InputAdornment,
} from '@mui/material';

import {CustomDropDownProps, DropDownItem} from "./types/CustomDropDown.types.ts";

const CustomDropDown = <T extends DropDownItem>(
    {
        label,
        placeholder,
        items,
        icon: Icon,
        selectedValue,
        onChange,
        sx,
    }: CustomDropDownProps<T>) => {
    return (
        <FormControl
            fullWidth
            variant="outlined"
            className="mt-2"
            sx={{
                '& .MuiInputLabel-shrink': {
                    '&.Mui-focused': {
                        fontWeight: 'bold',
                        color: 'black',
                    },
                },
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: '#be87e7',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#a57ee8',
                    },
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiInputAdornment-root': {
                    color: '#a57ee8',
                },
                ...sx,
            }}
        >
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                value={selectedValue || ''}
                onChange={onChange}
                startAdornment={
                    <InputAdornment position="start">
                        <Icon />
                    </InputAdornment>
                }
                input={<OutlinedInput label={label} />}
                displayEmpty
            >
                <MenuItem value="" disabled>
                    {placeholder}
                </MenuItem>
                {items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomDropDown;
