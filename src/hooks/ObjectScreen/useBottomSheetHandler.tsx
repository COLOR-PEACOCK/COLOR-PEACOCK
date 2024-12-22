import { useEffect, useRef } from 'react';

import { useObjectState } from '@hooks/ObjectScreen/objectStateContext';
import BottomSheet from '@gorhom/bottom-sheet';

const useBottomSheetHandler = () => {
	const bottomSheetRef = useRef<BottomSheet | null>(null);
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
		bottomSheetRef?.current?.snapToIndex(isColorPickerOpen ? 1 : 0);
	}, [isColorPickerOpen]);

	useEffect(() => {
		return () => {
			setIsColorPickerOpen(false);
		};
	}, []);

	const handlerTouchEvent = (): void => {
		setIsColorPickerOpen(!isColorPickerOpen);
	};

	return { handleColorSelect, handlerTouchEvent, bottomSheetRef };
};
export default useBottomSheetHandler;
