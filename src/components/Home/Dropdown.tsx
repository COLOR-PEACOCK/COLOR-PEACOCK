import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Pressable,
	ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR } from '@styles/color';
import { DropdownItem } from '@components/Home';

const SCROLL_VIEW_MAX_HEIGHT = 240;

interface DropdownProps {
	list: string[];
	selectedLabel?: string;
	onClickDropdown?: (label: string) => void;
	layoutStyle?: ViewStyle;
	disabled?: boolean;
	placeholder?: string;
}

const Dropdown = ({
	list,
	selectedLabel = '',
	onClickDropdown,
	layoutStyle,
	disabled,
	placeholder,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handlePressLabel =
		(label: string) => {
			setIsOpen(false);
			onClickDropdown?.(label);
		};

	const toggleDropdown = () => {
		setIsOpen(prev => !prev);
	};

	const renderListItems = () => {
		return list.map(l => (
			<DropdownItem
				key={l}
				label={l}
				isActive={l === selectedLabel}
				onPressLabel={() => handlePressLabel(l)} // 바로 label 전달
			/>
		));
	};

	return (
		<View style={layoutStyle}>
			<TouchableOpacity
				activeOpacity={1}
				disabled={disabled}
				onPress={toggleDropdown}
				style={[
					styles.fieldContainer,
					isOpen && styles.fieldContainerOpen,
					disabled && styles.fieldContainerDisabled,
				]}>
				<DropdownItem
					label={selectedLabel || placeholder || ''}
					disabled={!selectedLabel && !!placeholder}
					onPressLabel={toggleDropdown}
				/>
				<Icon
					name={isOpen ? 'caretup' : 'caretdown'}
					size={10}
					style={styles.icon}
				/>
			</TouchableOpacity>
			{isOpen && (
				<Pressable
					onPress={toggleDropdown}
					style={styles.pressableOverlay}>
					<View style={styles.modalContainer}>
						<ScrollView
							showsVerticalScrollIndicator={false}
							keyboardShouldPersistTaps="always"
							style={{ maxHeight: SCROLL_VIEW_MAX_HEIGHT }}
						>
							{renderListItems()}
						</ScrollView>
					</View>
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	fieldContainer: {
		height: 48,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: COLOR.GRAY_3,
		borderWidth: 2,
		borderRadius: 8,
	},
	fieldContainerOpen: {
		borderColor: COLOR.PRIMARY,
	},
	fieldContainerDisabled: {
		borderColor: COLOR.GRAY_5,
	},
	icon: {
		marginHorizontal: 18,
	},
	modalContainer: {
		zIndex: 10,
		borderWidth: 2,
		borderRadius: 8,
		borderColor: COLOR.GRAY_3,
		backgroundColor: COLOR.WHITE,
		elevation: 4,
		width: '100%',
	},
	pressableOverlay: {
		width: '100%',
		alignItems: 'center',
	},
});

export default Dropdown;
