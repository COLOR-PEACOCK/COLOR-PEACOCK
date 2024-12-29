import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { HomeHeader, HomeContainer } from '@components/Home';
import { useCheckAppVersion } from '@hooks/index';
import { useBackHandler } from '@hooks/Home';

const Home = ({ navigation }: HomeScreenProps) => {
	const { checkAppVersion } = useCheckAppVersion();

	// splash로 뒤로가기 방지 및 앱종료 모달
	useBackHandler();

	useEffect(() => {
		checkAppVersion();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<HomeHeader />
			<HomeContainer />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
});

export default Home;
