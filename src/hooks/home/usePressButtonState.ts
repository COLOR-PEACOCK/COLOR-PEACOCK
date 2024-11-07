import { COLOR } from '@styles/color';
import { useState } from 'react';

const usePressButtonState = (enabled: boolean = true) => {
	const [contentColor, setContentColor] = useState<string>(
		enabled ? COLOR.GRAY_10 : COLOR.GRAY_7,
	);
	const [buttonColor, setButtonColor] = useState<string>(
		enabled ? COLOR.WHITE : COLOR.GRAY_3,
	);

	const [elevation, setElevation] = useState<number>(enabled ? 4 : 0);

	const handleTouchStart = () => {
		if (enabled) {
			setContentColor(COLOR.GRAY_1);
			setButtonColor(COLOR.PRIMARY);
			setElevation(0);
		}
	};

	const handleTouchEnd = () => {
		if (enabled) {
			setContentColor(COLOR.GRAY_10);
			setButtonColor(COLOR.WHITE);
			setElevation(4);
		}
	};

	return {
		contentColor,
		buttonColor,
		elevation,
		handleTouchStart,
		handleTouchEnd,
	};
};

export default usePressButtonState;
