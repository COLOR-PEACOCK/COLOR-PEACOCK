import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import adjustment from '@icons/adjustment.png';
import adjustment_dark from '@icons/adjustment_dark.png';
import tinycolor from 'tinycolor2';

interface ColorInfo {
	korName: string;
	engName: string;
	rgbVal: string;
	hexVal: string;
	hslVal: string;
	cmykVal: string;
}

interface MainColorInfoProps {
	colorInfo: ColorInfo;
	labelColor: string;
	textColor: string;
	setIsPickerVisible?: (visible: boolean) => void;
}

const extractNumbers = (str: string): string | undefined => {
	return str.match(/\d+%?/g)?.join(', ');
};

const MainColorInfo: React.FC<MainColorInfoProps> = ({
	colorInfo,
	labelColor,
	textColor,
	setIsPickerVisible,
}) => {
	const rgbNumbers = extractNumbers(colorInfo.rgbVal);
	const hexNumbers = colorInfo.hexVal.slice(1, 8);
	const hslNumbers = extractNumbers(colorInfo.hslVal);
	const cmykNumbers = extractNumbers(colorInfo.cmykVal);

	const getIconSource = (labelColor: string) => {
		const color = tinycolor(labelColor);
		return color.isDark() ? adjustment_dark : adjustment;
	};

	return (
		<View style={styles.colorInfoContainer}>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					width: '100%',
				}}>
				<View>
					<Text style={[styles.korColorName, { color: labelColor }]}>
						≈{colorInfo.korName}
					</Text>
					<Text style={[styles.engColorName, { color: textColor }]}>
						{colorInfo.engName}
					</Text>
				</View>
				{setIsPickerVisible && (
					<TouchableOpacity onPress={() => setIsPickerVisible(true)}>
						<Image
							source={getIconSource(labelColor)}
							style={[styles.icon, { tintColor: labelColor }]}
						/>
					</TouchableOpacity>
				)}
			</View>

			<View>
				<View style={styles.valueRow}>
					<Text style={[styles.label, { color: labelColor }]}>
						RGB
					</Text>
					<Text style={[styles.colorDetails, { color: textColor }]}>
						{rgbNumbers}
					</Text>
				</View>
				<View style={styles.valueRow}>
					<Text style={[styles.label, { color: labelColor }]}>
						HEX
					</Text>
					<Text style={[styles.colorDetails, { color: textColor }]}>
						{hexNumbers.toUpperCase()}
					</Text>
				</View>
				<View style={styles.valueRow}>
					<Text style={[styles.label, { color: labelColor }]}>
						HSL
					</Text>
					<Text style={[styles.colorDetails, { color: textColor }]}>
						{hslNumbers}
					</Text>
				</View>
				<View style={styles.valueRow}>
					<Text style={[styles.label, { color: labelColor }]}>
						CMYK
					</Text>
					<Text style={[styles.colorDetails, { color: textColor }]}>
						{cmykNumbers}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	colorInfoContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	korColorName: {
		fontSize: 22,
		fontFamily: 'Pretendard-Bold',
	},
	engColorName: {
		fontSize: 18,
		fontFamily: 'Pretendard-Regular',
		textTransform: 'lowercase',
	},
	valueRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	label: {
		width: 68,
		fontSize: 16,
		fontFamily: 'Pretendard-Bold',
		textTransform: 'uppercase',
	},
	colorDetails: {
		fontSize: 16,
		marginLeft: 12,
	},
	icon: {
		width: 38,
		height: 38,
		marginTop: 8,
	},
});

export default MainColorInfo;
