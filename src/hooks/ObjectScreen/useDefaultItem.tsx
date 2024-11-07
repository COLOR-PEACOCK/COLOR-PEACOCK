import { useEffect } from 'react';
import { useObjectState } from './objectStateContext';
import getDefaultItems from '@utils/object/getDefaultItems';

import maleItemData from '../../assets/data/objectdata/maleItemData';
import femaleItemData from '../../assets/data/objectdata/femaleItemData';

const useDefaultItem = () => {
	const { gender, setItemData, setDroppedItems, setDefaultItems } =
		useObjectState();
	// 마운트 시 초기 아이템
	useEffect(() => {
		const initialItemData: any = gender ? maleItemData : femaleItemData;
		setItemData(initialItemData);
		const defaultItems = getDefaultItems(initialItemData);
		setDroppedItems(defaultItems);
		setDefaultItems(defaultItems);
	}, []);
};

export default useDefaultItem;
