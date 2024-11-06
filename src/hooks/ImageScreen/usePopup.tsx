import { useState, useEffect } from 'react';

export const usePopup = (
	initialVisibility: boolean = false,
	dependency: any,
) => {
	const [showPopup, setShowPopup] = useState<boolean>(initialVisibility);

	// 특정 종속성 변경 시 팝업 표시
	useEffect(() => {
		if (dependency) {
			setShowPopup(true);
		}
	}, [dependency]);

	// 팝업 표시 여부 설정
	const togglePopup = (visibility: boolean) => setShowPopup(visibility);

	// 팝업 닫기
	const handleClosePopup = () => setShowPopup(false);

	return {
		showPopup,
		togglePopup,
		handleClosePopup,
	};
};
