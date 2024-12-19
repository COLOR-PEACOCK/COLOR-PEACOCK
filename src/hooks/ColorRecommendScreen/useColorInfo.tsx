import { useState, useEffect } from 'react';

// hooks & utils
import { getColorInfo } from '@utils/colorRecommendUtils';
import { useColorName } from '@hooks/index';

// styles
import { COLOR } from '@styles/color';
import tinycolor from 'tinycolor2';

interface ColorInfo {
	engName: string;
	korName: string;
	hexVal: string;
	rgbVal: string;
	hslVal: string;
	cmykVal: string;
}

const useColorInfo = (initialColor: string) => {
	const [tempColor, setTempColor] = useState<string>(initialColor);
	const { getColorName } = useColorName();

	const [colorInfo, setColorInfo] = useState<ColorInfo>(() => {
		const colorData = getColorInfo(tempColor.replace('#', '')) || {};
		const { korean_name, name } = getColorName(tempColor);
		return {
			engName: name,
			korName: korean_name,
			hexVal: colorData.hexVal,
			rgbVal: colorData.rgbVal,
			hslVal: colorData.hslVal,
			cmykVal: colorData.cmykVal,
		};
	});

	// 색상 정보 업데이트
	useEffect(() => {
		if (tempColor) {
			const updateColorInfo = () => {
				const colorData = getColorInfo(tempColor.replace('#', ''));
				const { korean_name, name } = getColorName(tempColor);

				setColorInfo({
					engName: name,
					korName: korean_name,
					hexVal: colorData.hexVal,
					rgbVal: colorData.rgbVal,
					hslVal: colorData.hslVal,
					cmykVal: colorData.cmykVal,
				});
			};

			updateColorInfo();
		}
	}, [tempColor]);

	//  색상에 따라 텍스트 색상 변화
	const textColor = tinycolor(tempColor).isLight()
		? COLOR.GRAY_9
		: COLOR.GRAY_3;
	const labelColor = tinycolor(tempColor).isLight()
		? COLOR.GRAY_10
		: COLOR.WHITE;

	return { tempColor, setTempColor, colorInfo, textColor, labelColor };
};

export default useColorInfo;
