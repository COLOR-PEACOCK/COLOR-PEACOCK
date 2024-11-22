import React from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

// components
import { BasicHeader } from '@components/common';
import OnboardingButton from '@components/AiOnboardingScreen/OnboardingButton';

// hooks & utils
import { widthScale, heightScale } from '@utils/scaling';
import useOnboardingNavigation from '@hooks/AiOnboardingScreen/useOnboardingNavigation';

// styles
import { COLOR } from '@styles/color';

const AiOnboardingScreen = () => {
	const navigation = useNavigation();
	const { swiperRef, currentIndex, setCurrentIndex, handleSkip, handleNext } =
		useOnboardingNavigation(navigation);

	return (
		<SafeAreaView style={styles.container}>
			<BasicHeader
				titleIcon="AI"
				title="Ai 추천"
				subTitle="ai recs"
				rightIcon="Skip"
				onPressRight={handleSkip}
			/>
			{/* TODO: 슬라이드 뷰 분리 <= 이슈 : Warning: Error: Text strings must be rendered within a <Text> component. */}
			<Swiper
				ref={swiperRef}
				loop={false}
				onIndexChanged={index => setCurrentIndex(index)}
				dot={<View style={styles.dot} />}
				activeDot={<View style={styles.activeDot} />}>
				<View style={styles.slide}>
					<Text style={styles.title}>내가 고른 아이템 색상과</Text>
					<View style={styles.highlightContainer}>
						<Image
							source={require('@images/highlight1.png')}
							style={styles.highlightImage}
							resizeMode="contain"
						/>
						<Text style={styles.titleWithBackground}>
							어울리는 색상을 추천해 드려요!
						</Text>
					</View>
					<Text style={styles.subtitle}>순식간에 색상 조합 끝</Text>
					<Image
						source={require('@images/onboarding1.png')}
						style={[styles.backgroundImage, { top: 1 }]}
						resizeMode="contain"
					/>
				</View>

				<View style={styles.slide}>
					<Text style={styles.title}>첫 번째</Text>
					<Text style={styles.title}>추천을 바라는 아이템이</Text>
					<View style={styles.highlightContainer}>
						<Image
							source={require('@images/highlight1.png')}
							style={styles.highlightImage}
							resizeMode="contain"
						/>
						<Text style={styles.titleWithBackground}>
							포함된 사진을 불러옵니다.
						</Text>
					</View>
					<Text style={styles.subtitle}>
						해당 아이템의 정보로 AI 추천 분석
					</Text>
					<Image
						source={require('@images/onboarding2.png')}
						style={[styles.backgroundImage, { top: -16 }]}
						resizeMode="contain"
					/>
				</View>

				<View style={styles.slide}>
					<Text style={styles.title}>두 번째</Text>
					<Text style={styles.title}>
						사진 속 아이템과 추천 아이템을
					</Text>
					<View style={styles.highlightContainer}>
						<Image
							source={require('@images/highlight1.png')}
							style={styles.highlightImage}
							resizeMode="contain"
						/>
						<Text style={styles.titleWithBackground}>
							아래와 같이 빠짐없이 작성합니다!
						</Text>
					</View>
					<Text style={styles.subtitle}>
						바지에 어울리는 신발 색상이 궁금하다면?
					</Text>
					<Image
						source={require('@images/onboarding3.png')}
						style={[styles.backgroundImage, { top: -16 }]}
						resizeMode="contain"
					/>
				</View>
			</Swiper>

			{/* 이동하기 버튼 컴포넌트 */}
			<OnboardingButton
				onPress={handleNext}
				text={
					currentIndex === 2
						? '지금 바로 이동하기'
						: '다음으로 이동하기'
				}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: widthScale(18),
	},
	backgroundImage: { width: 412, height: heightScale(426) },
	title: {
		fontSize: heightScale(24),
		color: COLOR.GRAY_9,
		opacity: 1,
		fontFamily: 'Pretendard-Bold',
	},
	highlightContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	highlightImage: {
		position: 'absolute',
		width: widthScale(320),
		height: heightScale(34),
		top: 0,
		opacity: 1,
	},
	titleWithBackground: {
		fontSize: heightScale(24),
		color: COLOR.GRAY_9,
		fontFamily: 'Pretendard-Bold',
		zIndex: 1,
	},
	subtitle: {
		fontSize: heightScale(16),
		color: COLOR.GRAY_6,
		marginBottom: heightScale(10),
		opacity: 1,
		fontFamily: 'Pretendard-Regular',
	},
	dot: {
		backgroundColor: 'rgba(135, 62, 241, 0.5)',
		width: widthScale(8),
		height: heightScale(8),
		borderRadius: 4,
		margin: 3,
	},
	activeDot: {
		backgroundColor: COLOR.PRIMARY,
		width: widthScale(20),
		height: heightScale(8),
		borderRadius: 25,
		margin: 3,
	},
});

export default AiOnboardingScreen;
