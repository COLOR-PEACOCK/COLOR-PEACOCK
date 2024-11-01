import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// hooks & utils
import { infoText } from '@utils/ImageScreen/infoText';
import { useImageWebview } from '@hooks';
import { useImageScreen } from '@hooks/ImageScreen/useImageScreen';

// components
import { BasicHeader, CustomPopup } from '@components/common';
import ColorInfo from '@components/ImageScreen/ColorInfo';
import ImagePlaceholder from '@components/ImageScreen/ImagePlaceholder';
import ControlButtons from '@components/ImageScreen/ControlButtons';

<<<<<<< Updated upstream
const ImageScreen = ({ navigation }) => {
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
		if (convertToBase64()) setShowPopup(true);
	}, [imageUri]);

	const convertToBase64 = async () => {
		try {
			const base64Image = await RNFS.readFile(imageUri, 'base64');
			const dataUrl = `data:image/jpeg;base64,${base64Image}`;
			setImageDataUrl(dataUrl);
		} catch (error) {
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
						infoText={'infomation text'}
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
=======
const ImageScreen = ({ navigation, route }) => {
	const {
		color,
		colorName,
		showPopup,
		imageDataUrl,
		handleColorRecommend,
		handleAiRecommend,
		onMessage,
		handleClosePopup,
		selectImage,
	} = useImageScreen(navigation, route.params.visited);
	const { getHtmlContent } = useImageWebview();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* 베이직 헤더 */}
			<BasicHeader
				titleIcon="image"
				title="이미지"
				subTitle="images"
				rightIcon="info"
				infoText={infoText}
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
>>>>>>> Stashed changes
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
