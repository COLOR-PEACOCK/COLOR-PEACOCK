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
