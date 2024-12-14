import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useGemini } from '@hooks/index';
import { ResponseData } from '@hooks/useGemini';

interface Navigation {
	goBack: () => void;
}

export const useFetchColorData = (hexValue: string, navigation: Navigation) => {
	const [data, setData] = useState<ResponseData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { run } = useGemini();

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const data = await run(hexValue);
			if (!data.base_color || !data.recommended_themes_and_colors) {
				throw new Error('Invalid data format received from AI.');
			}
			setData(data);
		} catch (error) {
			console.error('Error fetching color data:', error);
			Alert.alert('알림', 'AI 분석 중 오류가 발생했습니다.', [
				{ text: '확인', onPress: () => navigation.goBack() },
			]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [hexValue]);

	return { data, isLoading };
};
