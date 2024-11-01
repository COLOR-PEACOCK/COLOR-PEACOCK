import React, { createContext, useContext, useState } from 'react';

const ObjectStateContext = createContext();

export const ObjectStateProvider = ({ children }) => {
	const [itemData, setItemData] = useState(null);
	const [droppedItems, setDroppedItems] = useState([]);
	const [gender, setGender] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
	const [defaultItems, setDefaultItems] = useState([]);
	const [activeTab, setActiveTab] = useState('');

	const value = {
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
		itemData,
		setItemData,
	};

	return (
		<ObjectStateContext.Provider value={value}>
			{children}
		</ObjectStateContext.Provider>
	);
};

export const useObjectState = () => {
	const context = useContext(ObjectStateContext);
	return context;
};
