import { COLOR } from '@styles/color';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CustomText as Text } from '@components/common/CustomText';
import { heightScale } from '@utils/scaling';

import { useObjectState } from '@hooks/ObjectScreen/objectStateContext';
import { ItemDatatypes, RenderItemProps } from 'types/itemData.interface';

const RenderItemList: React.FC = () => {
	const {
		setDroppedItems,
		itemData,
		activeTab,
		setIsColorPickerOpen,
		setSelectedItemId,
	} = useObjectState();

	//아이템 플랫 리스트 렌더
	const renderItem = ({ item }: RenderItemProps) => {
		return (
			<View>
				<TouchableOpacity
					onPress={() => handleItemSelect(item)}
					style={styles.touchableItem}>
					{item.svg}
					<Text style={styles.applyText}>Click to apply</Text>
				</TouchableOpacity>
			</View>
		);
	};

	//아이템 선택 이벤트
	const handleItemSelect = (item: ItemDatatypes) => {
		setSelectedItemId(prevId => (prevId === item.id ? null : item.id));
		setIsColorPickerOpen(true);

		setDroppedItems(prevItems => {
			const newItem = {
				...item,
				svg: React.cloneElement(item.svg),
			};

			const updatedItems = prevItems.filter(
				i => i.category !== item.category,
			);
			const existingItem = prevItems.find(
				i => i.category === item.category,
			);

			if (existingItem) {
				newItem.color = existingItem.color || item.color;
			}

			return [...updatedItems, newItem];
		});
	};

	return (
		<FlatList
			data={itemData?.[activeTab] || []}
			renderItem={renderItem}
			horizontal={true}
			keyExtractor={item => item.id}
			contentContainerStyle={styles.flatListContent}
			showsHorizontalScrollIndicator={false}
		/>
	);
};

const styles = StyleSheet.create({
	flatListContent: {
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	touchableItem: {
		width: 150,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderRightColor: COLOR.GRAY_5,
		gap: heightScale(4),
	},
	applyText: {
		fontFamily: 'Pretendard-Medium',
		fontSize: heightScale(14),
		color: COLOR.GRAY_7,
	},
});
export default RenderItemList;
