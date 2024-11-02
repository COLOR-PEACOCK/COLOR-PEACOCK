import React, { PropsWithChildren } from 'react';
import { Pressable, TextStyle } from 'react-native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';

interface ListValueProps {
	label: string;
	textStyle?: TextStyle;
	isActive?: boolean;
	disabled?: boolean;
	onPressLabel?: (label: string) => void;
}
const ListValue = ({
	label,
	textStyle,
	isActive,
	disabled,
	onPressLabel,
}: ListValueProps) => {
	const handlePressLabel = () => {
		if (onPressLabel) onPressLabel(label);
	};

	const getTextColor = () => {
		if (isActive) {
			return COLOR.WHITE;
		} else if (disabled) {
			return COLOR.GRAY_6;
		} else {
			return COLOR.GRAY_10;
		}
	};

	const getBackgroundColor = () => {
		if (isActive) {
			return COLOR.PRIMARY;
		} else {
		}
	};

	return (
		<Pressable
			style={{
				paddingLeft: 8,
				paddingVertical: 8,
				backgroundColor: getBackgroundColor(),
				borderRadius: 4,
			}}
			onPress={handlePressLabel}>
			<Text style={[textStyle, { color: getTextColor() }]}>{label}</Text>
		</Pressable>
	);
};

export default ListValue;