import { useState, useEffect } from 'react';
import { getColorInfo } from '@utils/colorRecommendUtils';
import { useColorName, useGemini } from '@hooks';

export const useImageAiScreen = hexValue => {
	const [data, setData] = useState([]);
	const [colorInfo, setColorInfo] = useState({
		engName: '',
		korName: '',
		hexVal: '',
		rgbVal: '',
		hslVal: '',
		cmykVal: '',
	});
	const { getKorColorName, getEngColorNameLocal } = useColorName();
	const { run } = useGemini();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const result = await run(hexValue);
			setData(result);
			setIsLoading(false);
		};
		fetchData();
	}, [hexValue, run]);

	useEffect(() => {
		setColorInfo(() => {
			const colorData = getColorInfo(hexValue.replace('#', ''));
			return {
				engName: getEngColorNameLocal(hexValue),
				korName: getKorColorName(hexValue),
				hexVal: colorData.hexVal,
				rgbVal: colorData.rgbVal,
				hslVal: colorData.hslVal,
				cmykVal: colorData.cmykVal,
			};
		});
	}, [hexValue, data]);

	return {
		data,
		colorInfo,
		isLoading,
	};
};
