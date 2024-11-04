import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// hooks & utils
import { ImageScreenInfoText } from '@utils/infoText';
import { useImageWebview } from '@hooks';
import { useImageScreen, useControlScreen, usePopup } from '@hooks/ImageScreen';

// components
import { BasicHeader, CustomPopup } from '@components/common';
import {
	ColorInfo,
	ImagePlaceholder,
	ControlButtons,
} from '@components/ImageScreen';

const ImageScreen = ({ navigation, route }) => {
	const { color, colorName, imageDataUrl, onMessage, selectImage } =
		useImageScreen(route.params);
	const { handleColorRecommend, handleAiRecommend } = useControlScreen(
		navigation,
		color,
	);
	const { getHtmlContent } = useImageWebview();
	const { showPopup, handleClosePopup } = usePopup(
		!route.params?.visited,
		imageDataUrl,
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* 베이직 헤더 */}
			<BasicHeader
				titleIcon="image"
				title="이미지"
				subTitle="images"
				rightIcon="info"
				infoText={ImageScreenInfoText}
			/>
			{/* 크로스 헤어 초점 색상 정보 */}
			<ColorInfo color={color} colorName={colorName} />
			{/* 이미지 */}
			<View style={styles.imageContainer}>
				{imageDataUrl ? (
					<WebView
						source={{ html: getHtmlContent(imageDataUrl) }}
						onMessage={onMessage}
						style={styles.webview}
					/>
				) : (
					<ImagePlaceholder onSelectImage={selectImage} />
				)}
			</View>
			{/* 버튼 */}
			<ControlButtons
				onAiRecommend={handleAiRecommend}
				onColorRecommend={handleColorRecommend}
			/>
			{/* 초기 설명 팝업 */}
			{showPopup && (
				<CustomPopup
					message="조준점을 잡아다 끌어서 이동시켜 보세요!"
					onClose={handleClosePopup}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	imageContainer: { flex: 3, width: '100%', paddingVertical: 4 },
	webview: { width: '100%', height: '100%' },
});

export default ImageScreen;
