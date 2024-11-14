import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import _ from 'lodash';

// hooks & utils
import { useColorName, useImagePicker } from '@hooks';
import { convertToBase64, getHtmlContent } from '@utils/ImageScreen';

interface ColorName {
	korName: string;
	engName: string;
}

export const useImageScreen = () => {
	const [color, setColor] = useState<string>('#000000');
	const [colorName, setColorName] = useState<ColorName>({
		korName: '',
		engName: '',
	});
	const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

	const { imageUri, selectImage } = useImagePicker();
	const { getColorName } = useColorName();

	// 이미지 선택 기능
	useEffect(() => {
		selectImage();
	}, []);

	// imageUri 변경 시 Base64 변환
	useEffect(() => {
		if (imageUri) {
			convertToBase64(imageUri).then(dataUrl => {
				if (dataUrl) {
					setImageDataUrl(dataUrl);
				} else {
					Alert.alert(
						'Error',
						'이미지를 Base64로 변환하는데 실패했습니다.',
					);
				}
			});
		}
	}, [imageUri]);

	// WebView에서 전달받은 색상 데이터로 업데이트
	const onMessage = useCallback(
		_.throttle((event: { nativeEvent: { data: string } }) => {
			setColor(event.nativeEvent.data);
		}, 200),
		[],
	);

	// 색상 이름 업데이트
	useEffect(() => {
		const { korean_name, name } = getColorName(color);
		setColorName({ korName: korean_name, engName: name });
	}, [color]);

	return {
		color,
		colorName,
		imageDataUrl,
		onMessage,
		selectImage,
		getHtmlContent,
	};
};
