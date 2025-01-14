import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { CustomText as Text } from '@components/common';
import imageIcon from '@icons/image.png';
import { COLOR } from '@styles/color';

interface ImagePlaceholderProps {
	onSelectImage: () => void;
}
const ImagePlaceholder = ({ onSelectImage }: ImagePlaceholderProps) => (
	<TouchableOpacity style={styles.placeholder} onPress={onSelectImage}>
		<Image source={imageIcon} style={styles.icon} />
		<View style={styles.textContainer}>
			<Text style={styles.placeholderTextKor}>이미지 선택</Text>
			<Text style={styles.placeholderTextEng}>select images</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	placeholder: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLOR.GRAY_2,
		gap: 24,
	},
	icon: { width: 64, height: 64 },
	textContainer: { justifyContent: 'center', alignItems: 'center' },
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
});

export default ImagePlaceholder;
