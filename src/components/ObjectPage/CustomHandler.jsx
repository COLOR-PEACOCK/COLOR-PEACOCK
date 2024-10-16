import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLOR } from '@styles/color';
import { heightScale } from '@utils/scaling';
import useBottomSheetHandler from '@hooks/ObjectScreen/useBottomSheetHandler';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useObjectState } from '@hooks/ObjectScreen/objectStateContext';

const CustomHandler = () => {
	const { handlerTouchEvent } = useBottomSheetHandler();
	const { isColorPickerOpen } = useObjectState();
	return (
		<View style={styles.customHandlerContainer}>
			<TouchableOpacity
				onPress={handlerTouchEvent}
				style={[styles.customHandle]}>
				{isColorPickerOpen ? (
					<Icon
						name={'angle-down'}
						color={COLOR.PRIMARY}
						size={heightScale(24)}
					/>
				) : (
					<Icon
						name={'angle-up'}
						color={COLOR.PRIMARY}
						size={heightScale(24)}
					/>
				)}
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	customHandlerContainer: {
		height: heightScale(40),
		alignItems: 'center',
	},
	customHandle: {
		width: heightScale(28),
		height: heightScale(28),
		backgroundColor: COLOR.GRAY_9,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
		marginTop: heightScale(1),
	},
});
export default CustomHandler;
