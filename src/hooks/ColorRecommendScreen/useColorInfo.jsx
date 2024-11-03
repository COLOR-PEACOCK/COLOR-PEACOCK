import { useState, useEffect } from 'react';

// hooks & utils
import { getColorInfo } from '@utils/colorRecommendUtils';
import { useColorName } from '@hooks';

// styles
import { COLOR } from '@styles/color';
import tinycolor from 'tinycolor2';

const useColorInfo = initialColor => {
	const [tempColor, setTempColor] = useState(initialColor);
	const { getEngColorNameLocal, getKorColorName } = useColorName();

	const [colorInfo, setColorInfo] = useState(() => {
		const colorData = getColorInfo(tempColor.replace('#', '')) || {};
		return {
			engName: getEngColorNameLocal(tempColor),
			korName: getKorColorName(tempColor),
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
				const engName = getEngColorNameLocal(tempColor);
				const korName = getKorColorName(tempColor);

				setColorInfo({
					engName: engName,
					korName: korName,
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
