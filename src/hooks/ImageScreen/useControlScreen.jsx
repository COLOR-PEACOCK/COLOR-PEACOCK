import { useCallback } from 'react';

export const useControlScreen = (navigation, color) => {
	// 색상 추천 화면으로
	const handleColorRecommend = useCallback(() => {
		navigation.navigate('ColorRecommendScreen', {
			mainColor: { hexVal: color },
		});
	}, [navigation, color]);

	// AI 테마 추천 화면으로
	const handleAiRecommend = useCallback(() => {
		navigation.navigate('ImageAiScreen', { mainColor: { hexVal: color } });
	}, [navigation, color]);

	return {
		handleColorRecommend,
		handleAiRecommend,
	};
};
