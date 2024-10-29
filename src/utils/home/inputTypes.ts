export const INPUT_TYPES = {
	COLOR_NAME: '색상 이름',
	HEX: 'HEX',
	RGB: 'RGB',
	HSL: 'HSL',
	CMYK: 'CMYK',
};

export const inputTypeMap = {
	[INPUT_TYPES.COLOR_NAME]: {
		labels: ['입력'],
		placeholders: ['(한글, 영어)'],
		maxLength: undefined,
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
