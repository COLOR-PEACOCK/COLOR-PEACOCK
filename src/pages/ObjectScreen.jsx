import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';

import { BasicHeader } from '@components/common';
import { heightScale } from '@utils/scaling';
import {
	ObjectCanvas,
	ColorBottomSheet,
	ObjectBottomCotainer,
} from '@components/ObjectPage';

import { dummyColor, infoText } from '@utils/object/constants';
const backgroundimg = require('@images/objectitems/background/background.png');

const ObjectScreen = ({ route }) => {
	const colors = route.params || dummyColor;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* 헤더 */}
			<BasicHeader
				title={'색상 미리보기'}
				subTitle={'color preview'}
				titleIcon={'object'}
				rightIcon={'info'}
				infoText={infoText}
			/>

			{/* 오브젝트 배치 화면 */}
			<ImageBackground
				source={backgroundimg}
				style={styles.backgroundcontainer}>
				{/* 캔버스 영역 */}
				<ObjectCanvas />
				{/* 컬러 팔레트 */}
				<ColorBottomSheet colors={colors} />
			</ImageBackground>

			{/* 바텀 컨테이너 */}
			<View style={{ height: heightScale(164) }}>
				<ObjectBottomCotainer />
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	backgroundcontainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});

export default ObjectScreen;
