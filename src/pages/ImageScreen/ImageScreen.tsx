import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { BasicHeader, CustomPopup } from '@components/common';
import {
	ColorInfo,
	ImagePlaceholder,
	ControlButtons,
} from '@components/ImageScreen';
import { ImageScreenInfoText } from '@utils/infoText';
import { usePopup, useImageScreen, useControlScreen } from '@hooks/ImageScreen';

const ImageScreen = ({ navigation }: ImageScreenProps) => {
	const {
		color,
		colorName,
		imageDataUrl,
		onMessage,
		selectImage,
		getHtmlContent,
	} = useImageScreen();
	const { handleColorRecommend, handleAiRecommend } = useControlScreen(
		navigation,
		color,
	);
	const { showPopup } = usePopup({
		initialVisibility: true,
	});

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader
				titleIcon={'image'}
				title={'이미지'}
				subTitle={'images'}
				rightIcon={'info'}
				infoText={ImageScreenInfoText}
			/>
			<ColorInfo color={color} colorName={colorName} />
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
			<ControlButtons
				onAiRecommend={handleAiRecommend}
				onColorRecommend={handleColorRecommend}
			/>
			{showPopup && (
				<CustomPopup message="조준점을 잡아다 끌어서 이동시켜 보세요!" />
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	imageContainer: { flex: 3, width: '100%', paddingVertical: 4 },
	webview: { width: '100%', height: '100%' },
});

export default ImageScreen;
