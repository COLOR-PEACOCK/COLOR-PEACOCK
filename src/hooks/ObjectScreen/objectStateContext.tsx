import React, {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';

import { ItemDatatypes } from 'types/itemData.interface';

interface ObjectStateContextType {
	itemData: ItemDatatypes | null;
	setItemData: Dispatch<SetStateAction<ItemDatatypes | null>>;
	droppedItems: any[];
	setDroppedItems: Dispatch<SetStateAction<any[]>>;
	gender: boolean;
	setGender: Dispatch<SetStateAction<boolean>>;
	selectedItemId: string | null;
	setSelectedItemId: Dispatch<SetStateAction<string | null>>;
	isColorPickerOpen: boolean;
	setIsColorPickerOpen: Dispatch<SetStateAction<boolean>>;
	defaultItems: any[];
	setDefaultItems: Dispatch<SetStateAction<any[]>>;
	activeTab: string;
	setActiveTab: Dispatch<SetStateAction<string>>;
}

interface ObjectStateProviderProps {
	children: string;
}

const ObjectStateContext = createContext<ObjectStateContextType | undefined>(
	undefined,
);

export const ObjectStateProvider: React.FC<ObjectStateProviderProps> = ({
	children,
}) => {
	const [itemData, setItemData] = useState<ItemDatatypes | null>(null);
	const [droppedItems, setDroppedItems] = useState<any[]>([]);
	const [gender, setGender] = useState<boolean>(false);
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
	const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
	const [defaultItems, setDefaultItems] = useState<any[]>([]);
	const [activeTab, setActiveTab] = useState<string>('');

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
