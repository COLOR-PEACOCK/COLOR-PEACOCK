import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, Easing, Text, StyleSheet } from 'react-native';
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
		<View style={styles.spinnerContainer}>
			<Animated.Image
				source={spinner} // 스피너 이미지 경로
				style={[styles.spinnerImage, { transform: [{ rotate: spin }] }]}
			/>
			<Image source={logoIcon} style={styles.logoImage} />
		</View>
	);
};

const styles = StyleSheet.create({
	spinnerContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		width: 68,
		height: 68,
	},
	spinnerImage: {
		position: 'absolute',
		width: 68, // 이미지 크기
		height: 68,
	},
	logoImage: {
		width: 48,
		height: 48,
	},
});

export default Spinner;
