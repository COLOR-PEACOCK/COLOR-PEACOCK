import { ScrollView, StyleSheet, View } from 'react-native';
import { PressButton, TrendColorPalette } from '@components/Home';
import { useHomeState } from '@hooks/Home';
import { COLOR } from '@styles/color';
import { DEFAULT_BUTTON_WIDTH, widthScale } from '@utils/scaling';

const HomeContainer = () => {
	const { buttonList, handleSelectColorRecommend, TREND_COLOR_LIST } =
		useHomeState();

	return (
		<ScrollView
			contentContainerStyle={{ alignItems: 'center' }}
			showsVerticalScrollIndicator={false}>
			<View style={styles.buttonContainer}>
				{buttonList.map((item, index) => (
					<PressButton
						key={index}
						iconName={item.iconName}
						onPress={item.onPress}
						engText={item.engText}
						text={item.text}
						enabled={item.enabled}
					/>
				))}
			</View>

			<View style={styles.split}></View>
			<TrendColorPalette
				onSelectColorRecommend={handleSelectColorRecommend}
				TREND_COLOR_LIST={TREND_COLOR_LIST}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	split: {
		width: widthScale(DEFAULT_BUTTON_WIDTH),
		height: 4,
		backgroundColor: COLOR.GRAY_1,
	},
	buttonContainer: {
		width: widthScale(DEFAULT_BUTTON_WIDTH),
		paddingVertical: 38,
		gap: 18,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default HomeContainer;
