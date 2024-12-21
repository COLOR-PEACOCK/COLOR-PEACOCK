import React from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from './Spinner';
import LoadingText from './LoadingText';
import { Text } from 'react-native';
import { COLOR } from '@styles/color';

const LoadingScreen = () => {
	return (
		<View style={styles.container}>
			<Spinner />
			<View style={styles.loadingTextContainer}>
				<LoadingText />
				<Text style={styles.loadingTextStyle}>loading</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 16,
		width: 75,
		height: 120,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingTextContainer: { justifyContent: 'center', alignItems: 'center' },
	loadingTextStyle: {
		fontFamily: 'Pretendard-Regular',
		fontSize: 12,
		color: COLOR.GRAY_8,
	},
});

export default LoadingScreen;
