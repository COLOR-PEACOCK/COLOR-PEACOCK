import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import BasicHeader from '@components/common/BasicHeader';
import { COLOR } from '@styles/color';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
	ICarouselInstance,
	Pagination,
} from 'react-native-reanimated-carousel';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ObjectInteriorProps = NativeStackScreenProps<RootStackParamList, 'ObjectInterior'>

const ObjectInterior: React.FC<ObjectInteriorProps> = ({ route }) => {
	const colors = route.params;
	const [selectedColor, setSelectedColor] = useState(colors?.[0]);
	const { width } = useWindowDimensions();
	const pageWidth = width * 0.67;
	const baseUrl = 'https://www.color-name.com/interior?h=';
	const interiorData = [
		['drawing-room', 'bedroom'],
		['kitchen', 'living-room'],
	];
	const caroucelRef = useRef<ICarouselInstance>(null);
	const progress = useSharedValue<number>(0);

	const onPressPagination = useCallback(
		(index: number) => {
			'worklet';
			if (caroucelRef.current?.scrollTo) {
				caroucelRef.current.scrollTo({
					count: index - progress.value,
					animated: true,
				});
			}
		},
		[progress],
	);

	const renderItem = ({ item }: CarouselRenderItemInfo<string[]>) => {
		return (
			<View style={{ gap: 18 }}>
				<View>
					<Image
						width={width}
						height={pageWidth}
						source={{
							uri: `${baseUrl}
                        ${selectedColor?.replace('#', '')}&w=${item[0]}`,
						}}
						resizeMode={'contain'}
					/>
				</View>
				<Image
					width={width}
					height={pageWidth}
					source={{
						uri: `${baseUrl}
                        ${selectedColor?.replace('#', '')}&w=${item[1]}`,
					}}
					resizeMode={'contain'}
				/>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader title={'인테리어'} subTitle={'interior'} />
			<View style={styles.carouselContainer}>
				<Pagination.Basic
					progress={progress}
					data={interiorData}
					dotStyle={{
						width: 10,
						backgroundColor: COLOR.PRIMARY + 50,
						borderRadius: 50,
					}}
					activeDotStyle={{
						backgroundColor: COLOR.PRIMARY,
						overflow: 'hidden',
						borderRadius: 50,
					}}
					containerStyle={{ gap: 5, marginBottom: 10 }}
					onPress={onPressPagination}
				/>
			</View>
			<View>
				<Carousel
					ref={caroucelRef}
					width={width}
					height={pageWidth * 2}
					data={interiorData}
					onProgressChange={progress}
					renderItem={renderItem}
				/>
			</View>
			<View
				style={{
					width: width,
					height: 60,
					top: 550,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: COLOR.GRAY_10,
				}}>
				<FlatList
					data={colors}
					horizontal
					contentContainerStyle={{
						gap: (width - 240) / (colors?.length ?? 1),
					}}
					renderItem={item => {
						return (
							<Pressable
								style={{
									backgroundColor: item.item,
									width: 240 / (colors?.length ?? 1),
									height: 24,
									borderRadius: 4,
									marginVertical: 'auto',
								}}
								onPress={() =>
									setSelectedColor(item.item)
								}></Pressable>
						);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	carouselContainer: {
		width: 'auto',
		height: 'auto',
		marginTop: 38,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
});
export default ObjectInterior;
