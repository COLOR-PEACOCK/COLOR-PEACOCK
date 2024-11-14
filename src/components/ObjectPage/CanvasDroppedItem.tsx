import React from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

import { heightScale } from '@utils/scaling';
import { COLOR } from '@styles/color';
import { useCanvasItemHandler } from '@hooks/ObjectScreen';
import { RenderItemProps } from '@typesStore/itemData.interface.ts';
import { TrashIcon } from '@icons/objecticon/objectIcon.js';

const CanvasDroppedItem: React.FC<RenderItemProps> = ({ item, isSelected }) => {
	const {
		handleItemSelect,
		handleItemDelete,
		getItemPosition,
		getCategoryIcon,
		getFocusButtonPosition,
	} = useCanvasItemHandler();

	const focusButtonPosition = getFocusButtonPosition(item.category);

	return (
		<View>
			{(item.category !== 'socks' || item.isVisible !== false) && (
				<Pressable
					onPress={() => handleItemSelect(item.id, item.category)}
					style={[styles.droppedItem, getItemPosition(item)]}>
					{React.cloneElement(item.svg, {
						width: '100%',
						height: ' 100%',
						fill: item.color || '#FBFBFB',
					})}
				</Pressable>
			)}
			<TouchableOpacity
				style={[
					styles.focusButton,
					isSelected && styles.focusButtonSelected,
					focusButtonPosition,
				]}
				onPress={() => handleItemSelect(item.id, item.category)}>
				<Image
					source={getCategoryIcon(item.category, item.isVisible)}
					style={{ width: heightScale(28), height: heightScale(28) }}
				/>
			</TouchableOpacity>
			{isSelected && item.category !== 'socks' && (
				<TouchableOpacity
					style={[
						styles.trashButton,
						{
							top: focusButtonPosition.top - heightScale(3),
							right: focusButtonPosition.right - heightScale(49),
						},
					]}
					onPress={() => handleItemDelete(item.id)}>
					<Image
						source={TrashIcon}
						style={{
							width: heightScale(15),
							height: heightScale(23),
						}}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	droppedItem: {
		position: 'absolute',
	},
	focusButton: {
		position: 'absolute',
		backgroundColor: COLOR.GRAY_1,
		borderRadius: heightScale(50),
		borderWidth: heightScale(2),
		borderColor: COLOR.GRAY_4,
		width: heightScale(48),
		height: heightScale(48),
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1001,
	},
	focusButtonSelected: {
		borderColor: COLOR.PRIMARY,
	},
	trashButton: {
		position: 'absolute',
		backgroundColor: COLOR.GRAY_3,
		flexDirection: 'row',
		borderRadius: 50,
		width: heightScale(100),
		height: heightScale(54),
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: heightScale(20),
		zIndex: 1000,
	},
});
export default CanvasDroppedItem;
