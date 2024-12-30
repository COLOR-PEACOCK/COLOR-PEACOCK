import React, { forwardRef } from 'react';
import {
	Pressable,
	StyleSheet,
	TextInput,
	View,
	TextInputProps,
} from 'react-native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';

interface InputFormProps extends Omit<TextInputProps, 'ref'> {
	label: string;
	unit?: string;
	onPress?: () => void;
}

const InputForm = forwardRef<TextInput, InputFormProps>(
	({ label, unit, onPress, ...rest }, ref) => {
		return (
			<Pressable
				style={[styles.inputForm, { width: '100%' }]}
				onPress={onPress}>
				<View style={styles.inputLabel}>
					<Text style={styles.labelText}>{label}</Text>
				</View>
				<View style={styles.textInput}>
					<TextInput
						ref={ref}
						{...rest}
						style={{ color: COLOR.GRAY_10 }}
					/>
					{unit && <Text style={{ fontSize: 16 }}>{unit}</Text>}
				</View>
			</Pressable>
		);
	},
);

const styles = StyleSheet.create({
	inputLabel: {
		width: 48,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightColor: COLOR.GRAY_3,
		borderRightWidth: 1,
	},
	labelText: {
		fontFamily: 'Pretendard-Bold',
		fontSize: 16,
		color: COLOR.PRIMARY,
	},

	inputForm: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		borderColor: COLOR.GRAY_6,
		borderWidth: 1,
	},
	textInput: {
		width: '75%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 10,
	},
});

export default InputForm;
