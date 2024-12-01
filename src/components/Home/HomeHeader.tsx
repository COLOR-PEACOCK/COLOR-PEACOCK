import { SVGIcon } from '@components/common';
import { View, Pressable, Image, Text, StyleSheet } from 'react-native';
import SearchModal from './SearchModal';
import { COLOR } from '@styles/color';
import { widthScale } from '@utils/scaling';

import logoIcon from '@icons/logo.png';
import useModal from '@hooks/useModal';
import { useHomeState, usePressButtonState } from '@hooks/Home';

const HomeHeader = () => {
	const { isModalVisible, handleOpenModal, handleCloseModal } = useModal();
	const { contentColor, buttonColor, handleTouchStart, handleTouchEnd } =
		usePressButtonState();

	const { handleSearch } = useHomeState();
	return (
		<View style={styles.header}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 8,
				}}>
				<Pressable style={{ width: 48, height: 48 }}>
					<Image
						style={{ width: '100%', height: '100%' }}
						source={logoIcon}
					/>
				</Pressable>
				<Text style={styles.title}>COLOR PEACOCK</Text>
				<SearchModal
					visible={isModalVisible}
					handleCloseModal={handleCloseModal}
					onPressSearch={handleSearch}
				/>
			</View>
			<Pressable
				onPressIn={handleTouchStart}
				onPress={handleOpenModal}
				onPressOut={handleTouchEnd}
				style={[
					styles.searchIconWrapper,
					{ backgroundColor: buttonColor },
				]}>
				<SVGIcon name={'search'} color={contentColor} />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	header: {
		width: '100%',
		height: 84,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: COLOR.WHITE,
		paddingHorizontal: widthScale(18),
		elevation: 5,
	},
	title: {
		fontSize: 20,
		fontFamily: 'CookieRun-Bold',
		letterSpacing: -1,
		color: COLOR.PRIMARY,
	},
	searchIconWrapper: {
		width: 48,
		height: 48,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLOR.GRAY_3,
		borderWidth: 1,
		borderRadius: 8,
	},
});

export default HomeHeader;
