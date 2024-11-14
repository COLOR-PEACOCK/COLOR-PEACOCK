import RNFS from 'react-native-fs';

export const convertToBase64 = async (
	imageUri: string,
): Promise<string | null> => {
	try {
		const base64Image = await RNFS.readFile(imageUri, 'base64');
		return `data:image/jpeg;base64,${base64Image}`;
	} catch {
		return null;
	}
};
