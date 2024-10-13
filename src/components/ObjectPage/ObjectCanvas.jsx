import React from 'react';
import { View, StyleSheet } from 'react-native';

import { heightScale } from '@utils/scaling';
import CanvasDroppedItem from '@components/ObjectPage/CanvasDroppedItem';

import MaleBodySvg from '@images/objectitems/bodyimages/male_body.svg';
import FeMaleBodySvg from '@images/objectitems/bodyimages/female__body.svg';

const ObjectCanvas = () => {
	const { gender } = useObjectState();
	const { droppedItems, selectedItemId, handleItemSelect, handleItemDelete } =
		useCanvasItemHandler();

	return (
		<View style={styles.canvas}>
			<View style={styles.avatarContainer}>
				{gender ? (
					<MaleBodySvg width="100%" height="100%" />
				) : (
					<FeMaleBodySvg width="100%" height="100%" />
				)}
				{droppedItems.map(item => (
					<CanvasDroppedItem
						key={item.id}
						item={item}
						isSelected={selectedItemId === item.id}
						onSelect={() =>
							handleItemSelect(item.id, item.category)
						}
						onDelete={() =>
							handleItemDelete(item.id, item.category)
						}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		borderRadius: 10,
		marginTop: heightScale(18),
		marginBottom: heightScale(88),
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarContainer: {
		width: heightScale(170),
		height: heightScale(480),
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ObjectCanvas;
