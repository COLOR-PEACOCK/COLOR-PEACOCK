import { useMemo } from 'react';

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

// 색상 조합 생성 및 변환
const useColorVariants = hslColor => {
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
