export const capitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const isImageUrl = (url: string) => {
    return /\.(jpeg|jpg|gif|png|svg|webp)$/.test(url);
};
