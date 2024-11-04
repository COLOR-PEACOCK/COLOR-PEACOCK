import { useState, useEffect } from 'react';

export const usePopup = (initialVisibility = false, dependency) => {
	const [showPopup, setShowPopup] = useState(initialVisibility);

	// 특정 종속성 변경 시 팝업 표시
	useEffect(() => {
		if (dependency) {
			setShowPopup(true);
		}
	}, [dependency]);

	// 팝업 표시 여부 설정
	const togglePopup = visibility => setShowPopup(visibility);

	// 팝업 닫기
	const handleClosePopup = () => setShowPopup(false);

	return {
		showPopup,
		togglePopup,
		handleClosePopup,
	};
};
