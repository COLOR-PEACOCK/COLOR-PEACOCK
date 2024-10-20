import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { heightScale } from '@utils/scaling';
import { COLOR } from '@styles/color';

import tabs from '@utils/object/tabData';
import { useObjectState } from '@hooks/ObjectScreen/objectStateContext';

const CategoryButton = () => {
	const { setActiveTab } = useObjectState();
	// 탭 버튼 이벤트
	return (
		<View style={styles.categoryContainer}>
			{tabs.map(tabdata => (
				<TouchableOpacity
					key={tabdata.key}
					style={styles.categoryWrapper}
					onPress={() => setActiveTab(tabdata.key)}>
					<Image
						source={tabdata.icon}
						style={{ width: 44, height: 44 }}
					/>
					<View>
						<Text style={styles.title}>{tabdata.title}</Text>
						<Text style={styles.subtitle}>{tabdata.subtitle}</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	categoryContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	categoryWrapper: {
		flexDirection: 'row',
		gap: 4,
		width: '43%',
		height: '50%',
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderColor: COLOR.GRAY_5,
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	title: {
		fontFamily: 'Prentendard-Medium',
		fontSize: heightScale(18),
		color: COLOR.GRAY_10,
	},
	subtitle: {
		fontSize: heightScale(14),
		color: COLOR.GRAY_7,
	},
});
export default CategoryButton;
