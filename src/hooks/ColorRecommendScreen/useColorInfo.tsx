import { useMemo, useState } from 'react';
import { getColorInfo } from '@utils/ColorRecommendScreen/colorRecommendUtils';
import { useColorName } from '@hooks/index';
import { COLOR } from '@styles/color';
import tinycolor from 'tinycolor2';

const useColorInfo = (initialColor: string) => {
	const [tempColor, setTempColor] = useState<string>(initialColor);
	const { getColorName } = useColorName();

	const colorInfo = useMemo(() => {
		if (!tempColor) {
			return {
				engName: '',
				korName: '',
				hexVal: '',
				rgbVal: '',
				hslVal: '',
				cmykVal: '',
			};
		}
		const colorData = getColorInfo(tempColor.replace('#', ''));
		const { korean_name, name } = getColorName(tempColor);
		return {
			engName: name,
			korName: korean_name,
			hexVal: colorData.hexVal,
			rgbVal: colorData.rgbVal,
			hslVal: colorData.hslVal,
			cmykVal: colorData.cmykVal,
		};
	}, [tempColor]);

	const textColor = useMemo(
		() => (tinycolor(tempColor).isLight() ? COLOR.GRAY_9 : COLOR.GRAY_3),
		[tempColor],
	);

	const labelColor = useMemo(
		() => (tinycolor(tempColor).isLight() ? COLOR.GRAY_10 : COLOR.WHITE),
		[tempColor],
	);

	return { tempColor, setTempColor, colorInfo, textColor, labelColor };
};

export default useColorInfo;
