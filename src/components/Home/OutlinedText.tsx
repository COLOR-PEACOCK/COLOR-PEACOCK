import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OutlinedTextProps {
	strokeColor: string;
	textColor: string;
	fontSize: number;
	text: string;
}

const WEIGHT = 1;

const OutlinedText = ({
	strokeColor,
	textColor,
	fontSize,
	text,
}: OutlinedTextProps) => {
	return (
		<View>
			<Text
				style={[
					styles.paragraph,
					{
						textShadowColor: strokeColor,
						color: textColor,
						fontSize: fontSize,
					},
				]}>
				{text}
			</Text>
			<Text
				style={[
					styles.paragraph,
					styles.abs,
					{
						textShadowOffset: { width: -WEIGHT, height: -WEIGHT },
						textShadowColor: strokeColor,
						color: textColor,
						fontSize: fontSize,
					},
				]}>
				{text}
			</Text>
			<Text
				style={[
					styles.paragraph,
					styles.abs,
					{
						textShadowOffset: { width: -WEIGHT, height: WEIGHT },
						textShadowColor: strokeColor,
						color: textColor,
						fontSize: fontSize,
					},
				]}>
				{text}
			</Text>
			<Text
				style={[
					styles.paragraph,
					styles.abs,
					{
						textShadowOffset: { width: WEIGHT, height: -WEIGHT },
						textShadowColor: strokeColor,
						color: textColor,
						fontSize: fontSize,
					},
				]}>
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	paragraph: {
		fontFamily: 'Pretendard-bold',
		textShadowRadius: 1,
		textShadowOffset: {
			width: WEIGHT,
			height: WEIGHT,
		},
	},
	abs: {
		position: 'absolute',
	},
});

export default OutlinedText;
