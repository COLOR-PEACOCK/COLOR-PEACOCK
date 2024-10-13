import { useState } from 'react';

const useObjectState = () => {
	const [droppedItems, setDroppedItems] = useState([]);
	const [gender, setGender] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
	const [defaultItems, setDefaultItems] = useState([]);
	const [activeTab, setActiveTab] = useState('');

	return {
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
};

export default useObjectState;
