declare type RootStackParamList = {
	Home: undefined;
	CameraScreen: undefined;
	ImageScreen: { visited: boolean };
    ImageAiScreen: { mainColor: { hexVal: string } };
	AiOnboardingScreen: undefined;
	AiScreen: {
		itemInImage: string;
		itemToRecommend: string;
		base64Image: string;
	};
	AiResponseScreen: undefined;
	ColorRecommendScreen: { mainColor: { hexVal: string } };
	ObjectScreen: { selectedColors: string[] };
	ObjectInterior: { selectedColors: string[] };
};