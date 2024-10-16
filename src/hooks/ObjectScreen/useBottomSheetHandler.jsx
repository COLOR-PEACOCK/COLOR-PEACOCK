import { useEffect, useRef } from 'react';

import { useObjectState } from '@hooks/ObjectScreen/objectStateContext';

const useBottomSheetHandler = () => {
	const bottomSheetRef = useRef(null);
	const {
		selectedItemId,
		setDroppedItems,
		isColorPickerOpen,
		setIsColorPickerOpen,
	} = useObjectState();

	//컬러 팔레트 터치 이벤트
	const handleColorSelect = color => {
		if (selectedItemId) {
			setDroppedItems(prevItems =>
				prevItems.map(item =>
					item.id === selectedItemId
						? { ...item, color: color }
						: item,
				),
			);
		}
	};
	useEffect(() => {
		isColorPickerOpen
			? bottomSheetRef?.current?.snapToIndex(1)
			: bottomSheetRef?.current?.snapToIndex(0);
	}, [isColorPickerOpen]);

	// 커스텀 핸들러 터치 이벤트
	const handlerTouchEvent = () => {
		setIsColorPickerOpen(!isColorPickerOpen);
	};

	return { handleColorSelect, handlerTouchEvent, bottomSheetRef };
};
export default useBottomSheetHandler;
