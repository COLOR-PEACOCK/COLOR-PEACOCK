import React from 'react';
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Text,
} from 'react-native';
import MaleBodySvg from '@images/objectitems/bodyimages/male_body.svg';
import FeMaleBodySvg from '@images/objectitems/bodyimages/female__body.svg';
import { COLOR } from '@styles/color';

const ObjectCanvas = ({
	droppedItems,
	setDroppedItems,
	setSelectedItemId,
	selectedItemId,
	gender,
}) => {
	// 오브젝트 캔버스 터치시 이벤트
	const handleItemSelect = id => {
		setSelectedItemId(prevId => (prevId === id ? null : id));
	};

	const handleItemDelete = id => {
		setDroppedItems(prevItems => prevItems.filter(item => item.id !== id));
		setSelectedItemId(null);
	};

	return (
		<View style={styles.canvas}>
			{gender ? (
				<MaleBodySvg width={170} />
			) : (
				<FeMaleBodySvg width={180} />
			)}
			{droppedItems.map(item => {
				return (
					<View key={item.id}>
						<TouchableWithoutFeedback
							onPress={() => handleItemSelect(item.id)}>
							<View
								style={[
									styles.droppedItem,
									{
										left: item.canvasX,
										top: item.canvasY,
										width: item.canvasWidth,
										height: item.canvasHeight,
										zIndex: item.zIndex,
										borderWidth: 1.3,
										borderColor:
											selectedItemId === item.id
												? '#D6C836'
												: 'transparent',
									},
								]}>
								{React.cloneElement(item.svg, {
									width: item.canvasWidth,
									height: item.canvasHeight,
									fill: item.color || '#FBFBFB',
								})}
							</View>
						</TouchableWithoutFeedback>
						{selectedItemId === item.id && !item.isDefault && (
							<TouchableOpacity
								style={styles.deleteButton}
								onPress={() => handleItemDelete(item.id)}>
								<Text style={styles.deleteButtonText}>X</Text>
							</TouchableOpacity>
						)}
					</View>
				);
			})}
		</View>
	);
};
const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		borderRadius: 10,
		marginTop: 16,
		alignItems: 'center',
	},
	droppedItem: {
		position: 'absolute',
		flex: 1,
		zIndex: 1000,
	},
	deleteButton: {
		position: 'absolute',
		top: -440,
		right: -170,
		backgroundColor: '#F3F7F8',
		borderRadius: 18,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1001,
	},
	deleteButtonText: {
		color: COLOR.PRIMARY,
		fontWeight: 'bold',
	},
});

export default ObjectCanvas;
