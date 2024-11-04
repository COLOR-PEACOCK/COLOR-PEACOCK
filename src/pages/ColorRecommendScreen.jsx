import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

// components
import { BasicHeader } from '@components/common';
import {
	ColorPickerModal,
	ColorPalette,
	MainColorInfo,
} from '@components/ColorRecommend';

// hooks & utils
import { useColorInfo, useColorVariants } from '@hooks/ColorRecommendScreen';
import { ColorRecommendScreenInfoText } from '@utils/infoText';

// styles
import { COLOR } from '@styles/color';

const ColorRecommendScreen = ({ route, navigation }) => {
	const { mainColor } = route.params;
	const { tempColor, setTempColor, colorInfo, textColor, labelColor } =
		useColorInfo(mainColor.hexVal);

	const [isPickerVisible, setIsPickerVisible] = useState(false);

	const colorVariants = useColorVariants(tempColor.replace('#', ''));

	const handleColorSelect = selectedColors => {
		navigation.navigate('ObjectScreen', selectedColors);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* 베이직 헤더 */}
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
						{/* 메인 컬러 정보 */}
						<MainColorInfo
							colorInfo={colorInfo}
							textColor={textColor}
							labelColor={labelColor}
							setIsPickerVisible={setIsPickerVisible}
						/>
					</View>
					<View style={styles.split} />
					{/* 컬러 팔레트들 */}
					<View style={{ marginBottom: 18 }}>
						<ColorPalette
							titleKor="단색"
							titleEng="Monochromatic color"
							colors={colorVariants.monochromaticColors}
							onColorSelect={handleColorSelect}
						/>
						<ColorPalette
							titleKor="보색"
							titleEng="Complementary color"
							colors={colorVariants.complementaryColors}
							onColorSelect={handleColorSelect}
						/>
						<ColorPalette
							titleKor="밝게"
							titleEng="Tint"
							colors={colorVariants.tintColors}
							onColorSelect={handleColorSelect}
						/>
						<ColorPalette
							titleKor="어둡게"
							titleEng="Shade"
							colors={colorVariants.shadowColors}
							onColorSelect={handleColorSelect}
						/>
						<ColorPalette
							titleKor="유사색"
							titleEng="Analogous colors"
							colors={colorVariants.analogousColors}
							onColorSelect={handleColorSelect}
						/>
						<ColorPalette
							titleKor="분할 보색"
							titleEng="Split complementary colors"
							colors={colorVariants.splitComplementaryColors}
							onColorSelect={handleColorSelect}
						/>
						<ColorPalette
							titleKor="3가지 색상 조화"
							titleEng="Three colors harmony"
							colors={colorVariants.triadicColors}
							onColorSelect={handleColorSelect}
						/>
						<ColorPalette
							titleKor="4가지 색상 조화"
							titleEng="Four colors harmony"
							colors={colorVariants.tetradicColors}
							onColorSelect={handleColorSelect}
						/>
					</View>
				</ScrollView>
				{/* 컬러 피커 모달 */}
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
