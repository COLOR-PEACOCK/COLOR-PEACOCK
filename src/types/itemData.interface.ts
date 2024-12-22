import { Dispatch, SetStateAction } from 'react';
import { ItemCategory } from '@typesStore/Object/itemCategories.ts';

export interface ItemDataTypes {
	[key: string]: ItemDataTypes[] | any;
	id: string;
	category: ItemCategory;
	svg: JSX.Element;
	color?: string;
	canvasHeight: number;
	canvasWidth: number;
	canvasX: number;
	canvasY: number;
	zIndex: number;
	isDefault?: boolean;
	isVisible?: boolean;
}

export interface ObjectStateContextType {
	itemData: ItemDataTypes | null;
	setItemData: Dispatch<SetStateAction<ItemDataTypes | null>>;
	droppedItems: any[];
	setDroppedItems: Dispatch<SetStateAction<any[]>>;
	isMale: boolean;
	setIsMale: Dispatch<SetStateAction<boolean>>;
	selectedItemId: string | null;
	setSelectedItemId: Dispatch<SetStateAction<string | null>>;
	isColorPickerOpen: boolean;
	setIsColorPickerOpen: Dispatch<SetStateAction<boolean>>;
	defaultItems: any[];
	setDefaultItems: Dispatch<SetStateAction<any[]>>;
	activeTab: string | null;
	setActiveTab: Dispatch<SetStateAction<string | null>>;
}

export interface ObjectStateProviderProps {
	children: React.ReactNode;
}

export interface RenderItemProps {
	item: ItemDataTypes;
	isSelected: boolean;
}
