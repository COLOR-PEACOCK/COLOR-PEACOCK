import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, Easing, Text } from 'react-native';
import spinner from '../../assets/loadingSpinner.png';
import logoIcon from '../../assets/icons/logo.png';

const Spinner: React.FC = () => {
	// 스피너
	const spinValue = useRef<Animated.Value>(new Animated.Value(0)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
		);

		animation.start();

		return () => animation.stop(); // 컴포넌트가 unmount될 때 애니메이션 정지
	}, []);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	return (
		<View
			style={{
				position: 'relative',
				justifyContent: 'center',
				alignItems: 'center',
				width: 68,
				height: 68,
			}}>
			<Animated.Image
				source={spinner} // 스피너 이미지 경로
				style={{
					position: 'absolute',
					width: 68, // 이미지 크기
					height: 68,
					transform: [{ rotate: spin }],
				}}
			/>
			<Image source={logoIcon} style={{ width: 48, height: 48 }} />
		</View>
	);
};

export default Spinner;
