import React, { createContext, useContext, useState } from 'react';

import {
	ItemDataTypes,
	ObjectStateContextType,
	ObjectStateProviderProps,
} from 'types/itemData.interface';

const ObjectStateContext = createContext<ObjectStateContextType | undefined>(
	undefined,
);

export const ObjectStateProvider: React.FC<ObjectStateProviderProps> = ({
	children,
}) => {
	const [itemData, setItemData] = useState<ItemDataTypes | null>(null);
	const [droppedItems, setDroppedItems] = useState<any[]>([]);
	const [gender, setGender] = useState<boolean>(false);
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
	const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
	const [defaultItems, setDefaultItems] = useState<any[]>([]);
	const [activeTab, setActiveTab] = useState<string | null>('');

	const value: ObjectStateContextType = {
		itemData,
		setItemData,
		droppedItems,
		setDroppedItems,
		gender,
		setGender,
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
