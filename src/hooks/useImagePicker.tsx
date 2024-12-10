import { useState } from 'react';
import { Alert } from 'react-native';
import {
	launchImageLibrary,
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const useImagePicker = () => {
	const navigation = useNavigation();
	const [imageUri, setImageUri] = useState<string | null>(null);

	const selectImage = async (): Promise<boolean> => {
		try {
			const response = await launchImageLibrary({ mediaType: 'photo' });

			if (response.didCancel) return handleCancel();
			if (response.errorCode || response.errorMessage) return handleError(response.errorMessage);
			if (response.assets && response.assets[0]?.uri) setImageUri(response.assets[0].uri);

			return true;
		} catch (error: any) {
			handleUnexpectedError(error);
			return false;
		}
	};

	const handleCancel = (): boolean => {
		if (!imageUri) {
			navigation.goBack();
			Alert.alert('알림', '사진을 선택 해주세요.');
		}
		return false;
	};

	const handleError = (errorMessage?: string): boolean => {
		Alert.alert('Error', errorMessage || '알 수 없는 오류가 발생했습니다.');
		return false;
	};

	const handleUnexpectedError = (error: any): void => {
		Alert.alert(
			'Error',
			`이미지를 선택하는 동안 예기치 않은 오류가 발생했습니다: ${error.message}`,
		);
	};

	return { imageUri, selectImage };
};

export default useImagePicker;
