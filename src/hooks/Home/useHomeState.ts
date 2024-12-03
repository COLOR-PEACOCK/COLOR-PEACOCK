import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAsyncStorage } from '@hooks/Home';

const useHomeState = () => {
	type HomeScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'Home'>;
	const navigation = useNavigation<HomeScreenRouteProp>().navigation;
	const { storeData, getData } = useAsyncStorage();

	const handleSelectCamera = () => {
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
		navigation.navigate(isVisited ? pageName : 'AiOnboardingScreen');
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

	const handleSelectColorRecommend = (hexValue: string) => {
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
		handleSelectColorRecommend,
	};
};

export default useHomeState;
