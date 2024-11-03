import { useObjectState } from '@hooks/ObjectScreen/objectStateContext.jsx';
import getDefaultItems from '@utils/object/getDefaultItems.jsx';

import maleItemData from '../../assets/data/objectdata/maleItemData.js';
import femaleItemData from '../../assets/data/objectdata/femaleItemData.js';

const useGenderChange = () => {
	const { gender, setGender, setItemData, setDroppedItems, setDefaultItems } =
		useObjectState();

	// 성별과 아이템 아이템 변경 함수
	const handleGenderChange = () => {
		const newGender = !gender;
		const newItemData = newGender ? maleItemData : femaleItemData;
		const defaultItems = getDefaultItems(newItemData);

		setGender(newGender);
		setDroppedItems(defaultItems);
		setDefaultItems(defaultItems);
		setItemData(newItemData);
	};

	return handleGenderChange;
};

export default useGenderChange;
