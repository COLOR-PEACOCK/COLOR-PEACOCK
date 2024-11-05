// TODO : 시간이 된다면 기능 -> 훅, 뷰 -> 컴포넌트 리팩토링

import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

// components
import { ColorInfoModal } from '@components/ColorRecommend';
import { CustomText as Text } from '@components/common/CustomText';

// hooks & utils
import { useColorInfo } from '@hooks/ColorRecommendScreen';

// styles
import { COLOR } from '@styles/color';
import tinycolor from 'tinycolor2';

// icons
import HangerIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ColorPaletteProps {
	titleKor: string;
	titleEng: string;
	colors: string[];
	onColorSelect: (selectedColors: string[]) => void;
	description?: { hexCode: string; harmony_description: string }[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
	titleKor,
	titleEng,
	colors,
	onColorSelect,
	description,
}) => {
	const [isButtonPressed, setIsButtonPressed] = useState(false);
	const [selectedColor, setSelectedColor] = useState<string | null>(
		colors[0],
	);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { colorInfo, setTempColor } = useColorInfo(selectedColor || '');

	const handleColorPress = (color: string) => {
		const hexColor = tinycolor(color).toHexString();
		setSelectedColor(hexColor);
		setTempColor(hexColor);
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
		setSelectedColor(null);
	};

	return (
		<View style={styles.container}>
			{/* 이름 */}
			<View style={styles.header}>
				<Text style={styles.titleKor}>{titleKor}</Text>
				<Text style={styles.titleEng}>{titleEng}</Text>
			</View>
			{/* 팔레트의 컬러들 */}
			<View style={styles.paletteContainer}>
				<View style={styles.colorRow}>
					{colors.map((color, index) => {
						const borderRadiusStyle =
							index === 0
								? {
										borderTopLeftRadius: 8,
										borderBottomLeftRadius: 8,
								  }
								: index === colors.length - 1
								? {
										borderTopRightRadius: 8,
										borderBottomRightRadius: 8,
								  }
								: {};

						return (
							<TouchableOpacity
								key={index}
								style={[
									styles.colorBox,
									{
										backgroundColor:
											tinycolor(color).toHexString(),
									},
									borderRadiusStyle,
								]}
								onPress={() => handleColorPress(color)}
								activeOpacity={0.9}
							/>
						);
					})}
				</View>
				{/* 클릭 -> 오브젝트 화면으로 색상 팔레트 넘김 */}
				<Pressable
					style={[
						styles.iconContainer,
						{
							backgroundColor: isButtonPressed
								? COLOR.PRIMARY
								: COLOR.WHITE,
						},
					]}
					activeOpacity={1}
					onPressIn={() => setIsButtonPressed(true)}
					onPress={() =>
						onColorSelect(
							colors.map(c => tinycolor(c).toHexString()),
						)
					}
					onPressOut={() => setIsButtonPressed(false)}>
					<HangerIcon
						name="hanger"
						size={24}
						color={isButtonPressed ? COLOR.WHITE : COLOR.PRIMARY}
					/>
				</Pressable>
			</View>
			{/* 각 컬러의 정보 확인 모달 */}
			<ColorInfoModal
				isVisible={isModalVisible}
				onClose={closeModal}
				colorInfo={colorInfo}
				selectedColor={selectedColor || ''}
				description={
					description &&
					selectedColor &&
					description.find(
						item =>
							item.hexCode &&
							item.hexCode.toLowerCase() ===
								selectedColor.toLowerCase(),
					)?.harmony_description
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 6,
	},
	header: {
		flexDirection: 'row',
		marginBottom: 3,
	},
	titleKor: {
		color: COLOR.GRAY_10,
		fontSize: 18,
		fontFamily: 'Pretendard-Bold',
		marginLeft: 3,
	},
	titleEng: {
		color: COLOR.GRAY_7,
		fontSize: 12,
		fontFamily: 'Pretendard-medium',
		marginLeft: 6,
		alignSelf: 'flex-end',
	},
	paletteContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 50,
	},
	colorRow: {
		flexDirection: 'row',
		flex: 1,
		marginRight: 10,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: COLOR.GRAY_3,
	},
	colorBox: {
		flex: 1,
		height: 50,
		marginHorizontal: -1, // 팔레트 칩 사이 간격 최소화
	},
	iconContainer: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		backgroundColor: COLOR.WHITE,
		borderWidth: 2,
		borderColor: COLOR.GRAY_3,
	},
});

export default ColorPalette;
