import { useState, useEffect } from 'react';

interface UsePopupProps {
	initialVisibility: boolean;
	dependency: any;
}

export const usePopup = ({ initialVisibility, dependency }: UsePopupProps) => {
	const [showPopup, setShowPopup] = useState(initialVisibility);

	useEffect(() => {
		if (dependency) {
			setShowPopup(!initialVisibility);
		}
	}, [dependency, initialVisibility]);

	const handleClosePopup = () => setShowPopup(false);

	return { showPopup, handleClosePopup };
};
