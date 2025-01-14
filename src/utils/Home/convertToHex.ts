import convert from 'color-convert';
import { compactKeyword, isValidKorean, isValidHexCode } from '@utils/Home';
import { INPUT_TYPES } from '@typesStore/Home/inputTypes';

const rgbToHex = (r: number, g: number, b: number) => {
	return `#${convert.rgb.hex([r, g, b])}`;
};

const hslToHex = (h: number, s: number, l: number) => {
	return `#${convert.hsl.hex([h, s, l])}`;
};

const cmykToHex = (c: number, m: number, y: number, k: number) => {
	return `#${convert.cmyk.hex([c, m, y, k])}`;
};

export const colorConverter = {
	[INPUT_TYPES.HEX]: (values: { part1: string }) =>
		isValidHexCode(`#${values.part1}`) ? `#${values.part1}` : null,
	[INPUT_TYPES.RGB]: (values: {
		part1: string;
		part2: string;
		part3: string;
	}) =>
		rgbToHex(
			Number(values.part1),
			Number(values.part2),
			Number(values.part3),
		) ?? null,
	[INPUT_TYPES.HSL]: (values: {
		part1: string;
		part2: string;
		part3: string;
	}) =>
		hslToHex(
			Number(values.part1),
			Number(values.part2),
			Number(values.part3),
		) ?? null,
	[INPUT_TYPES.CMYK]: (values: {
		part1: string;
		part2: string;
		part3: string;
		part4: string;
	}) =>
		cmykToHex(
			Number(values.part1),
			Number(values.part2),
			Number(values.part3),
			Number(values.part4),
		) ?? null,
	[INPUT_TYPES.COLOR_NAME]: (
		values: { part1: string },
		searchNameList: {
			distance: number | undefined;
			name: string;
			hex: string;
			korean_name: string;
		}[],
	) => {
		const keyword = compactKeyword(values.part1);
		const matchedColor = searchNameList.find(
			(color: { korean_name: string; name: string }) =>
				isValidKorean(keyword)
					? compactKeyword(color.korean_name) === keyword
					: compactKeyword(color.name) === keyword,
		);
		return matchedColor ? matchedColor.hex : null;
	},
};
