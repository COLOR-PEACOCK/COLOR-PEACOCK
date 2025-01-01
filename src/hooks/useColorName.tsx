import { useMemo } from 'react';
import nearestColor from 'nearest-color';
import colorNameList from '../assets/color_name.json';
import { getLevenshteinDistance, compactKeyword } from '@utils/Home';

interface ColorResponse {
	korean_name: string;
	name: string;
}

const useColorName = () => {
	const nearestName = useMemo(() => {
		const combinedColorMap = colorNameList.reduce(
			(o, { name, korean_name, hex }) =>
				Object.assign(o, { [korean_name + '/' + name]: hex }),
			{},
		);
		return nearestColor.from(combinedColorMap);
	}, [colorNameList]);

	const getColorName = (value: string): ColorResponse => {
		const response = nearestName?.(value);
		const [korean_name, name] = response?.name.split('/') || '';
		return { korean_name, name };
	};

	const getSortedSearchColorList = (
		key: 'korean_name' | 'name',
		keyword: string,
	) => {
		return colorNameList
			.filter(color => {
				return compactKeyword(color[key]).includes(keyword);
			})
			.map(color => ({
				...color,
				distance: getLevenshteinDistance(
					compactKeyword(color[key]),
					keyword,
				),
			}))
			.sort((a, b) => (a?.distance || 0) - (b?.distance || 0))
			.slice(0, 5);
	};

	const getSearchColorList = (isKorean: boolean, keyword: string) => {
		const key = isKorean ? 'korean_name' : 'name';
		const keyword_ = compactKeyword(keyword);
		return getSortedSearchColorList(key, keyword_);
	};

	return {
		getColorName,
		getSearchColorList,
	};
};

export default useColorName;
