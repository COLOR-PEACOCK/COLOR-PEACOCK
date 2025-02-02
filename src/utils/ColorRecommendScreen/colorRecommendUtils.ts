import convert from 'color-convert';

export interface ColorInfo {
	hexVal: string;
	rgbVal: string;
	hslVal: string;
	cmykVal: string;
}

export const hexToRgb = (hexVal: string): string => {
	const rgbArray = convert.hex.rgb(hexVal.replace('#', ''));
	return `rgb(${rgbArray.join(', ')})`;
};

export const hexToHsl = (hexVal: string): string => {
	const hslArray = convert.hex.hsl(hexVal.replace('#', ''));
	return `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;
};

export const hexToCmyk = (hexVal: string): string => {
	const cmykArray = convert.hex.cmyk(hexVal.replace('#', ''));
	return `CMYK(${cmykArray.join('%, ')}%)`;
};

export const getColorInfo = (hexVal: string): ColorInfo => {
	hexVal = hexVal.length > 6 ? hexVal.slice(1, 7) : hexVal;

	return {
		hexVal: `#${hexVal}`,
		rgbVal: hexToRgb(hexVal),
		hslVal: hexToHsl(hexVal),
		cmykVal: hexToCmyk(hexVal),
	};
};
