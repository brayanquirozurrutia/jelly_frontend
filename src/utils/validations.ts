export const validateRut = (rut: string): boolean => {
    const cleanedRut = rut.replace(/\./g, '').toLowerCase();
    const rutRegex = /^\d{7,8}-[\dk]{1}$/;

    return rutRegex.test(cleanedRut);
};


export const validateEmail = (email: string): boolean => {
    // Validación de email permitiendo . - _ @ + letras y números
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
