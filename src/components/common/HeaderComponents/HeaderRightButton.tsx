import {
	Image,
	LayoutChangeEvent,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR } from '@styles/color';
import informationIcon from '@icons/infor.png';
interface HeaderRightButtonProps {
	isInfo: boolean;
	onPressRight?: () => void;
	rightIcon?: string;
	onLayout: (e: LayoutChangeEvent) => void;
}

const HeaderRightButton = ({
	isInfo,
	rightIcon,
	onPressRight,
	onLayout,
}: HeaderRightButtonProps) => {
	if (isInfo) {
		return (
			<TouchableOpacity
				style={styles.infoButton}
				onPress={onPressRight}
				onLayout={onLayout}>
				<Image source={informationIcon} style={styles.infoIcon} />
			</TouchableOpacity>
		);
	}
	return (
		<TouchableOpacity
			style={[
				styles.headerButton,
				rightIcon && styles.headerButtonBorder,
			]}
			onPress={onPressRight}>
			{rightIcon === 'Skip' ? (
				<Text style={styles.skipText}>{rightIcon}</Text>
			) : (
				rightIcon && (
					<Icon name={rightIcon} color={COLOR.PRIMARY} size={30} />
				)
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	headerButton: {
		width: 48,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerButtonBorder: {
		borderColor: COLOR.GRAY_3,
		borderWidth: 2,
		borderRadius: 8,
	},
	infoButton: {
		marginHorizontal: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoIcon: {
		width: 24,
		height: 24,
	},
	skipText: {
		fontFamily: 'Pretendard-Medium',
		fontSize: 16,
		color: COLOR.PRIMARY,
	},
});

export default HeaderRightButton;
