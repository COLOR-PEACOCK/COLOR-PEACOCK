import React, { useRef, useEffect } from 'react';
import {
	Text,
	TouchableOpacity,
	Animated,
	View,
	useWindowDimensions,
} from 'react-native';
import tinycolor from 'tinycolor2';
import { COLOR } from '@styles/color';
import { heightScale, widthScale } from '@utils/scaling';

const AiCircle = ({
	type,
	number,
	colorCode,
	korColorName,
	engColorName,
	colorShort,
	colorDescription,
	isSelected,
	setIsSelected,
	containerHeight,
}) => {
	const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
		useWindowDimensions();

	// AiCircle 크기 나타내는 Animated.Value 객체 생성
	const animatedSize = useRef(new Animated.Value(1)).current;

	// AiCircle 내 글자 크기 나타내는 Animated.Value 객체 생성
	const animatedFontSize = useRef(new Animated.Value(0)).current;

	// AiCircle이 핸드폰 좌측 or 우측 중 가까운 부분과 떨어져 있는 거리
	const distance = 20;

	// 원 지름(중간 크기 원은 안드로이드 에뮬레이터 미디엄폰 기준 205)
	const diameter = heightScale(205);
	const smallDiameter = 0.5 * diameter;
	const largeDiameter = 1.6 * diameter;

	// 첫번째와 마지막 원이 아래위로 화면에서 떨어져 있는 정도(-는 화면 바깥쪽으로 멀어지고, +는 화면 안쪽으로 멀어짐)
	const smallVerticalOffset = 0.5 * smallDiameter;
	const mediumVerticalOffset = -0.1 * diameter;
	const largeVerticalOffset = -0.125 * largeDiameter;

	// 원 사이 수직 거리
	const distanceBetweenCircles = size => {
		switch (size) {
			case 'medium':
				const tempMedium = diameter + 2 * mediumVerticalOffset;
				return (containerHeight - tempMedium) / 4;
			case 'large':
				const tempLarge = largeDiameter + 2 * largeVerticalOffset;
				return (containerHeight - tempLarge) / 4;
			default:
				const tempSmall = smallDiameter + 2 * smallVerticalOffset;
				return (containerHeight - tempSmall) / 4;
		}
	};

	useEffect(() => {
		// parallel로 애니메이션 동시 진행
		Animated.parallel([
			// spring으로 원 크기 변화 시 튕기는 듯한 모션
			Animated.spring(animatedSize, {
				toValue:
					isSelected[number] === 'large'
						? 1.6
						: isSelected[number] === 'small'
						? 0.5
						: 1,
				useNativeDriver: false,
			}),
			// 폰트 크기 애니메이션은 영역 밖으로 튀는 걸 방짛하기 위해 timing으로 선형적 변화
			Animated.timing(animatedFontSize, {
				toValue:
					isSelected[number] === 'large'
						? 1
						: isSelected[number] === 'small'
						? 0
						: 0.5,
				duration: 300,
				useNativeDriver: false,
			}),
		]).start();
	}, [isSelected]);

	const korTextColor = color => {
		return tinycolor(color).isLight() ? COLOR.GRAY_10 : COLOR.WHITE;
	};
	const engTextColor = color => {
		return tinycolor(color).isLight() ? COLOR.GRAY_9 : COLOR.GRAY_2;
	};

	const handlePress = () => {
		setIsSelected(prevSelected => {
			if (prevSelected[number] === 'large') {
				// large누르면 전부 medium으로 set
				return prevSelected.map(() => 'medium');
			} else if (prevSelected[number] === 'small') {
				// small누르면 자신은 large로 나머지는 small
				return prevSelected.map((_, index) =>
					index === number ? 'large' : 'small',
				);
			} else {
				// medium누르면 자신은 large로 나머지 small
				return prevSelected.map((_, index) =>
					index === number ? 'large' : 'small',
				);
			}
		});
	};

	// interpolate를 통해 애니메이션 입력 값의 범위를 다른 출력 값의 범위로 변환
	const circleStyle = {
		position: 'absolute',
		...(type == 'left'
			? {
					left: animatedSize.interpolate({
						inputRange: [0.5, 1, 1.6],
						outputRange: [
							distance - SCREEN_WIDTH * 0.5,
							-distance - SCREEN_WIDTH * 0.5,
							-distance - SCREEN_WIDTH * 0.5,
						],
					}),
			  }
			: {
					right: animatedSize.interpolate({
						inputRange: [0.5, 1, 1.6],
						outputRange: [
							distance - SCREEN_WIDTH * 0.5,
							-distance - SCREEN_WIDTH * 0.5,
							-distance - SCREEN_WIDTH * 0.5,
						],
					}),
			  }),
		top: animatedSize.interpolate({
			inputRange: [0.5, 1, 1.6],
			outputRange: [
				smallVerticalOffset + number * distanceBetweenCircles('small'),
				mediumVerticalOffset +
					number * distanceBetweenCircles('medium'),
				largeVerticalOffset + number * distanceBetweenCircles('large'),
			],
		}),
		width: animatedSize.interpolate({
			inputRange: [0.5, 1, 1.6],
			outputRange: [smallDiameter, diameter, largeDiameter],
		}),
		height: animatedSize.interpolate({
			inputRange: [0.5, 1, 1.6],
			outputRange: [smallDiameter, diameter, largeDiameter],
		}),
		borderRadius: 400,
		backgroundColor: colorCode[number],
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	};

	return (
		<TouchableOpacity
			onPressOut={handlePress}
			activeOpacity={0.7}
			style={{
				zIndex: -1,
			}}>
			<Animated.View style={circleStyle}>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Bold',
						fontSize: animatedFontSize.interpolate({
							inputRange: [0, 0.5, 1],
							outputRange: [
								heightScale(14),
								heightScale(20),
								heightScale(26),
							],
						}),
						color: korTextColor(colorCode[number]),
					}}>
					{korColorName[number]}
				</Animated.Text>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Medium',
						fontSize: animatedFontSize.interpolate({
							inputRange: [0, 0.5, 1],
							outputRange: [
								heightScale(12),
								heightScale(16),
								heightScale(20),
							],
						}),
						color: engTextColor(colorCode[number]),
						marginTop: -2,
						marginBottom: 5,
					}}>
					{engColorName[number]}
				</Animated.Text>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Regular',
						fontSize: animatedFontSize.interpolate({
							inputRange: [0, 0.5, 1],
							outputRange: [0, heightScale(16), heightScale(18)],
						}),
						color: korTextColor(colorCode[number]),
						paddingHorizontal: 30,
					}}>
					{isSelected[number] === 'large'
						? colorDescription[number]
						: colorShort[number]}
				</Animated.Text>
			</Animated.View>
		</TouchableOpacity>
	);
};

export default AiCircle;
