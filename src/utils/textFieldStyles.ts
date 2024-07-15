
export const textFieldStyles = (error: boolean) => ({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#be87e7',
        },
        '&.Mui-focused fieldset': {
            borderColor: error ? 'red' : '#a57ee8',
        },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'black',
        fontWeight: 'bold',
    },
});

export const linkStyles = {
    '&:hover': {
        textDecoration: 'underline',
    },
    textDecoration: 'none',
}
