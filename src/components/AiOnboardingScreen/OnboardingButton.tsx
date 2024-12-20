import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { OnboardingIcon } from '@components/AiRecommend';
import { widthScale, heightScale } from '@utils/scaling';
import { COLOR } from '@styles/color';

const BUTTON_HEIGHT = 98;
const BUTTON_PADDING_VERTICAL = 15;
const BUTTON_ICON_GAP = 6;

interface OnboardingButtonProps {
	text: string;
	onPress: () => void;
}

const OnboardingButton = ({ text, onPress }: OnboardingButtonProps) => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<OnboardingIcon color={COLOR.GRAY_1} />
		<Text style={styles.buttonText}>{text}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		backgroundColor: COLOR.PRIMARY,
		height: heightScale(BUTTON_HEIGHT),
		paddingVertical: heightScale(BUTTON_PADDING_VERTICAL),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: BUTTON_ICON_GAP,
	},
	buttonText: {
		color: COLOR.GRAY_1,
		fontSize: widthScale(18),
		fontFamily: 'Pretendard-Bold',
	},
});

export default OnboardingButton;
