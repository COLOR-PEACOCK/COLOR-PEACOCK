import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useGemini } from '@hooks';

interface Navigation {
	goBack: () => void;
}

export const useFetchColorData = (hexValue: string, navigation: Navigation) => {
	const [data, setData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { run } = useGemini();

	const fetchData = async () => {
		setIsLoading(true);
		const response = await run(hexValue);
		setIsLoading(false);

		if (response) {
			setData(response);
		} else {
			Alert.alert('알림', 'AI 분석 중 오류가 발생했습니다.', [
				{ text: '확인', onPress: () => navigation.goBack() },
			]);
		}
	};

	useEffect(() => {
		fetchData();
	}, [hexValue]);

	return { data, isLoading };
};
