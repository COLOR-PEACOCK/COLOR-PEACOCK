import { useEffect, useRef, useState } from 'react';
import { inputTypeMap } from '@utils/home';

const useInputState = selectedLabel => {
	const inputRef = useRef([]);
	const [inputOption, setInputOption] = useState(inputTypeMap['색상 이름']);
	useEffect(() => {
		setInputOption(inputTypeMap[selectedLabel]);
		inputRef.current[0]?.focus();
	}, [selectedLabel]);

	const handleFocusNext = index => {
		if (index < inputOption.labels.length - 1) {
			inputRef.current[index + 1]?.focus();
		}
	};

	const handleAutoFocus = (index, text) => {
		if (text.length >= inputOption.maxLength) {
			handleFocusNext(index);
		}
	};

	const handlePressInputForm = index => {
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
