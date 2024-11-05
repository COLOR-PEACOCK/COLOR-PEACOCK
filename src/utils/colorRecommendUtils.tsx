import convert from 'color-convert';

interface ColorInfo {
	hexVal: string;
	rgbVal: string;
	hslVal: string;
	cmykVal: string;
}

// 색상 정보 (hexVal, rgbVal, hslVal, cmykVal)
export const getColorInfo = (hexVal: string): ColorInfo => {
	hexVal = hexVal.length > 6 ? hexVal.slice(1, 7) : hexVal;

	const rgbArray = convert.hex.rgb(hexVal.replace('#', ''));
	const hslArray = convert.hex.hsl(hexVal.replace('#', ''));
	const cmykArray = convert.hex.cmyk(hexVal.replace('#', ''));

	return {
		hexVal: `#${hexVal}`,
		rgbVal: `rgb(${rgbArray.join(', ')})`,
		hslVal: `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`,
		cmykVal: `CMYK(${cmykArray.join('%, ')}%)`,
	};
};
