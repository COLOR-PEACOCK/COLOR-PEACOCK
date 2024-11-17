import React, { useCallback, useEffect, useRef } from 'react';
import {
	StyleSheet,
	View,
	Pressable,
	SafeAreaView,
	useWindowDimensions,
	Image,
	ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
	ICarouselInstance,
	Pagination,
} from 'react-native-reanimated-carousel';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import convert from 'color-convert';

import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';
import { PressButton, OutlinedText, SearchModal } from '@components/Home';
import { useCheckAppVersion, useModal } from '@hooks/index';
import { useBackHandler, useHomeState, usePressButtonState } from '@hooks/Home';
import { SearchSVG } from '@icons/index';
import { widthScale } from '@utils/scaling';

import logoIcon from '@icons/logo.png';

const DEFAULT_BUTTON_WIDTH = 376;

type HomeScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeScreenRouteProp> = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const pageWidth = width * 0.7;
	const caroucelRef = useRef<ICarouselInstance>(null);
	const progress = useSharedValue<number>(0);
	const { contentColor, buttonColor, handleTouchStart, handleTouchEnd } =
		usePressButtonState();

	const { isModalVisible, handleOpenModal, handleCloseModal } = useModal();
	const {
		handleSelectCamera,
		handleSelectAlbum,
		handleSelectAI,
		handleSearch,
	} = useHomeState();
	const { checkAppVersion } = useCheckAppVersion();

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

	// splash로 뒤로가기 방지 및 앱종료 모달
	useBackHandler();

	const renderItem = ({ item }: CarouselRenderItemInfo<color>) => {
		return (
			<Pressable
				onPress={() => {
					navigation.navigate('ColorRecommendScreen', {
						mainColor: { hexVal: item.hexcode },
					});
				}}
				style={[
					styles.card,
					{
						width: pageWidth,
						maxWidth: DEFAULT_BUTTON_WIDTH,
						backgroundColor: item.hexcode,
					},
				]}>
				<OutlinedText
					strokeColor={
						convert.hex.hsl(item.hexcode.replace('#', ''))[2] > 80
							? COLOR.GRAY_10
							: COLOR.GRAY_2
					}
					textColor={item.hexcode}
					fontSize={38}
					text={item.colorName}
				/>
			</Pressable>
		);
	};

	useEffect(() => {
		checkAppVersion();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
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
						style={[
							styles.searchIconWrapper,
							{ backgroundColor: buttonColor },
						]}
						onPressIn={handleTouchStart}
						onPress={handleOpenModal}
						onPressOut={handleTouchEnd}>
						<SearchSVG color={contentColor} />
					</Pressable>
				</View>
				<ScrollView
					contentContainerStyle={{ alignItems: 'center' }}
					showsVerticalScrollIndicator={false}>
					<View style={styles.buttonContainer}>
						<PressButton
							iconName={'camera'}
							onPress={handleSelectCamera}
							engText={'SELECT FROM CAMERA'}
							text={'카메라로 색상 추천 받기'}
							enabled={false}
						/>
						<PressButton
							iconName={'image'}
							onPress={handleSelectAlbum}
							engText={'SELECT TO ALBUM'}
							text={'이미지로 색상 추천 받기'}
						/>
						<PressButton
							iconName={'AI'}
							onPress={handleSelectAI}
							engText={'SELECT TO AI'}
							text={'AI로 색상 추천 받기'}
						/>
					</View>

					<View style={styles.split}></View>

					<View style={styles.carouselContainer}>
						<View style={styles.section}>
							<Text style={styles.sectionKor}>
								올해의 즐겨찾는 색상
							</Text>
							<Text style={styles.sectionEng}>
								Trend color palette
							</Text>
						</View>
						<Carousel
							ref={caroucelRef}
							width={width}
							mode={'horizontal-stack'}
							modeConfig={{
								snapDirection: 'left',
								stackInterval:
									pageWidth > DEFAULT_BUTTON_WIDTH
										? DEFAULT_BUTTON_WIDTH
										: pageWidth + 4,
							}}
							data={dummy_trendColor}
							onProgressChange={progress}
							renderItem={(info: CarouselRenderItemInfo<color>) =>
								renderItem(info)
							}
						/>
					</View>
					<View style={styles.indicator}>
						<Pagination.Custom
							progress={progress}
							data={dummy_trendColor}
							dotStyle={styles.dotStyle}
							activeDotStyle={styles.activeDotStyle}
							containerStyle={{ gap: 6 }}
							onPress={onPressPagination}
						/>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
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

const dummy_trendColor: color[] = [
	{
		hexcode: '#EAACC6',
		colorName: 'Pink Macaroon',
	},
	{
		hexcode: '#FFDAB9',
		colorName: 'Peach Puff',
	},
	{
		hexcode: '#FFAA4A',
		colorName: 'Five Star',
	},
	{
		hexcode: '#A2CFFE',
		colorName: 'Baby Blue',
	},
	{
		hexcode: '#EDDCC8',
		colorName: 'Almond',
	},
	{
		hexcode: '#816575',
		colorName: 'Opera',
	},
];

export default Home;
