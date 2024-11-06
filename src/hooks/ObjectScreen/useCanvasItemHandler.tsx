import { ImageSourcePropType } from 'react-native';
import { useObjectState } from './objectStateContext';
import { heightScale } from '@utils/scaling';
import { ItemDataTypes } from 'types/itemData.interface';

import {
	ClothesTopGray,
	ClothesBottomGray,
	ShoesGray,
	Socks,
	DisableSocks,
} from '@icons/objecticon/objectIcon.js';

const useCanvasItemHandler = () => {
	const {
		droppedItems,
		setDroppedItems,
		selectedItemId,
		setSelectedItemId,
		defaultItems,
		activeTab,
		setActiveTab,
		setIsColorPickerOpen,
	} = useObjectState();

	const toggleSocksVisibility = (id: string) => {
		setDroppedItems(prevItems =>
			prevItems.map(item =>
				item.id === id ? { ...item, isVisible: !item.isVisible } : item,
			),
		);
	};

	const handleItemSelect = (id: string, category: string) => {
		if (category === 'socks') {
			toggleSocksVisibility(id);
			setSelectedItemId(prevId => (prevId === id ? null : id));
			return;
		}

		const newSelectedId = id === selectedItemId ? null : id;
		setSelectedItemId(newSelectedId);
		//탭 관리
		if (activeTab === null) {
			if (newSelectedId !== null) {
				setActiveTab(category);
			}
		} else {
			setActiveTab((prevTab: string | null) =>
				prevTab === category ? null : category,
			);
		}
		// 컬러피커 바텀시트 관리
		if (newSelectedId !== null) {
			setIsColorPickerOpen(true);
		} else {
			setIsColorPickerOpen(false);
		}
	};

	const handleItemDelete = (id: string) => {
		const itemToDelete = droppedItems.find(item => item.id === id);

		if (
			itemToDelete.category === 'clothesTop' ||
			itemToDelete.category === 'clothesBottom'
		) {
			// 상의나 하의인 경우, 해당 카테고리의 기본 아이템으로 교체
			const defaultItem = defaultItems.find(
				item => item.category === itemToDelete.category,
			);
			setDroppedItems(prevItems =>
				prevItems.map(item =>
					item.id === id ? { ...defaultItem, id: item.id } : item,
				),
			);
		} else if (!itemToDelete.isDefault) {
			// 기본 아이템이 아닌 경우 삭제
			setDroppedItems(prevItems =>
				prevItems.filter(item => item.id !== id),
			);
		}
		// 기본 아이템인 경우 유지
		setSelectedItemId(null);
		setIsColorPickerOpen(false);
		setActiveTab(null);
	};

	const getItemPosition = (item: ItemDataTypes) => ({
		left: heightScale(item.canvasX),
		top: heightScale(item.canvasY),
		width: heightScale(item.canvasWidth),
		height: heightScale(item.canvasHeight),
		zIndex: item.zIndex,
	});

	const getFocusButtonPosition = (category: string) => {
		const positions: { [key: string]: { top: number; right: number } } = {
			clothesTop: { top: heightScale(-352), right: heightScale(-148) },
			clothesBottom: { top: heightScale(-230), right: heightScale(-148) },
			shoes: { top: heightScale(-90), right: heightScale(-148) },
			socks: { top: heightScale(-100), right: heightScale(90) },
		};
		return (
			positions[category] || {
				top: heightScale(-90),
				right: heightScale(-100),
			}
		);
	};

	const getCategoryIcon = (
		category: string,
		isVisible: boolean | undefined,
	): ImageSourcePropType => {
		const icons: { [key: string]: ImageSourcePropType } = {
			clothesTop: ClothesTopGray,
			clothesBottom: ClothesBottomGray,
			shoes: ShoesGray,
			socks: isVisible ? DisableSocks : Socks,
		};
		return icons[category];
	};

	return {
		handleItemSelect,
		handleItemDelete,
		getItemPosition,
		getCategoryIcon,
		getFocusButtonPosition,
	};
};

export default useCanvasItemHandler;
