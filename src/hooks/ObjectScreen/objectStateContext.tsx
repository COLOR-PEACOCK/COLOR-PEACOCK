import React, { createContext, useContext, useState } from 'react';

import {
	ItemDataTypes,
	ObjectStateContextType,
	ObjectStateProviderProps,
} from '@typesStore/itemData.interface';

const ObjectStateContext = createContext<ObjectStateContextType | undefined>(
	undefined,
);

export const ObjectStateProvider = ({ children }: ObjectStateProviderProps) => {
	const [itemData, setItemData] = useState<ItemDataTypes | null>(null);
	const [droppedItems, setDroppedItems] = useState<any[]>([]);
	const [isMale, setIsMale] = useState<boolean>(false);
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
	const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
	const [defaultItems, setDefaultItems] = useState<any[]>([]);
	const [activeTab, setActiveTab] = useState<string | null>('');

	const value: ObjectStateContextType = {
		itemData,
		setItemData,
		droppedItems,
		setDroppedItems,
		isMale,
		setIsMale,
		selectedItemId,
		setSelectedItemId,
		isColorPickerOpen,
		setIsColorPickerOpen,
		defaultItems,
		setDefaultItems,
		activeTab,
		setActiveTab,
	};

	return (
		<ObjectStateContext.Provider value={value}>
			{children}
		</ObjectStateContext.Provider>
	);
};

export const useObjectState = (): ObjectStateContextType => {
	const context = useContext(ObjectStateContext);
	if (context === undefined) {
		throw new Error(
			'useObjectState must be used within an ObjectStateProvider',
		);
	}
	return context;
};
