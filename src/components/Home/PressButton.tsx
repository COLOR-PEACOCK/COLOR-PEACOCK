import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR } from '@styles/color';
import { SVGIcon } from '@components/common';
import { usePressButtonState } from '@hooks/home';
import { IconName } from '@components/common/SVGIcon';

interface PressButtonProps {
	iconName: IconName;
	onPress: any;
	engText: string;
	text: string;
	enabled?: boolean;
}
const SIZE = 48;

const PressButton = ({
	iconName,
	onPress,
	engText,
	text,
	enabled = true,
}: PressButtonProps) => {
	const {
		contentColor,
		buttonColor,
		elevation,
		handleTouchStart,
		handleTouchEnd,
	} = usePressButtonState(enabled);

	return (
		<Pressable
			onPress={onPress}
			onPressIn={handleTouchStart}
			onPressOut={handleTouchEnd}
			style={[
				styles.button,
				{ backgroundColor: buttonColor, elevation: elevation },
			]}>
			<SVGIcon
				name={iconName}
				width={SIZE}
				height={SIZE}
				color={contentColor}
				style={styles.icon}
			/>
			<View>
				<Text
					style={[
						styles.buttonEngText,
						{ color: contentColor + 70 },
					]}>
					{engText}
				</Text>
				<Text style={[styles.buttonText, { color: contentColor }]}>
					{text}
				</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		width: '100%',
		height: 84,
		marginHorizontal: 18,
		borderRadius: 8,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: COLOR.WHITE,
		// iOS 그림자 설정
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 4,
		shadowColor: COLOR.BLACK,
		shadowOpacity: 0.2,
	},
	icon: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonEngText: {
		fontFamily: 'Pretendard-Medium',
		fontSize: 12,
		fontWeight: 500,
		letterSpacing: 0.3,
		textTransform: 'uppercase',
	},
	buttonText: {
		fontFamily: 'Pretendard-Bold',
		fontSize: 16,
		letterSpacing: 0.8,
	},
});

export default PressButton;
