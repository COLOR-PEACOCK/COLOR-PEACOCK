import React, { forwardRef } from 'react';
import { Pressable, StyleSheet, TextInput, View, TextInputProps } from 'react-native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';
import { useInputState } from '@hooks/home';


interface SearchInputFormProps {
	selectedLabel: string;
	inputValues: {
		part1: string;
		part2: string;
		part3: string;
		part4: string;
	};
	setInputValues: React.Dispatch<
		React.SetStateAction<{
			part1: string;
			part2: string;
			part3: string;
			part4: string;
		}>
	>;
	onSubmit: () => void;
}

const SearchInputForm = ({
	selectedLabel,
	inputValues,
	setInputValues,
	onSubmit,
}: SearchInputFormProps) => {
	const {
		inputOption,
		inputRef,
		handleFocusNext,
		handleAutoFocus,
		handlePressInputForm,
	} = useInputState(selectedLabel);

	const handleTextChange = (index: number, text: string) => {
		setInputValues((prevValues: typeof inputValues) => ({
			...prevValues,
			[`part${index + 1}`]: text,
		}));
	};

	return (
		<View style={styles.inputContainer}>
			{inputOption.labels.map((label: string, index: number) => (
				<InputForm
					key={index}
					ref={(element: TextInput) =>
						(inputRef.current[index] = element)
					}
					value={
						inputValues[
							`part${index + 1}` as keyof typeof inputValues
						]
					}
					label={label}
					placeholder={inputOption.placeholders?.[index]}
					placeholderTextColor={COLOR.GRAY_6}
					unit={inputOption.unit?.[index]}
					maxLength={inputOption.maxLength}
					onPress={() => handlePressInputForm(index)}
					onChangeText={(text: string) => {
						handleTextChange(index, text);
						handleAutoFocus(index, text);
					}}
					onSubmitEditing={() => {
						if (inputOption.labels.length - 1 < index)
							handleFocusNext(index);
						else onSubmit();
					}}
					keyboardType={inputOption.keyboardType}
					returnKeyType={'next'}
				/>
			))}
		</View>
	);
};

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
	inputContainer: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
		zIndex: 11,
	},
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

export default SearchInputForm;
