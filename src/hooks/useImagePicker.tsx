import { useState } from 'react';
import { Alert } from 'react-native';
import {
	launchImageLibrary,
	ImagePickerResponse,
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const useImagePicker = () => {
	const navigation = useNavigation();
	const [imageUri, setImageUri] = useState<string | null>(null);

	const selectImage = async (): Promise<boolean> => {
		try {
			const response: ImagePickerResponse = await launchImageLibrary({
				mediaType: 'photo',
			});

			if (response.didCancel) {
				if (!imageUri) {
					navigation.goBack();
					Alert.alert('알림', '사진을 선택 해주세요.');
				}
				return false;
			} else if (response.errorCode || response.errorMessage) {
				Alert.alert(
					'Error',
					response.errorMessage || '알 수 없는 오류가 발생했습니다.',
				);
				return false;
			} else if (response.assets && response.assets[0]?.uri) {
				setImageUri(response.assets[0].uri);
			}
		} catch (error: any) {
			Alert.alert(
				'Error',
				`이미지를 선택하는 동안 예기치 않은 오류가 발생했습니다: ${error.message}`,
			);
			return false;
		}
		return true;
	};

	return { imageUri, selectImage };
};

export default useImagePicker;
