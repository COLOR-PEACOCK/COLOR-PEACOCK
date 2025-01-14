import { isValidKorean } from './inputValidation';

export const compactKeyword = (str: string) => {
	const keyword = str.replaceAll(' ', '');
	return isValidKorean(keyword) ? keyword : keyword.toUpperCase();
};

export const extractHexDigits = (hexCode: string) => {
	return hexCode.replace('#', '');
};
