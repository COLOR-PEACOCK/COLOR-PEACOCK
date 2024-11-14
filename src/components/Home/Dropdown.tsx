import React, { useRef, useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Pressable,
	ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR } from '@styles/color';
import { ListValue } from '@components/Home';
import { useModal } from '@hooks/index';

const DEVICE_HEIGHT = Dimensions.get('window').height;
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
	const { isModalVisible, handleOpenModal, handleCloseModal } = useModal();
	const touchableOpacityRef = useRef<View>(null);

	const handlePressLabel = (label: string) => {
		handleCloseModal();
		if (onClickDropdown) {
			onClickDropdown(label);
		}
	};

	return (
		<View style={layoutStyle}>
			<TouchableOpacity
				activeOpacity={1}
				ref={touchableOpacityRef}
				disabled={disabled}
				onPress={isModalVisible ? handleCloseModal : handleOpenModal}
				style={[
					styles.fieldContainer,
					{
						...(isModalVisible && {
							borderColor: COLOR.PRIMARY,
							borderWidth: 2,
							borderRadius: 8,
						}),
						...(disabled && {
							borderColor: COLOR.GRAY_5,
						}),
					},
				]}>
				<ListValue
					label={selectedLabel}
					{...(!selectedLabel &&
						placeholder && {
							disabled: true,
							label: placeholder,
						})}
					onPressLabel={
						isModalVisible ? handleCloseModal : handleOpenModal
					}
				/>
				<Icon
					name={isModalVisible ? 'caretup' : 'caretdown'}
					size={10}
					style={{ marginHorizontal: 18 }}
				/>
			</TouchableOpacity>
			{isModalVisible && (
				<Pressable onPress={handleCloseModal}>
					<View
						style={{
							width: '100%',
							alignItems: 'center',
						}}>
						<View
							style={[styles.modalContainer, { width: '100%' }]}>
							<ScrollView
								showsVerticalScrollIndicator={false}
								keyboardShouldPersistTaps={'always'}>
								{list.map(l => (
									<ListValue
										key={l}
										label={l}
										isActive={l === selectedLabel}
										onPressLabel={handlePressLabel}
									/>
								))}
							</ScrollView>
						</View>
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
	modalContainer: {
		zIndex: 10,
		borderWidth: 2,
		borderRadius: 8,
		borderColor: COLOR.GRAY_3,
		backgroundColor: COLOR.WHITE,
		elevation: 4,
	},
});

export default Dropdown;
