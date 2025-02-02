import RNFS from 'react-native-fs';

export const convertToBase64 = async (imageUri: string): Promise<string> => {
	try {
		const base64Image = await RNFS.readFile(imageUri, 'base64');
		const ext = imageUri.split('.').pop()?.toLowerCase() || 'jpg'; // 확장자 추출
		const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
		return `data:${mimeType};base64,${base64Image}`;
	} catch (error) {
		throw error;
	}
};
