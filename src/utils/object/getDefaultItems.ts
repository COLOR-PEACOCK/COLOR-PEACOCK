interface ClothingData {
	clothesTop: string[];
	clothesBottom: string[];
	socks: string[];
}

const getDefaultItems = (data: ClothingData): string[] => {
	return [data.clothesTop[0], data.clothesBottom[0], data.socks[0]];
};

export default getDefaultItems;
