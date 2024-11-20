import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@hooks/Home';
import { useCallback } from 'react';

const useHomeState = () => {
	const navigation = useNavigation<any>();
	const { storeData, getData } = useAsyncStorage();

	const handleSelectCamera = useCallback(() => {
		Alert.alert('알림', '카메라 기능은 추후 업데이트 예정입니다.');
	}, []);

	const handleSelectAlbum = useCallback(async () => {
		const pageName = 'ImageScreen';
		const isVisited = await isVisitedPage(pageName);
		navigation.navigate(pageName, { visited: isVisited });
	}, [navigation]);

	const handleSelectAI = useCallback(async () => {
		const pageName = 'AiScreen';
		const isVisited = await isVisitedPage(pageName);
		navigation.navigate(isVisited ? pageName : 'AiOnboardingScreen');
	}, [navigation]);

	const isVisitedPage = useCallback(
		async (pageName: string) => {
			const visitedKey = `${pageName}_visited`;
			const data = await getData(visitedKey);

			if (!data) {
				await storeData(visitedKey, 'true');
				return false;
			}
			return true;
		},
		[getData, storeData],
	);

	const handleSearch = useCallback(
		(hexValue: string) => {
			if (hexValue) {
				navigation.navigate('ColorRecommendScreen', {
					mainColor: { hexVal: hexValue },
				});
			}
		},
		[navigation],
	);

	return {
		handleSelectCamera,
		handleSelectAlbum,
		handleSelectAI,
		handleSearch,
	};
};

export default useHomeState;
