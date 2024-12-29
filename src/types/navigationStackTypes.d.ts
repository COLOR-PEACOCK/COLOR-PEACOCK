declare type RootStackParamList = {
	Home: undefined;
	CameraScreen: undefined;
	ImageScreen: { visited: boolean };
	ImageAiScreen: { mainColor: { hexVal: string } };
	AiOnboardingScreen: undefined;
	AiScreen: undefined;
	AiResponseScreen: {
		itemInImage: string;
		itemToRecommend: string;
		base64Image: string;
	};
	ColorRecommendScreen: { mainColor: { hexVal: string } };
	ObjectScreen: string[];
	ObjectInterior: string[];
};

type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
type ScreenNavigationProps<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;

type HomeScreenProps = ScreenProps<'Home'>;
type HomeScreenNavigationProps = ScreenNavigationProps<'Home'>
type CameraScreenProps = ScreenProps<'CameraScreen'>;
type ImageScreenProps = ScreenProps<'ImageScreen'>;
type ImageAiScreenProps = ScreenProps<'ImageAiScreen'>;
type AiOnboardingScreenProps = ScreenProps<'AiOnboardingScreen'>;
type AiOnboardingScreenNavigationProps = ScreenNavigationProps<'AiOnboardingScreen'>
type AiScreenProps = ScreenProps<'AiScreen'>;
type AiResponseScreenProps = ScreenProps<'AiResponseScreen'>;
type ColorRecommendScreenProps = ScreenProps<'ColorRecommendScreen'>;
type ObjectScreenProps = ScreenProps<'ObjectScreen'>;
type ObjectInteriorProps = ScreenProps<'ObjectInterior'>;