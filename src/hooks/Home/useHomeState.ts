import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAsyncStorage } from '@hooks/Home';
import { PressButtonProps } from '@components/Home/PressButton';

const useHomeState = () => {
	type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
	const navigation = useNavigation<HomeScreenNavigationProp>();
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

	const buttonList: PressButtonProps[] = [
		{
			iconName: 'camera',
			onPress: handleSelectCamera,
			engText: 'SELECT FROM CAMERA',
			text: '카메라로 색상 추천 받기',
		},
		{
			iconName: 'image',
			onPress: handleSelectAlbum,
			engText: 'SELECT TO ALBUM',
			text: '이미지로 색상 추천 받기',
		},
		{
			iconName: 'AI',
			onPress: handleSelectAI,
			engText: 'SELECT TO AI',
			text: 'AI로 색상 추천 받기',
		},
	];

	const trendColor: color[] = [
		{
			hexcode: '#EAACC6',
			colorName: 'Pink Macaroon',
		},
		{
			hexcode: '#FFDAB9',
			colorName: 'Peach Puff',
		},
		{
			hexcode: '#FFAA4A',
			colorName: 'Five Star',
		},
		{
			hexcode: '#A2CFFE',
			colorName: 'Baby Blue',
		},
		{
			hexcode: '#EDDCC8',
			colorName: 'Almond',
		},
		{
			hexcode: '#816575',
			colorName: 'Opera',
		},
	];

	return {
		buttonList,
		handleSelectCamera,
		handleSelectAlbum,
		handleSelectAI,
		handleSelectColorRecommend,
		trendColor,
	};
};

export default useHomeState;
