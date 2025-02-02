import { useObjectState } from '@hooks/ObjectScreen/objectStateContext';
import getDefaultItems from '@utils/object/getDefaultItems';

import maleItemData from '../../assets/data/objectdata/maleItemData.js';
import femaleItemData from '../../assets/data/objectdata/femaleItemData.js';

const useGenderChange = () => {
	const { isMale, setIsMale, setItemData, setDroppedItems, setDefaultItems } =
		useObjectState();

	// 성별과 아이템 아이템 변경 함수
	const handleGenderChange = () => {
		const newGender = !isMale;
		const newItemData: any = newGender ? maleItemData : femaleItemData;
		const defaultItems = getDefaultItems(newItemData);

		setIsMale(newGender);
		setDroppedItems(defaultItems);
		setDefaultItems(defaultItems);
		setItemData(newItemData);
	};

	return handleGenderChange;
};

export default useGenderChange;
