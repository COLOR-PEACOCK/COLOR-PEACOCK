import { COLOR } from '@styles/color';
import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ColorInfoProps } from '@typesStore/cameraTypes';

import cameraswitch from '@icons/camera-switch.png';

const ColorInfo = ({
	selectedColor,
	parentLayout,
	setIsOpen,
	isOpen,
	setCameraType,
}: ColorInfoProps) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const cameraSwitch = () =>
		setCameraType(prevType => (prevType === 'back' ? 'front' : 'back'));

	useEffect(
		() => bottomSheetRef.current?.snapToIndex(isOpen ? 1 : 0),
		[isOpen],
	);

	const handleTouchEvent = () => {
		setIsOpen(!isOpen);
	};

	const CustomHandle = () => (
		<View>
			<View
				style={[
					styles.customHandle,
					{ left: parentLayout.width / 2 - 14 },
				]}>
				<Icon
					name={isOpen ? 'angle-down' : 'angle-up'}
					color={COLOR.PRIMARY}
					size={24}
				/>
			</View>

			<TouchableOpacity
				onPress={cameraSwitch}
				style={styles.switchbuttonwrapper}>
				<Image
					source={cameraswitch}
					style={{ width: 28, height: 28 }}
				/>
			</TouchableOpacity>
		</View>
	);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<TouchableOpacity
				onPress={cameraSwitch}
				style={[
					styles.switchbuttonevent,
					isOpen ? { top: 4 } : { top: 104 },
				]}
			/>
			<TouchableOpacity
				onPress={handleTouchEvent}
				style={[
					styles.handlerbuttonevent,
					{ left: parentLayout.width / 2 - 17.5 },
					isOpen ? { top: 25 } : { top: 125 },
				]}
			/>

			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={[40, 140]}
				handleComponent={CustomHandle}
				enableHandlePanningGesture={false}
				enableContentPanningGesture={false}
				backgroundComponent={null}>
				<BottomSheetView style={styles.contentContainer}>
					{selectedColor ? (
						<View style={styles.infowrapper}>
							<View
								style={{
									width: 74,
									height: 74,
									backgroundColor: selectedColor?.rgb,
									borderRadius: 8,
								}}
							/>
							<View
								style={{
									gap: 6,
									width: parentLayout.width / 2.314,
								}}>
								<View>
									<Text style={styles.korcolors}>
										≈{selectedColor?.korName}
									</Text>
									<Text style={styles.engcolors}>
										{selectedColor?.engName}
									</Text>
								</View>

								<Text style={styles.hexcolors}>
									HEX:{selectedColor?.hex}
								</Text>
							</View>
						</View>
					) : (
						<View style={styles.infowrapper}>
							<Text style={styles.korcolors}>
								선택된 색상이 없습니다.
							</Text>
						</View>
					)}
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
};
const styles = StyleSheet.create({
	customHandle: {
		marginTop: 6,
		width: 28,
		height: 28,
		right: '50%',
		backgroundColor: COLOR.GRAY_9,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50 / 2,
		marginBottom: 6,
	},
	switchbuttonwrapper: {
		width: 48,
		height: 48,
		position: 'absolute',
		backgroundColor: COLOR.GRAY_9,
		borderRadius: 50,
		top: -16,
		right: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	switchbuttonevent: {
		width: 48,
		height: 48,
		position: 'absolute',
		borderRadius: 50,
		right: 10,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	handlerbuttonevent: {
		width: 28,
		height: 28,
		position: 'absolute',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},

	contentContainer: {
		flex: 1,
		backgroundColor: 'rgba(11, 11, 11, 0.85)',
	},

	infowrapper: {
		flexDirection: 'row',
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
	korcolors: {
		color: COLOR.WHITE,
		fontSize: 14,
		fontWeight: '700',
	},
	engcolors: {
		color: COLOR.WHITE,
		fontSize: 12,
	},
	hexcolors: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Light',
	},
});

export default ColorInfo;
