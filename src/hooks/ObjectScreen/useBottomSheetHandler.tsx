import { useEffect, useRef } from 'react';

import { useObjectState } from '@hooks/ObjectScreen/objectStateContext';

interface BottomSheetType {
	snapToIndex: (index: number) => void;
}

const useBottomSheetHandler = () => {
	const bottomSheetRef = useRef<BottomSheetType | null>(null);
	const {
		selectedItemId,
		setDroppedItems,
		isColorPickerOpen,
		setIsColorPickerOpen,
	} = useObjectState();

	//컬러 팔레트 터치 이벤트
	const handleColorSelect = (color: string) => {
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
	const handlerTouchEvent = (): void => {
		setIsColorPickerOpen(!isColorPickerOpen);
	};

	return { handleColorSelect, handlerTouchEvent, bottomSheetRef };
};
export default useBottomSheetHandler;
