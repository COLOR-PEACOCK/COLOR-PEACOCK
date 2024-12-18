import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
import { heightScale, widthScale } from '@utils/scaling';

import { useObjectState, useGenderChange } from '@hooks/ObjectScreen';

import { GenderMale, GenderFemale } from '@icons/objecticon/objectIcon.js';

const ChangeGenderButton = () => {
	const { gender } = useObjectState();
	const handleGenderChange = useGenderChange();
	return (
		<TouchableOpacity
			onPress={handleGenderChange}
			style={styles.genderChangeButton}>
			{gender ? (
				<Image
					source={GenderMale}
					style={{ width: heightScale(34), height: heightScale(34) }}
				/>
			) : (
				<Image
					source={GenderFemale}
					style={{ width: heightScale(34), height: heightScale(34) }}
				/>
			)}

			<Text style={styles.changeText}>변경</Text>
			<Text style={styles.engText}>gender change</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	genderChangeButton: {
		width: widthScale(64),
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: COLOR.GRAY_6,
	},
	changeText: {
		fontFamily: 'Pretendard-Medium',
		fontSize: heightScale(16),
		color: COLOR.GRAY_10,
	},
	engText: {
		fontSize: heightScale(14),
		color: COLOR.GRAY_6,
	},
});
export default ChangeGenderButton;
