import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR } from '@styles/color';

interface HeaderLeftButtonProps {
	leftIcon: string;
	onPressLeft: () => void;
}

const HeaderLeftButton = ({ leftIcon, onPressLeft }: HeaderLeftButtonProps) => {
	return (
		<TouchableOpacity
			style={[styles.headerButton, leftIcon && styles.headerButtonBorder]}
			onPress={onPressLeft}>
			{leftIcon && (
				<Icon name={leftIcon} color={COLOR.PRIMARY} size={30} />
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
});

export default HeaderLeftButton;
