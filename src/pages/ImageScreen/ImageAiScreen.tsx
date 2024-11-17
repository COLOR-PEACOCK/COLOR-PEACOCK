import React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import { COLOR } from '@styles/color';

// components
import { LoadingScreen, BasicHeader } from '@components/common';
import { MainColorInfo, ColorPalette } from '@components/ColorRecommend';

// hooks & utils
import { ImageAiScreeninfoText } from '@utils/infoText';
import { useColorInfo } from '@hooks/ColorRecommendScreen';
import { useFetchColorData } from '@hooks/ImageScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface RecommendedTheme {
	theme_name_kr: string;
	theme_name_eng: string;
	theme_hexCode_list: string[];
	colors: string[];
}

type ImageAiScreenProps = NativeStackScreenProps<RootStackParamList, 'ImageAiScreen'>;

const ImageAiScreen: React.FC<ImageAiScreenProps> = ({ route, navigation }) => {
	const { mainColor } = route.params;
	const { colorInfo, textColor, labelColor } = useColorInfo(mainColor.hexVal);
	const { data, isLoading } = useFetchColorData(mainColor.hexVal, navigation);

	const handleColorSelect = (selectedColors: string[]) => {
		navigation.navigate('ObjectScreen', selectedColors);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* 베이직 헤더 */}
			<BasicHeader
				titleIcon="AI"
				title="AI 테마 추천"
				subTitle="ai theme recs"
				rightIcon="info"
				infoText={ImageAiScreeninfoText}
			/>
			{/* 로딩 화면 */}
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<LoadingScreen />
				</View>
			) : (
				<ScrollView
					style={{ paddingHorizontal: 18 }}
					showsVerticalScrollIndicator={false}>
					{/* 메인 컬러 정보 */}
					<View
						style={[
							styles.colorBox,
							{ backgroundColor: mainColor.hexVal },
						]}>
						<MainColorInfo
							colorInfo={colorInfo}
							textColor={textColor}
							labelColor={labelColor}
						/>
					</View>
					{/* 컬러 팔레트들 */}
					<View style={styles.paletteContainer}>
						{data &&
							data.recommended_themes_and_colors?.map(
								(item: RecommendedTheme) => (
									<ColorPalette
										key={item.theme_name_kr}
										titleKor={item.theme_name_kr}
										titleEng={item.theme_name_eng}
										colors={[
											data?.base_color[0].hexCode,
										].concat(item.theme_hexCode_list)}
										onColorSelect={handleColorSelect}
										description={item.colors}
									/>
								),
							)}
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	colorBox: {
		flexDirection: 'row',
		width: '100%',
		height: 214,
		marginVertical: 24,
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: COLOR.GRAY_3,
	},
	paletteContainer: {
		marginBottom: 18,
	},
});

export default ImageAiScreen;
