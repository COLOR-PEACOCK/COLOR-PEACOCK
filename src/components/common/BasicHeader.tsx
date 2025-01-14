import React, { useState } from 'react';
import { StyleSheet, View, LayoutChangeEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';
import {
	HeaderLeftButton,
	HeaderRightButton,
	HeaderTitle,
} from '@components/common/HeaderComponents';

interface BasicHeaderProps {
	leftIcon?: string;
	onPressLeft?: () => void;
	titleIcon?: IconName;
	title?: string;
	subTitle?: string;
	rightIcon?: string | 'Skip' | 'info';
	onPressRight?: () => void;
	infoText?: string;
}

const INFO_TEXT_RIGHT_OFFSET = 6;
const INFO_TEXT_VERTICAL_OFFSET = 10;
const INFO_TEXT_HIDDEN_VERTICAL_OFFSET = -120;

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
	const navigation = useNavigation();
	const isInfo = rightIcon === 'info';
	const [infoButtonLayout, setInfoButtonLayout] = useState({
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	});

	const [infoTextWidth, setInfoTextWidth] = useState<number>(0);
	const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);

	const handlePressLeft = () => {
		return onPressLeft ? onPressLeft() : navigation.goBack();
	};
	const handlePressRight = () => {
		if (infoText) {
			return setInfoModalVisible(!infoModalVisible);
		} else return onPressRight?.();
	};

	const handleInfoButtonLayout = (e: LayoutChangeEvent) =>
		setInfoButtonLayout(e.nativeEvent.layout);

	return (
		<View style={styles.headerContainer}>
			<HeaderLeftButton
				leftIcon={leftIcon}
				onPressLeft={handlePressLeft}
			/>
			<HeaderTitle
				titleIcon={titleIcon}
				title={title}
				subTitle={subTitle}
			/>
			<HeaderRightButton
				isInfo={isInfo}
				onPressRight={handlePressRight}
				rightIcon={rightIcon}
				onLayout={handleInfoButtonLayout}
			/>
			{infoText && (
				<View
					style={[
						styles.infoModalWrap,
						{
							left:
								infoButtonLayout.x -
								infoTextWidth +
								infoButtonLayout.width +
									INFO_TEXT_RIGHT_OFFSET,
							top:
								infoButtonLayout.y +
								infoButtonLayout.height +
								(infoModalVisible
									? INFO_TEXT_VERTICAL_OFFSET
									: INFO_TEXT_HIDDEN_VERTICAL_OFFSET),
							opacity: infoModalVisible ? 1 : 0,
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
						<Text style={styles.infoText}>{infoText}</Text>
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
		zIndex: 1,
		elevation: 5,
		backgroundColor: COLOR.WHITE,
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
	infoText: {
		fontSize: 12,
	},
	triangleBorder: {
		position: 'absolute',
		top: -11,
		right: 9,
		width: 0,
		height: 0,
		borderLeftWidth: 8,
		borderRightWidth: 8,
		borderBottomWidth: 10,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: COLOR.GRAY_3,
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
		borderBottomColor: COLOR.WHITE,
		position: 'absolute',
		top: 4,
	},
});

export default BasicHeader;
