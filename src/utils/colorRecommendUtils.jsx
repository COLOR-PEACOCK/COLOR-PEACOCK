import convert from 'color-convert';

// 색상 정보 (hexVal, rgbVal, hslVal, cmykVal)
export const getColorInfo = hexVal => {
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
