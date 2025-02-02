import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UsePopupProps {
	initialVisibility: boolean;
}

export const usePopup = ({ initialVisibility }: UsePopupProps) => {
	const [showPopup, setShowPopup] = useState(initialVisibility);

	useEffect(() => {
		const checkFirstVisit = async () => {
			try {
				const hasVisited = await AsyncStorage.getItem('hasVisited');
				if (!hasVisited && initialVisibility) {
					setShowPopup(true);
					await AsyncStorage.setItem('hasVisited', 'true');
				} else {
					setShowPopup(false);
				}
			} catch (error) {
				console.error('AsyncStorage error:', error);
			}
		};

		checkFirstVisit();
	}, [initialVisibility]);

	return { showPopup };
};
