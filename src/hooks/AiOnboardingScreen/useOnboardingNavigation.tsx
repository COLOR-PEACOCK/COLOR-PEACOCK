import { useRef, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const useOnboardingNavigation = (navigation: NavigationProp<any>) => {
	const swiperRef = useRef<Swiper>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSkip = () => {
		navigation.navigate('AiScreen');
	};

	const handleNext = () => {
		if (currentIndex < 2) {
			swiperRef.current?.scrollBy(1);
		} else {
			navigation.navigate('AiScreen');
		}
	};

	return { swiperRef, currentIndex, setCurrentIndex, handleSkip, handleNext };
};

export default useOnboardingNavigation;
