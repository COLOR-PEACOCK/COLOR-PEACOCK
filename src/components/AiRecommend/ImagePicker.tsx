import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import useImagePicker from '@hooks/useImagePicker';

const ImagePicker: React.FC = () => {
	const { imageUri, selectImage } = useImagePicker();

	return (
		<TouchableOpacity style={styles.imageContainer} onPress={selectImage}>
			{imageUri ? (
				<Image source={{ uri: imageUri }} style={styles.image} />
			) : (
				<View style={styles.placeholder}>
					<Text style={styles.placeholderText}>
						이미지를 선택하세요
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 40,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	placeholder: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	placeholderText: {
		color: '#888',
		fontSize: 16,
	},
});

export default ImagePicker;
