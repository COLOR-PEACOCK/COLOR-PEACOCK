import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { INPUT_TYPES, inputTypeMap } from '@typesStore/Home/inputTypes';

const useInputState = (selectedLabel: string) => {
	const inputRef = useRef<TextInput[]>([]);
	const [inputOption, setInputOption] = useState(
		inputTypeMap[INPUT_TYPES.COLOR_NAME],
	);
	useEffect(() => {
		setInputOption(inputTypeMap[selectedLabel]);
		inputRef.current[0]?.focus();
	}, [selectedLabel]);

	const handleFocusNext = (index: number) => {
		if (index < inputOption.labels.length - 1) {
			inputRef.current[index + 1]?.focus();
		}
	};

	const handleAutoFocus = (index: number, text: string) => {
		if (text.length >= inputOption.maxLength) {
			handleFocusNext(index);
		}
	};

	const handlePressInputForm = (index: number) => {
		inputRef.current[index]?.focus();
	};

	return {
		inputOption,
		inputRef,
		handleFocusNext,
		handleAutoFocus,
		handlePressInputForm,
	};
};

export default useInputState;
