import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR } from '@styles/color';
import { CustomText as Text, SVGIcon } from '@components/common';
// images
import informationIcon from '@icons/infor.png';

interface BasicHeaderProps {
	leftIcon?: string;
	onPressLeft?: () => void;
	titleIcon?: IconName;
	title?: string;
	subTitle?: string;
	rightIcon?: string;
	onPressRight?: () => void;
	infoText?: string;
}
/**
 * ```
<BasicHeader
    titleIcon={'iamge'}
    title={'이미지'} engTitle={'images'} rightIcon={'info'}
    infoText={infotext}
/>
const infoText = 'infomation text'
 * ```
 */
const BasicHeader = ({
	leftIcon = 'arrowleft',
	onPressLeft,
	titleIcon,
	title,
	subTitle,
	rightIcon,
	onPressRight,
	infoText,
}: BasicHeaderProps) => {
	const navigate = useNavigation();
	const isInfo = rightIcon === 'info';
	const [infoButtonLayout, setInfoButtonLayout] = useState({
		width: 0,
		height: 0,
		left: 0,
		top: 0,
	});

	const [infoTextWidth, setInfoTextWidth] = useState<number>(0);
	const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);

	return (
		<View
			style={[styles.headerContainer, { zIndex: isInfoVisible ? 1 : 0 }]}>
			{/* left button */}
			<TouchableOpacity
				style={[
					styles.headerButton,
					{
						borderColor: COLOR.GRAY_3,
						borderWidth: 2,
						borderRadius: 8,
					},
				]}
				onPress={onPressLeft ? onPressLeft : () => navigate.goBack()}>
				<Icon name={leftIcon} color={COLOR.PRIMARY} size={30}></Icon>
			</TouchableOpacity>
			{/* title */}
			<View style={styles.titleContainer}>
				<SVGIcon
					name={titleIcon}
					width={45}
					height={45}
					color={COLOR.PRIMARY}
				/>

				<Text style={styles.title}>{title}</Text>
				<Text style={styles.engTitle}>{subTitle}</Text>
			</View>

			{/* right button */}
			{isInfo ? (
				<TouchableOpacity
					style={styles.infoButton}
					onPress={
						infoText
							? () => setIsInfoVisible(!isInfoVisible)
							: onPressRight
					}
					onLayout={({ nativeEvent }) => {
						setInfoButtonLayout({
							width: nativeEvent.layout.width,
							height: nativeEvent.layout.height,
							left: nativeEvent.layout.x,
							top: nativeEvent.layout.y,
						});
					}}>
					<Image
						source={informationIcon}
						style={{ width: 24, height: 24 }}
					/>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={[
						styles.headerButton,
						rightIcon && {
							borderColor: COLOR.GRAY_3,
							borderWidth: 2,
							borderRadius: 8,
						},
					]}
					onPress={onPressRight}>
					{rightIcon === 'Skip' ? (
						<Text
							style={{
								fontFamily: 'Pretendard-Medium',
								fontSize: 16,
								color: COLOR.PRIMARY,
							}}>
							{rightIcon}
						</Text>
					) : (
						rightIcon && (
							<Icon
								name={rightIcon}
								color={COLOR.PRIMARY}
								size={30}
							/>
						)
					)}
				</TouchableOpacity>
			)}
			{/* info Modal */}
			{infoText && (
				<View
					style={[
						styles.infoModalWrap,
						{
							left:
								infoButtonLayout.left -
								infoTextWidth +
								infoButtonLayout.width * 1.3,
							top:
								infoButtonLayout.top +
								infoButtonLayout.height +
								10,
							opacity: isInfoVisible ? 100 : 0,
						},
					]}>
					<View
						style={styles.infoModalSquare}
						onLayout={({ nativeEvent }) => {
							setInfoTextWidth(nativeEvent.layout.width);
						}}>
						<View style={styles.triangleBorder}>
							<View style={styles.triangle} />
						</View>
						<Text style={{ fontSize: 12 }}>{infoText}</Text>
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		width: '100%',
		height: 64,
		flexDirection: 'row',
		paddingHorizontal: 18,
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 5,
		backgroundColor: COLOR.WHITE,
		zIndex: 1,
	},
	titleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},

	title: {
		fontFamily: 'CookieRun-Regular',
		fontSize: 20,
		color: COLOR.PRIMARY,
		textAlign: 'center',
		letterSpacing: -1,
	},
	engTitle: {
		fontFamily: 'CookieRun-Regular',
		fontSize: 16,
		color: COLOR.GRAY_6,
		paddingLeft: 6,
		letterSpacing: -0.8,
	},
	headerButton: {
		width: 48,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoButton: {
		marginHorizontal: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoModalWrap: {
		position: 'absolute',
	},
	infoModalSquare: {
		maxWidth: 240,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: COLOR.GRAY_3,
		backgroundColor: COLOR.WHITE,
	},
	triangleBorder: {
		position: 'absolute',
		// 전체적인 위치 조정
		top: -11,
		right: 9,
		width: 0,
		height: 0,
		borderLeftWidth: 8,
		borderRightWidth: 8,
		borderBottomWidth: 10,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: '#E0E0E0', // 테두리 색상
		alignItems: 'center',
		justifyContent: 'center',
	},
	triangle: {
		width: 0,
		height: 0,
		borderLeftWidth: 6,
		borderRightWidth: 6,
		borderBottomWidth: 8,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: '#fff', // 삼각형 배경색
		position: 'absolute',
		top: 4, // 테두리 두께에 따라 세세한 조정
	},
});

export default BasicHeader;
