import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@hooks/home';
import { RootStackParamList } from '../../router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useHomeState = () => {
	const navigation = useNavigation<any>();
	const { storeData, getData, clearData } = useAsyncStorage();

	const handleSelectCamera = () => {
		// navigation.navigate('CameraScreen')
		Alert.alert('알림', '카메라 기능은 추후 업데이트 예정입니다.');
	};
	const handleSelectAlbum = async () => {
		const pageName = 'ImageScreen';
		const isVisited = await isVisitedPage(pageName);
		navigation.navigate(pageName, { visited: isVisited });
	};
	const handleSelectAI = async () => {
		const pageName = 'AiScreen';
		const isVisited = await isVisitedPage(pageName);
		if (isVisited) navigation.navigate(pageName);
		else navigation.navigate('AiOnboardingScreen');
	};

	const isVisitedPage = async (pageName: string) => {
		const visitedKey = `${pageName}_visited`;
		const data = await getData(visitedKey);

		if (!data) {
			await storeData(visitedKey, 'true');
			return false;
		}
		return true;
	};

	const handleSearch = (hexValue: string) => {
		if (hexValue) {
			navigation.navigate('ColorRecommendScreen', {
				mainColor: { hexVal: hexValue },
			});
		}
	};

	return {
		handleSelectCamera,
		handleSelectAlbum,
		handleSelectAI,
		handleSearch,
	};
};

export default useHomeState;
