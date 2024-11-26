import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLOR } from '@styles/color';
import { useInputState } from '@hooks/Home';
import { InputValuesType } from '@typesStore/Home/inputTypes';
import { InputForm } from '@components/Home';

interface SearchInputFormProps {
	selectedLabel: string;
	inputValues: InputValuesType;
	setInputValues: React.Dispatch<React.SetStateAction<InputValuesType>>;
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
						if (inputOption.labels.length - 1 > index)
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

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
		zIndex: 11,
	},
});

export default SearchInputForm;
