import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { COLOR } from '@styles/color';

// 로딩중 텍스트
const LoadingText = () => {
	const [loadingText, setLoadingText] = useState<string>('AI 분석중');
	const loadingStates: string[] = [
		'AI 분석중',
		'AI 분석중.',
		'AI 분석중..',
		'AI 분석중...',
	];

	useEffect(() => {
		let index: number = 0;

		const interval = setInterval(() => {
			index = (index + 1) % loadingStates.length;
			setLoadingText(loadingStates[index]);
		}, 500); // 500ms마다 텍스트 변경

		return () => clearInterval(interval); // 컴포넌트가 unmount될 때 정지
	}, []);

	return (
		<View>
			<Text
				style={{
					fontFamily: 'Pretendard-Bold',
					color: COLOR.GRAY_10,
					fontSize: 16,
				}}>
				{loadingText}
			</Text>
		</View>
	);
};

export default LoadingText;
