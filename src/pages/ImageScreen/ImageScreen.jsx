import React, { useState, useCallback, useEffect } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Pressable,
	Image,
	SafeAreaView,
	Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import _ from 'lodash';
import RNFS from 'react-native-fs';
import { COLOR } from '@styles/color';
// components
import {
	BasicHeader,
	CustomText as Text,
	CustomPopup,
} from '@components/common';
// hooks
import { useColorName, useImageWebview, useImagePicker } from '@hooks';
// icons
import imageIcon from '@icons/image.png';
import paletteIcon from '@icons/palette.png';
import aiIcon from '@icons/ai.png';
import { widthScale, heightScale } from '@utils/scaling';

const ImageScreen = ({ navigation, route }) => {
	const { visited } = route.params;
	const [color, setColor] = useState('#000000');
	const [colorName, setColorName] = useState({ korName: '', engName: '' });
	const [showPopup, setShowPopup] = useState(false);
	const [imageDataUrl, setImageDataUrl] = useState(null);

	const { imageUri, selectImage } = useImagePicker();
	const { getColorName } = useColorName();
	const { getHtmlContent } = useImageWebview();

	useEffect(() => {
		selectImage();
	}, []);

	useEffect(() => {
		if (imageUri && convertToBase64()) setShowPopup(!visited);
	}, [imageUri]);

	const convertToBase64 = async () => {
		try {
			const base64Image = await RNFS.readFile(imageUri, 'base64');
			const dataUrl = `data:image/jpeg;base64,${base64Image}`;
			setImageDataUrl(dataUrl);
		} catch (error) {
			console.log(error)
			Alert.alert('Error', '이미지를 Base64로 변환하는데 실패했습니다.');
			return false;
		}
		return true;
	};
	const onMessage = useCallback(
		_.throttle(event => {
			setColor(event.nativeEvent.data);
		}, 200),
		[],
	);

	const handleColorRecommend = () =>
		navigation.navigate('ColorRecommendScreen', {
			mainColor: { hexVal: color },
		});
	const handleAiRecommend = () =>
		navigation.navigate('ImageAiScreen', {
			mainColor: { hexVal: color },
		});

	useEffect(() => {
		const { korean_name, name } = getColorName(color);
		setColorName({ korName: korean_name, engName: name });
	}, [color]);

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<BasicHeader
						titleIcon={'image'}
						title={'이미지'}
						subTitle={'images'}
						rightIcon={'info'}
						infoText={'• 조준점을 잡아다 끌어서 이동시켜 보세요!\n• 선택하신 색상으로 추천을 진행합니다!'}
					/>
				</View>
				<View style={styles.colorInfoBox}>
					<View
						style={[
							styles.colorIndicator,
							{ backgroundColor: color },
						]}
					/>
					<View style={styles.colorDetails}>
						<View>
							<Text
								style={
									styles.korName
								}>{`≈${colorName.korName}`}</Text>
							<Text style={styles.engName}>
								{colorName.engName}
							</Text>
						</View>

						<Text style={styles.colorHex}>
							HEX: {color.toLocaleUpperCase()}
						</Text>
					</View>
				</View>
				<View style={styles.imageContainer}>
					{imageDataUrl ? (
						<WebView
							source={{ html: getHtmlContent(imageDataUrl) }}
							onMessage={onMessage}
							style={styles.webview}
						/>
					) : (
						<TouchableOpacity
							style={styles.placeholder}
							onPress={selectImage}>
							<Image
								source={imageIcon}
								style={{ width: 64, height: 64 }}
							/>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Text style={[styles.placeholderTextKor]}>
									이미지 선택
								</Text>
								<Text style={styles.placeholderTextEng}>
									select images
								</Text>
							</View>
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.buttonContainer}>
					<Pressable
						style={({ pressed }) => [
							{
								backgroundColor: pressed
									? COLOR.GRAY_7
									: COLOR.GRAY_6,
							},
							styles.button,
						]}
						onPress={handleAiRecommend}>
						<Image source={aiIcon} style={styles.buttonIcon} />
						<Text style={styles.ButtonText}>AI 테마 추천</Text>
					</Pressable>

					<Pressable
						style={({ pressed }) => [
							{
								backgroundColor: pressed
									? '#5F1AB6'
									: COLOR.PRIMARY,
							},
							styles.button,
						]}
						onPress={handleColorRecommend}>
						<Image source={paletteIcon} style={styles.buttonIcon} />
						<Text style={styles.ButtonText}>색상 추천</Text>
					</Pressable>
				</View>

				{showPopup && (
					<CustomPopup
						message={
							'조준점을 잡아다 끌어서 이동시켜 보세요!\n• 선택하신 색상으로 추천을 진행합니다!'
						}
						onClose={handleClosePopup}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	changeButton: {
		padding: 10,
		borderRadius: 8,
	},
	changeButtonText: {
		color: COLOR.PRIMARY,
		fontWeight: 'bold',
	},
	colorInfoBox: {
		paddingVertical: 18,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
		backgroundColor: COLOR.GRAY_9,
		zIndex: -1,
	},
	colorIndicator: {
		width: 64,
		height: 64,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'rgba(250, 250, 250, .3)',
	},
	colorDetails: {
		gap: 6,
		flex: 0.55,
	},
	korName: {
		color: COLOR.WHITE,
		fontSize: 14,
		fontWeight: '700',
	},
	engName: { color: COLOR.WHITE, fontSize: 12 },

	colorHex: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Light',
	},
	imageContainer: {
		flex: 3,
		width: '100%',
		paddingVertical: 4,
	},
	placeholder: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLOR.GRAY_2,
		gap: 24,
	},
	placeholderTextKor: {
		color: COLOR.GRAY_6,
		fontSize: 18,
		fontFamily: 'Pretendard-Bold',
	},
	placeholderTextEng: {
		color: COLOR.GRAY_6,
		fontSize: 14,
		fontFamily: 'Pretendard-Bold',
		textTransform: 'capitalize',
	},
	webview: {
		width: '100%',
		height: '100%',
	},
	buttonContainer: {
		height: heightScale(124),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLOR.GRAY_10,
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		gap: 6,
	},
	buttonIcon: {
		width: widthScale(26),
		height: heightScale(26),
	},
	aiButton: {
		backgroundColor: COLOR.GRAY_10,
		width: '40%',
		height: 78,
		marginVertical: 24,
		paddingVertical: 24,
		borderRadius: 8,
		borderColor: COLOR.PRIMARY,
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	ButtonText: {
		color: COLOR.WHITE,
		fontSize: widthScale(18),
		fontFamily: 'Pretendard-Bold',
	},
	recommendationButton: {
		backgroundColor: COLOR.PRIMARY,
		width: '40%',
		height: 78,
		marginVertical: 24,
		paddingVertical: 24,
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ImageScreen;
