import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import { BasicHeader } from '@components/common';
import {
	ColorPickerModal,
	MainColorInfo,
	ColorPalette,
} from '@components/ColorRecommend';
import { ColorRecommendScreenInfoText } from '@utils/infoText';
import { getColorVariants } from '@utils/ColorRecommendScreen';
import { useColorInfo } from '@hooks/ColorRecommendScreen';
import { COLOR } from '@styles/color';

type ColorPaletteData = {
	titleKor: string;
	titleEng: string;
	colors: string[];
};

const ColorRecommendScreen = ({
	route,
	navigation,
}: ColorRecommendScreenProps) => {
	const { mainColor } = route.params;
	const { tempColor, setTempColor, colorInfo, textColor, labelColor } =
		useColorInfo(mainColor.hexVal);

	const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);

	const colorVariants = getColorVariants(tempColor.replace('#', ''));

	const handleColorSelect = (selectedColors: string[]) => {
		navigation.navigate('ObjectScreen', selectedColors);
	};

	const colorPaletteData: ColorPaletteData[] = [
		{
			titleKor: '단색',
			titleEng: 'Monochromatic color',
			colors: colorVariants.monochromaticColors,
		},
		{
			titleKor: '보색',
			titleEng: 'Complementary color',
			colors: colorVariants.complementaryColors,
		},
		{
			titleKor: '밝게',
			titleEng: 'Tint',
			colors: colorVariants.tintColors,
		},
		{
			titleKor: '어둡게',
			titleEng: 'Shade',
			colors: colorVariants.shadowColors,
		},
		{
			titleKor: '유사색',
			titleEng: 'Analogous colors',
			colors: colorVariants.analogousColors,
		},
		{
			titleKor: '분할 보색',
			titleEng: 'Split complementary colors',
			colors: colorVariants.splitComplementaryColors,
		},
		{
			titleKor: '3가지 색상 조화',
			titleEng: 'Three colors harmony',
			colors: colorVariants.triadicColors,
		},
		{
			titleKor: '4가지 색상 조화',
			titleEng: 'Four colors harmony',
			colors: colorVariants.tetradicColors,
		},
	];

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader
				titleIcon={'palette'}
				title={'색상 추천'}
				subTitle={'color palette'}
				rightIcon={'info'}
				infoText={ColorRecommendScreenInfoText}
			/>
			<View style={styles.container}>
				<ScrollView
					style={styles.colorPaletteWrap}
					showsVerticalScrollIndicator={false}>
					<View
						style={[
							styles.colorBox,
							{ backgroundColor: tempColor },
						]}>
						<MainColorInfo
							colorInfo={colorInfo}
							textColor={textColor}
							labelColor={labelColor}
							setIsPickerVisible={setIsPickerVisible}
						/>
					</View>
					<View style={styles.split} />
					<View style={{ marginBottom: 18 }}>
						{colorPaletteData.map((palette, index) => (
							<ColorPalette
								key={index}
								titleKor={palette.titleKor}
								titleEng={palette.titleEng}
								colors={palette.colors}
								onColorSelect={handleColorSelect}
							/>
						))}
					</View>
				</ScrollView>
				<ColorPickerModal
					isVisible={isPickerVisible}
					tempColor={tempColor}
					setTempColor={setTempColor}
					setIsPickerVisible={setIsPickerVisible}
					onCancel={() => setIsPickerVisible(false)}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		paddingHorizontal: 18,
	},
	colorBox: {
		flexDirection: 'row',
		width: '100%',
		height: 214,
		marginVertical: 24,
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: COLOR.GRAY_3,
	},
	colorPaletteWrap: {
		width: '100%',
	},
	split: {
		width: '100%',
		height: 4,
		marginBottom: 18,
		backgroundColor: COLOR.GRAY_1,
	},
});

export default ColorRecommendScreen;
