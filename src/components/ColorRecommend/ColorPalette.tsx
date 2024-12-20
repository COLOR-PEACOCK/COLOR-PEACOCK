import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { ColorInfoModal } from '@components/ColorRecommend';
import { CustomText as Text } from '@components/common/CustomText';
import { useColorInfo } from '@hooks/ColorRecommendScreen';
import { COLOR } from '@styles/color';
import tinycolor from 'tinycolor2';
import HangerIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DescriptionItem {
	hexCode: string;
	harmony_description: string;
}

interface ColorPaletteProps {
	titleKor: string;
	titleEng: string;
	colors: string[];
	onColorSelect: (selectedColors: string[]) => void;
	descriptions?: DescriptionItem[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
	titleKor,
	titleEng,
	colors,
	onColorSelect,
	descriptions,
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
			<View style={styles.header}>
				<Text style={styles.titleKor}>{titleKor}</Text>
				<Text style={styles.titleEng}>{titleEng}</Text>
			</View>
			<View style={styles.paletteContainer}>
				<View style={styles.colorRow}>
					{colors.map((color, index) => {
						const borderRadiusStyle = {
							borderTopLeftRadius: index === 0 ? 8 : 0,
							borderBottomLeftRadius: index === 0 ? 8 : 0,
							borderTopRightRadius:
								index === colors.length - 1 ? 8 : 0,
							borderBottomRightRadius:
								index === colors.length - 1 ? 8 : 0,
						};

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
				<Pressable
					style={[
						styles.iconContainer,
						{
							backgroundColor: isButtonPressed
								? COLOR.PRIMARY
								: COLOR.WHITE,
						},
					]}
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
			<ColorInfoModal
				isVisible={isModalVisible}
				onClose={closeModal}
				colorInfo={colorInfo}
				selectedColor={selectedColor || ''}
				description={
					(descriptions &&
						selectedColor &&
						descriptions.find(
							item =>
								item.hexCode.toLowerCase() ===
								selectedColor.toLowerCase(),
						)?.harmony_description) ||
					undefined
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
		marginHorizontal: -1,
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
