import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText as Text } from '@components/common';
import { COLOR } from '@styles/color';

interface ColorInfoProps {
	color: string;
	colorName: {
		korName: string;
		engName: string;
	};
}

const ColorInfo = ({ color, colorName }: ColorInfoProps) => (
	<View style={styles.colorInfoBox}>
		<View style={[styles.colorIndicator, { backgroundColor: color }]} />
		<View style={styles.colorDetails}>
			<Text style={styles.korName}>{`≈${colorName.korName}`}</Text>
			<Text style={styles.engName}>{colorName.engName}</Text>
			<Text style={styles.colorHex}>HEX: {color.toUpperCase()}</Text>
		</View>
	</View>
);

const styles = StyleSheet.create({
	colorInfoBox: {
		paddingVertical: 18,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
		backgroundColor: COLOR.GRAY_9,
	},
	colorIndicator: {
		width: 64,
		height: 64,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'rgba(250, 250, 250, .3)',
	},
	colorDetails: { gap: 6, flex: 0.55 },
	korName: { color: COLOR.WHITE, fontSize: 14, fontWeight: '700' },
	engName: { color: COLOR.WHITE, fontSize: 12 },
	colorHex: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Light',
	},
});

export default ColorInfo;
