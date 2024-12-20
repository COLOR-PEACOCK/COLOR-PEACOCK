import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { OnboardingIcon } from '@components/AiRecommend';
import { widthScale, heightScale } from '@utils/scaling';
import { COLOR } from '@styles/color';

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
		height: heightScale(98),
		paddingVertical: heightScale(15),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
	},
	buttonText: {
		color: COLOR.GRAY_1,
		fontSize: widthScale(18),
		fontFamily: 'Pretendard-Bold',
	},
});

export default OnboardingButton;
