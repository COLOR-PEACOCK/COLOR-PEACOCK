import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';

import { useObjectState } from '@hooks/ObjectScreen/objectStateContext';
import {
	TabBackButton,
	RenderItemList,
	ChangeGenderButton,
	CategoryButton,
} from '@components/ObjectPage';

const ObjectBottomCotainer = () => {
	const { activeTab } = useObjectState();

	return (
		<View style={styles.bottomContainer}>
			<View style={styles.categoryBar}>
				<Text style={styles.barkorname}>분류항목</Text>
				<Text style={styles.barengname}>CATEGORY</Text>
			</View>
			{!activeTab ? (
				<View style={styles.tabViewContainer}>
					<ChangeGenderButton />
					<CategoryButton />
				</View>
			) : (
				<View style={styles.tabViewContainer}>
					<TabBackButton />
					<RenderItemList />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	bottomContainer: {
		flex: 1,
	},
	categoryBar: {
		height: 29,
		backgroundColor: '#873EF1',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 6,
	},
	barkorname: {
		color: COLOR.GRAY_1,
		fontFamily: 'Pretendard-Medium',
		fontSize: 14,
	},
	barengname: {
		color: COLOR.WHITE,
		fontFamily: 'Pretendard-Light',
		fontSize: 12,
	},
	tabViewContainer: {
		flex: 1,
		flexDirection: 'row',
	},
});
export default ObjectBottomCotainer;
