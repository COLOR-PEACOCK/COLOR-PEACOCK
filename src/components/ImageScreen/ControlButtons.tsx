import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { widthScale, heightScale } from '@utils/scaling';
import { CustomText as Text } from '@components/common';
import aiIcon from '@icons/ai.png';
import paletteIcon from '@icons/palette.png';
import { COLOR } from '@styles/color';

interface ControlButtonsProps {
	onAiRecommend: () => void;
	onColorRecommend: () => void;
}

const ControlButtons = ({
	onAiRecommend,
	onColorRecommend,
}: ControlButtonsProps) => (
	<View style={styles.buttonContainer}>
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{ backgroundColor: pressed ? COLOR.GRAY_7 : COLOR.GRAY_6 },
			]}
			onPress={onAiRecommend}>
			<Image source={aiIcon} style={styles.buttonIcon} />
			<Text style={styles.ButtonText}>AI 테마 추천</Text>
		</Pressable>
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{ backgroundColor: pressed ? '#5F1AB6' : COLOR.PRIMARY },
			]}
			onPress={onColorRecommend}>
			<Image source={paletteIcon} style={styles.buttonIcon} />
			<Text style={styles.ButtonText}>색상 추천</Text>
		</Pressable>
	</View>
);

const styles = StyleSheet.create({
	buttonContainer: {
		height: heightScale(124),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLOR.GRAY_10,
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		gap: 6,
	},
	buttonIcon: { width: widthScale(26), height: heightScale(26) },
	ButtonText: {
		color: COLOR.WHITE,
		fontSize: widthScale(18),
		fontFamily: 'Pretendard-Bold',
	},
});

export default ControlButtons;
