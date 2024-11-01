import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import _ from 'lodash';

// hooks & utils
import { useColorName, useImagePicker } from '@hooks';

export const useImageScreen = (navigation, visited) => {
	// TODO: 팝업 반복 실행 이슈
	const [color, setColor] = useState('#000000');
	const [colorName, setColorName] = useState({ korName: '', engName: '' });
	const [showPopup, setShowPopup] = useState(false);
	const [imageDataUrl, setImageDataUrl] = useState(null);

	const { imageUri, selectImage } = useImagePicker();
	const { getColorName } = useColorName();

	// 화면 처음 렌더링 -> 이미지 선택 유도 기능
	useEffect(() => {
		selectImage();
	}, []);

	//  imageUri -> Base64로 변환 기능
	const convertToBase64 = async () => {
		try {
			const base64Image = await RNFS.readFile(imageUri, 'base64');
			setImageDataUrl(`data:image/jpeg;base64,${base64Image}`);
		} catch (error) {
			Alert.alert('Error', '이미지를 Base64로 변환하는데 실패했습니다.');
		}
	};

	// imageUri가 변경될 때 Base64 변환 및 팝업 표시 설정
	useEffect(() => {
		if (imageUri) {
			convertToBase64();
			setShowPopup(!visited);
		}
	}, [imageUri]);

	// 호출 제한하여 웹뷰에서 색상 데이터 전달 받기
	const onMessage = useCallback(
		_.throttle(event => {
			setColor(event.nativeEvent.data);
		}, 200),
		[],
	);

	// 색상 추천 화면으로
	const handleColorRecommend = () => {
		navigation.navigate('ColorRecommendScreen', {
			mainColor: { hexVal: color },
		});
	};

	// AI 테마 추천 화면으로
	const handleAiRecommend = () => {
		navigation.navigate('ImageAiScreen', { mainColor: { hexVal: color } });
	};

	// 색상 이름 업데이트
	useEffect(() => {
		const { korean_name, name } = getColorName(color);
		setColorName({ korName: korean_name, engName: name });
	}, [color]);

	// 팝업 닫기
	const handleClosePopup = () => {
		setShowPopup(false);
	};

	return {
		color,
		colorName,
		showPopup,
		imageDataUrl,
		handleColorRecommend,
		handleAiRecommend,
		onMessage,
		handleClosePopup,
		selectImage,
	};
};
