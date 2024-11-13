import React, { PropsWithChildren } from 'react';
import { Pressable, TextStyle } from 'react-native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';
import { StyleProp } from 'react-native';

interface ListValueProps {
	label: string;
	textStyle?: StyleProp<TextStyle>;
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
		return isActive ? COLOR.PRIMARY : undefined;
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
