import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OutlinedTextProps {
	strokeColor: string;
	textColor: string;
	fontSize: number;
	text: string;
}

const OutlinedText = ({
	strokeColor,
	textColor,
	fontSize,
	text,
}: OutlinedTextProps) => {
	const weight = 1;
	const styles = StyleSheet.create({
		paragraph: {
			textShadowColor: strokeColor,
			color: textColor,
			fontSize: fontSize,
			fontFamily: 'Pretendard-bold',
			textShadowRadius: 1,
			textShadowOffset: {
				width: weight,
				height: weight,
			},
		},
		abs: {
			position: 'absolute',
		},
	});

	return (
		<View>
			<Text style={styles.paragraph}>{text}</Text>
			<Text
				style={[
					styles.paragraph,
					styles.abs,
					{ textShadowOffset: { width: -weight, height: -weight } },
				]}>
				{text}
			</Text>
			<Text
				style={[
					styles.paragraph,
					styles.abs,
					{ textShadowOffset: { width: -weight, height: weight } },
				]}>
				{text}
			</Text>
			<Text
				style={[
					styles.paragraph,
					styles.abs,
					{ textShadowOffset: { width: weight, height: -weight } },
				]}>
				{text}
			</Text>
		</View>
	);
};

export default OutlinedText;
