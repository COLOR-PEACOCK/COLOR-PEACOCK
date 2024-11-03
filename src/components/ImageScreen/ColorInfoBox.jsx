import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR } from '@styles/color';
import { MainColorInfo } from '@components/ColorRecommend';

const ColorInfoBox = ({ hexValue, colorInfo, textColor, labelColor }) => {
	return (
		<View style={[styles.colorBox, { backgroundColor: hexValue }]}>
			<MainColorInfo
				colorInfo={colorInfo}
				textColor={textColor}
				labelColor={labelColor}
				setIsPickerVisible={null}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	colorBox: {
		flexDirection: 'row',
		width: 376,
		height: 214,
		marginHorizontal: 18,
		marginVertical: 24,
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: COLOR.GRAY_3,
	},
});

export default ColorInfoBox;
