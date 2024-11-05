import { useCallback } from 'react';

interface Navigation {
	navigate: (
		screen: string,
		params: { mainColor: { hexVal: string } },
	) => void;
}

export const useControlScreen = (navigation: Navigation, color: string) => {
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
