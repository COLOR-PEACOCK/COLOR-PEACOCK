import { StyleSheet, Text, View } from 'react-native';
import { COLOR } from '@styles/color';
import { SVGIcon } from '@components/common';

interface HeaderTitleProps {
	titleIcon?: IconName;
	title?: string;
	subTitle?: string;
}

const HeaderTitle = ({ titleIcon, title, subTitle }: HeaderTitleProps) => {
	return (
		<View style={styles.titleContainer}>
			<SVGIcon
				name={titleIcon}
				width={45}
				height={45}
				color={COLOR.PRIMARY}
			/>

			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subTitle}>{subTitle}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		width: '100%',
		height: 64,
		flexDirection: 'row',
		paddingHorizontal: 18,
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 5,
		backgroundColor: COLOR.WHITE,
	},
	titleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	title: {
		fontFamily: 'CookieRun-Regular',
		fontSize: 20,
		color: COLOR.PRIMARY,
		textAlign: 'center',
		letterSpacing: -1,
	},
	subTitle: {
		fontFamily: 'CookieRun-Regular',
		fontSize: 16,
		color: COLOR.GRAY_6,
		paddingLeft: 6,
		letterSpacing: -0.8,
	},
});

export default HeaderTitle;
