import { KeyboardTypeOptions } from 'react-native';

export interface InputValuesType {
	part1: string;
	part2: string;
	part3: string;
	part4: string;
}

export interface InputConfig {
	[key: string]: {
		labels: string[];
		placeholders?: string[];
		unit?: string[];
		maxLength: number;
		keyboardType: KeyboardTypeOptions;
	};
}

export const INPUT_TYPES = {
	COLOR_NAME: '색상 이름',
	HEX: 'HEX',
	RGB: 'RGB',
	HSL: 'HSL',
	CMYK: 'CMYK',
};

export const inputTypeMap: InputConfig = {
	[INPUT_TYPES.COLOR_NAME]: {
		labels: ['입력'],
		placeholders: ['(한글, 영어)'],
		maxLength: 20,
		keyboardType: 'default',
	},
	[INPUT_TYPES.HEX]: {
		labels: ['#'],
		placeholders: ['ffffff'],
		maxLength: 6,
		keyboardType: 'default',
	},
	[INPUT_TYPES.RGB]: {
		labels: ['R', 'G', 'B'],
		placeholders: ['0~255', '0~255', '0~255'],
		unit: ['', '', ''],
		maxLength: 3,
		keyboardType: 'number-pad',
	},
	[INPUT_TYPES.HSL]: {
		labels: ['H', 'S', 'L'],
		placeholders: ['0~360', '0~100', '0~100'],
		unit: ['°', '%', '%'],
		maxLength: 3,
		keyboardType: 'number-pad',
	},
	[INPUT_TYPES.CMYK]: {
		labels: ['C', 'M', 'Y', 'K'],
		placeholders: ['0~100', '0~100', '0~100', '0~100'],
		unit: ['%', '%', '%', '%'],
		maxLength: 3,
		keyboardType: 'number-pad',
	},
};
