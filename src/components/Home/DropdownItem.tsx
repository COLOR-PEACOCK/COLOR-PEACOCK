import React from 'react';
import { Pressable, TextStyle, StyleProp } from 'react-native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';

interface DropdownItemProps {
	label: string;
	textStyle?: StyleProp<TextStyle>;
	isActive?: boolean;
	disabled?: boolean;
	onPressLabel?: (label: string) => void;
}

const DropdownItem = ({
	label,
	textStyle,
	isActive,
	disabled,
	onPressLabel,
}: DropdownItemProps) => {
	const handlePressLabel = () => {
		onPressLabel?.(label);
	};

	const textColor = isActive
		? COLOR.WHITE
		: disabled
		? COLOR.GRAY_6
		: COLOR.GRAY_10;
	const backgroundColor = isActive ? COLOR.PRIMARY : undefined;

	return (
		<Pressable
			style={({ pressed }) => [
				{
					paddingLeft: 8,
					paddingVertical: 8,
					backgroundColor: backgroundColor,
					borderRadius: 4,
					opacity: pressed ? 0.5 : 1,
				},
			]}
			onPress={handlePressLabel}
			disabled={!onPressLabel || disabled} // onPressLabel이 없거나 disabled일 경우 비활성화
		>
			<Text style={[textStyle, { color: textColor }]}>{label}</Text>
		</Pressable>
	);
};

export default DropdownItem;
