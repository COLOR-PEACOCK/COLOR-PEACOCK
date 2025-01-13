import React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import { COLOR } from '@styles/color';
import { LoadingScreen, BasicHeader } from '@components/common';
import { MainColorInfo, ColorPalette } from '@components/ColorRecommend';
import { ImageAiScreeninfoText } from '@utils/infoText';
import { useColorInfo } from '@hooks/ColorRecommendScreen';
import { useFetchColorData } from '@hooks/ImageScreen';

const ImageAiScreen = ({ route, navigation }: ImageAiScreenProps) => {
	const { mainColor } = route.params;
	const { colorInfo, textColor, labelColor } = useColorInfo(mainColor.hexVal);
	const { data, isLoading } = useFetchColorData(mainColor.hexVal, navigation);

	const handleColorSelect = (selectedColors: string[]) => {
		navigation.navigate('ObjectScreen', selectedColors);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader
				titleIcon="AI"
				title="AI 테마 추천"
				subTitle="ai theme recs"
				rightIcon="info"
				infoText={ImageAiScreeninfoText}
			/>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<LoadingScreen />
				</View>
			) : (
				<ScrollView
					style={{ paddingHorizontal: 18 }}
					showsVerticalScrollIndicator={false}>
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
					<View style={styles.paletteContainer}>
						{data &&
							data.recommended_themes_and_colors?.map(item => (
								<ColorPalette
									key={item.theme_name_kr}
									titleKor={item.theme_name_kr}
									titleEng={item.theme_name_eng}
									colors={[data?.base_color.hexCode].concat(
										item.theme_hexCode_list,
									)}
									onColorSelect={handleColorSelect}
									descriptions={item.colors}
								/>
							))}
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
