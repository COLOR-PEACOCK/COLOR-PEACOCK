import { useRef, useState } from 'react';
import Swiper from 'react-native-swiper';

const FINAL_PAGE = 2;

const useOnboardingNavigation = (navigation: AiOnboardingScreenNavigationProps) => {
	const swiperRef = useRef<Swiper>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSkip = () => {
		navigation.navigate('AiScreen');
	};

	const handleNext = () => {
		if (currentIndex < FINAL_PAGE) {
			swiperRef.current?.scrollBy(1);
			return;
		}
		navigation.navigate('AiScreen');
	};

	return { swiperRef, currentIndex, setCurrentIndex, handleSkip, handleNext };
};

export default useOnboardingNavigation;
