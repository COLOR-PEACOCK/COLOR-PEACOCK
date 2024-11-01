// 기본 아이템 선택 함수
const getDefaultItems = data => {
	return [data.clothesTop[0], data.clothesBottom[0], data.socks[0]];
};

export default getDefaultItems;
