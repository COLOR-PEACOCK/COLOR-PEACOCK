import { useEffect, useRef, useState } from 'react';
import { inputTypeMap } from '@utils/home';
import { TextInput } from 'react-native';

const useInputState = (selectedLabel:string) => {
	const inputRef = useRef<TextInput[]>([]);
	const [inputOption, setInputOption] = useState(inputTypeMap['색상 이름']);
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
