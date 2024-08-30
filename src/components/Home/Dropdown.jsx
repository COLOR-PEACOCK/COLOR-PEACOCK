import React, { useRef, useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Modal,
	Dimensions,
	ScrollView,
	Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '@styles/color';
import { ListValue } from '@components/Home';
import useModal from '@hooks/useModal';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const SCROLL_VIEW_MAX_HEIGHT = 240;

const Dropdown = ({
	list,
	selectedLabel = '',
	onClickDropdown,
	layoutStyle,
	disabled,
	placeholder,
}) => {
	const { isModalVisible, handleOpenModal, handleCloseModal } = useModal();
	const [dropdownTop, setDropdownTop] = useState(0);
	const [width, setWidth] = useState(0);
	const [dropdownLeft, setDropDownLeft] = useState();
	const touchableOpacityRef = useRef(null);

	useEffect(() => {
		if (!isModalVisible) {
			return;
		}

		touchableOpacityRef.current?.measure(
			(_x, _y, width, height, _pageX, pageY) => {
				setWidth(width);
				setDropDownLeft(_pageX);
				if (
					DEVICE_HEIGHT -
						(pageY +
							height +
							12 +
							Math.min(
								SCROLL_VIEW_MAX_HEIGHT,
								list.length * 48,
							)) >
					10
				) {
					setDropdownTop(pageY + height + 12);
				} else {
					setDropdownTop(
						pageY -
							Math.min(SCROLL_VIEW_MAX_HEIGHT, list.length * 48),
					);
				}
			},
		);
	}, [isModalVisible]);

	const handlePressLabel = label => {
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
				onPress={handleOpenModal}
				style={[
					styles.fieldContainer,
					{
						...(isModalVisible && {
							borderColor: COLOR.PRIMARY,
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
					onPressLabel={handleOpenModal}
				/>
				<Icon name={'expand-more'} size={24} />
			</TouchableOpacity>
			<Modal visible={isModalVisible} transparent animationType="fade">
				<Pressable onPress={handleCloseModal}>
					<View
						style={{
							width: '100%',
							height: '100%',
							alignItems: 'center',
						}}>
						<View
							style={[
								styles.modalContainer,
								{
									width,
									top: dropdownTop,
									left: dropdownLeft,
									maxHeight: SCROLL_VIEW_MAX_HEIGHT,
								},
							]}>
							<ScrollView showsVerticalScrollIndicator={false}>
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
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	fieldContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	modalContainer: {
		position: 'absolute',
		zIndex: 10,
		borderWidth: 2,
		borderRadius: 8,
		borderColor: COLOR.GRAY_3,
		backgroundColor: COLOR.WHITE,
		elevation: 4,
	},
});

export default Dropdown;