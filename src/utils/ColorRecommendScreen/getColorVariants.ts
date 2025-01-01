import convert from 'color-convert';
import tinycolor from 'tinycolor2';

import {
	getComplementaryColor,
	getAnalogousColors,
	getTriadicColors,
	getSplitComplementaryColors,
	getMonochromaticColors,
	getTetradicColors,
	getTintColors,
	getShadowColors,
} from '@utils/ColorRecommendScreen/colorRecommendExpression';

interface ColorVariants {
	monochromaticColors: string[];
	complementaryColors: string[];
	tintColors: string[];
	shadowColors: string[];
	analogousColors: string[];
	splitComplementaryColors: string[];
	triadicColors: string[];
	tetradicColors: string[];
}

export const getColorVariants = (hexColor: string): ColorVariants => {
	const hslColor = convert.hex.hsl(hexColor);

	return {
		monochromaticColors: getMonochromaticColors(hslColor),
		complementaryColors: getComplementaryColor(hslColor),
		tintColors: getTintColors(hslColor),
		shadowColors: getShadowColors(hslColor),
		analogousColors: getAnalogousColors(hslColor),
		splitComplementaryColors: getSplitComplementaryColors(hslColor),
		triadicColors: getTriadicColors(hslColor).map(hsl =>
			tinycolor(hsl).toHexString(),
		),
		tetradicColors: getTetradicColors(hslColor),
	};
};
