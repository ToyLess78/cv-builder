import type { CssColor } from "~/types/color.types";

export const hexToRGBAConvert = (hex: CssColor | string) => {
	const red = Number.parseInt(hex.substring(1, 3), 16);
	const green = Number.parseInt(hex.substring(3, 5), 16);
	const blue = Number.parseInt(hex.substring(5, 7), 16);
	return `rgba(${red}, ${green}, ${blue}, 1)`;
};
export const setAlphaToRGBA = (
	rgbaColor: CssColor | string,
	alpha: number,
): string => {
	const colorComponents = rgbaColor.split(",");
	const red = Number.parseInt(colorComponents[0].substring(5).trim());
	const green = Number.parseInt(colorComponents[1].trim());
	const blue = Number.parseInt(colorComponents[2].trim());
	if (alpha < 0 || alpha > 1) {
		console.error("Alpha value should be between 0 and 1.");
		return rgbaColor;
	}
	return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
