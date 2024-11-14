import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	TouchableOpacity,
	Image,
	LayoutChangeEvent,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { CameraPosition } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLOR } from '@styles/color';
import { BasicHeader, CustomText as Text } from '@components/common';
import {
	CameraRender,
	ColorInfo,
	CrossHair,
	ExtColorModal,
} from '@components/camerapage';

import { useCamera } from '@hooks/index';
import { ExtColor, ParentLayout, SeletedColor } from '@typesStore/cameraTypes';

const extbutton = require('@icons/circle__lock__btn.png');

const CameraScreen = ({ navigation }) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [cameraType, setCameraType] = useState<CameraPosition>('back');
	const [parentlayout, setParentlayout] = useState<ParentLayout>({
		height: 0,
		width: 0,
	});
	const [extColor, setExtColor] = useState<ExtColor>({
		bgColor: `rgb(0,0,0)`,
		hexColor: '000000',
		engName: '',
		korName: '',
	});
	const [selectedColor, setSelectedColor] = useState<
		SeletedColor | undefined
	>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [zoomLevel, setZoomLevel] = useState<1 | 2>(1);
	const parentRef = useRef<View>(null);
	const { hasPermission, requestCameraPermission } = useCamera();

	// 카메라 권한
	useEffect(() => {
		requestCameraPermission();
	}, [hasPermission]);

	// 카메라 활성화 관리
	useFocusEffect(
		useCallback(() => {
			setIsActive(true);
			return () => {
				setIsActive(false);
			};
		}, []),
	);

	// 크기 정보
	const onLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout;
		setParentlayout({ height: height, width: width });
	};

	// 줌 버튼 이벤트
	const handlePressZoom = () => {
		zoomLevel === 1 ? setZoomLevel(2) : setZoomLevel(1);
	};

	// 추출 버튼 이벤트
	const handlePressExt = () => {
		setSelectedColor({
			rgb: extColor.bgColor,
			hex: extColor.hexColor,
			engName: extColor.engName,
			korName: extColor.korName,
		});
		setIsOpen(true);
	};
	//다음 버튼 이벤트
	const handlePressNext = () => {
		selectedColor &&
			navigation.navigate('ColorRecommendScreen', {
				mainColor: { hexVal: '#' + selectedColor.hex },
			});
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader title="카메라" titleIcon="camera" subTitle="camera" />

			{/* 카메라 영역 */}
			<View
				onLayout={onLayout}
				ref={parentRef}
				style={styles.cameracontainer}>
				{/* 카메라 렌더*/}
				{hasPermission && (
					<CameraRender
						extColor={setExtColor}
						cameraType={cameraType}
						zoomLevel={zoomLevel}
						isActive={isActive}
					/>
				)}

				{/* 추출 색상 정보 모달 */}
				<ExtColorModal
					parentlayout={parentlayout}
					extColor={extColor}
				/>

				{/* 조준점 */}
				<CrossHair extColor={extColor} parentlayout={parentlayout} />
			</View>

			{/* 하단 영역 */}
			<View style={styles.bottomcontainer}>
				{/* 색상 정보 */}
				<View
					style={{
						height: 160,
						width: '100%',
						bottom: 100,
						justifyContent: 'flex-end',
					}}>
					<ColorInfo
						selectedColor={selectedColor}
						parentlayout={parentlayout}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						setCameraType={setCameraType}
					/>
				</View>

				{/* 하단 버튼 모음*/}
				<View style={styles.bottombar}>
					{/* 줌 버튼 */}
					<TouchableOpacity
						style={styles.zoombutton}
						onPress={handlePressZoom}>
						<Text style={{ fontSize: 16, color: COLOR.WHITE }}>
							{zoomLevel === 1 ? '2X' : '1X'}
						</Text>
					</TouchableOpacity>

					{/* 색 추출 버튼 */}
					<TouchableOpacity
						onPress={handlePressExt}
						style={styles.extcolorbutton}>
						<Image source={extbutton} style={styles.innercircle} />
					</TouchableOpacity>

					{/* 추천 화면 이동 버튼 */}
					<TouchableOpacity
						onPress={handlePressNext}
						style={[
							styles.nextbutton,
							!selectedColor && { opacity: 0.4 },
						]}>
						<Icon
							name={'arrow-right'}
							color={COLOR.WHITE}
							size={20}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	cameracontainer: {
		flex: 1,
		alignItems: 'center',
	},
	bottomcontainer: {
		height: 250,
		position: 'absolute',
		width: '100%',
		bottom: 0,
		justifyContent: 'flex-end',
	},
	bottombar: {
		position: 'absolute',
		width: '100%',
		height: 100,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 18,
		backgroundColor: '#0B0B0B',
	},
	zoombutton: {
		width: 48,
		height: 48,
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: COLOR.GRAY_8,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},
	extcolorbutton: {
		width: 70,
		height: 70,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		borderWidth: 4,
		borderColor: COLOR.GRAY_4,
	},
	innercircle: {
		width: 88,
		height: 88,
		top: '50%',
		left: '50%',
		transform: [{ translateX: -31.2 }, { translateY: -24 }],
	},
	nextbutton: {
		borderRadius: 24,
		width: 48,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: COLOR.GRAY_8,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},
});

export default CameraScreen;
