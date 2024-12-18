import { useMemo } from 'react';
import convert from 'color-convert'; // hex -> hsl 로 변환

// hooks & utils
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

// styles
import tinycolor from 'tinycolor2';

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

// 색상 조합 생성 및 변환
const useColorVariants = (hexColor: string): ColorVariants => {
	const hslColor = convert.hex.hsl(hexColor);

	return useMemo(
		() => ({
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
		}),
		[hslColor],
	);
};

export default useColorVariants;
