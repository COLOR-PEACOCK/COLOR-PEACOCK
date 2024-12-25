import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import throttle from 'lodash/throttle';

import { useColorName, useImagePicker } from '@hooks/index';
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

	useEffect(() => {
		selectImage();
	}, []);

	useEffect(() => {
		getImageDataUrl();
	}, [imageUri]);

	const getImageDataUrl = useCallback(async () => {
		if (imageUri) {
			convertToBase64(imageUri)
				.then(dataUrl => {
					setImageDataUrl(dataUrl);
				})
				.catch(error => {
					console.error('Base64 변환 에러:', error);
					Alert.alert(
						'Error',
						'이미지를 Base64로 변환하는데 실패했습니다.',
					);
				});
		}
	}, [imageUri]);

	const onMessage = useCallback(
		throttle((event: { nativeEvent: { data: string } }) => {
			setColor(event.nativeEvent.data);
		}, 200),
		[],
	);

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
