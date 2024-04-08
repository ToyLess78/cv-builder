import { CssColor } from '~/types/color-types';

export const hexToRGBAConvert = (hex: CssColor | string) => {
    const red = parseInt(hex.substring(1, 3), 16);
    const green = parseInt(hex.substring(3, 5), 16);
    const blue = parseInt(hex.substring(5, 7), 16);
    return `rgba(${red}, ${green}, ${blue}, 1)`
}
export const setAlphaToRGBA = (rgbaColor: CssColor | string, alpha: number): string => {
    const colorComponents = rgbaColor.split(',');
    const red = parseInt(colorComponents[0].substring(5).trim());
    const green = parseInt(colorComponents[1].trim());
    const blue = parseInt(colorComponents[2].trim());
    if (alpha < 0 || alpha > 1) {
        console.error('Alpha value should be between 0 and 1.');
        return rgbaColor;
    }
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}