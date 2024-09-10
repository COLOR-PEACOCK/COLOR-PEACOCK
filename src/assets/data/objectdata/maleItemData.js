import React from 'react';
import Tshirt from '@images/objectitems/male/clothesTop/T-shirts.js';
import Shorts from '@images/objectitems/male/clothesBottom/shorts.js';

const maleItemData = {
	clothesTop: [
		{
			id: '1',
			category: 'clothesTop',
			canvasWidth: 170,
			canvasHeight: 170,
			canvasX: -72,
			canvasY: -400,
			zIndex: 300,
			svg: <Tshirt width={80} height={80} fill={'#FBFBFB'} />,
		},
	],
	clothesBottom: [
		{
			id: '2',
			category: 'clothesBottom',
			canvasWidth: 170,
			canvasHeight: 170,
			canvasX: 95,
			canvasY: 73,
			zIndex: 200,
			svg: <Shorts width={80} height={80} />,
		},
		// 다른 남성 하의 아이템들...
	],
	shoes: [],
};

export default maleItemData;