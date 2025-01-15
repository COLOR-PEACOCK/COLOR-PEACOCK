import { useCallback, useRef } from 'react';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	View,
	Dimensions,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
	ICarouselInstance,
	Pagination,
} from 'react-native-reanimated-carousel';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import convert from 'color-convert';

import { CustomText as Text } from '@components/common';
import { PressButton, OutlinedText } from '@components/Home';

import { useHomeState } from '@hooks/Home';
import { COLOR } from '@styles/color';
import { extractHexDigits } from '@utils/Home';
import { widthScale } from '@utils/scaling';

const { width } = Dimensions.get('window');
const DEFAULT_BUTTON_WIDTH = 376;
const DEFAULT_LIGHTNESS = 80;
const COLOR_CARD_WIDTH = width * 0.7;
const COLOR_CARD_OFFSET = 4;
const STACK_INTERVAL =
	COLOR_CARD_WIDTH > DEFAULT_BUTTON_WIDTH
		? DEFAULT_BUTTON_WIDTH
		: COLOR_CARD_WIDTH + COLOR_CARD_OFFSET;

const HomeContainer = () => {
	const caroucelRef = useRef<ICarouselInstance>(null);
	const progress = useSharedValue<number>(0);
	const { buttonList, handleSelectColorRecommend, TREND_COLOR_LIST } =
		useHomeState();

	const onPressPagination = useCallback(
		(index: number) => {
			'worklet';
			if (caroucelRef.current?.scrollTo) {
				caroucelRef.current.scrollTo({
					count: index - progress.value,
					animated: true,
				});
			}
		},
		[progress],
	);

	const isLight = (hexcode: string) =>
		convert.hex.hsl(extractHexDigits(hexcode))[2] > DEFAULT_LIGHTNESS;

	const renderItem = ({ item }: CarouselRenderItemInfo<color>) => {
		return (
			<Pressable
				onPress={() => handleSelectColorRecommend(item.hexcode)}
				style={[
					styles.card,
					{
						width: COLOR_CARD_WIDTH,
						maxWidth: DEFAULT_BUTTON_WIDTH,
						backgroundColor: item.hexcode,
					},
				]}>
				<OutlinedText
					strokeColor={
						isLight(item.hexcode) ? COLOR.GRAY_10 : COLOR.GRAY_2
					}
					textColor={item.hexcode}
					fontSize={38}
					text={item.colorName}
				/>
			</Pressable>
		);
	};

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

			<View style={styles.carouselContainer}>
				<View style={styles.section}>
					<Text style={styles.sectionKor}>올해의 즐겨찾는 색상</Text>
					<Text style={styles.sectionEng}>Trend color palette</Text>
				</View>
				<Carousel
					ref={caroucelRef}
					width={width}
					mode={'horizontal-stack'}
					modeConfig={{
						snapDirection: 'left',
						stackInterval: STACK_INTERVAL,
					}}
					data={TREND_COLOR_LIST}
					onProgressChange={progress}
					renderItem={renderItem}
				/>
			</View>
			<View style={styles.indicator}>
				<Pagination.Custom
					progress={progress}
					data={TREND_COLOR_LIST}
					dotStyle={styles.dotStyle}
					activeDotStyle={styles.activeDotStyle}
					containerStyle={{ gap: 6 }}
					onPress={onPressPagination}
				/>
			</View>
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
	section: {
		flexDirection: 'row',
		marginBottom: 3,
	},
	sectionKor: {
		color: COLOR.GRAY_10,
		fontSize: 16,
		fontFamily: 'Pretendard-Bold',
	},
	sectionEng: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Midium',
		marginBottom: 1.5,
		marginLeft: 6,
		alignSelf: 'flex-end',
	},
	carouselContainer: {
		height: 300,
		marginTop: 30,
		marginLeft: widthScale(35),
		borderRadius: 5,
		justifyContent: 'center',
		gap: 8,
	},
	card: {
		height: 168,
		paddingHorizontal: 18,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	indicator: { alignItems: 'center', justifyContent: 'center' },
	dotStyle: {
		width: 8,
		height: 8,
		backgroundColor: COLOR.PRIMARY + 50,
		borderRadius: 50,
		marginTop: -68,
	},
	activeDotStyle: {
		width: 20,
		backgroundColor: COLOR.PRIMARY,
		overflow: 'hidden',
		borderRadius: 50,
	},
});

export default HomeContainer;
