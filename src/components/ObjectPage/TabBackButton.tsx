import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLOR } from '@styles/color';
import { widthScale } from '@utils/scaling';

import { useObjectState } from '@hooks/ObjectScreen';
import { BackButton } from '@icons/objecticon/objectIcon.js';

const TabBackButton = () => {
	const { setActiveTab } = useObjectState();
	return (
		<TouchableOpacity
			onPress={() => setActiveTab(null)}
			style={styles.backButtonWrapper}>
			<Image source={BackButton} style={{ width: 24, height: 24 }} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	backButtonWrapper: {
		width: widthScale(64),
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderRightColor: COLOR.GRAY_5,
		borderBottomWidth: 1,
		borderBottomColor: COLOR.GRAY_5,
	},
});

export default TabBackButton;
