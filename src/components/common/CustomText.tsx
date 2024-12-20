import { Text, TextStyle, StyleProp, TextProps } from 'react-native';
import { COLOR } from '@styles/color';

interface CustomTextProps extends TextProps {
	style?: StyleProp<TextStyle>;
}
/**
 * import 할 때 Text로 alias를 지정하면 일반 텍스트 컴포넌트와 동일하게 사용할 수 있습니다.
 * 아래 example 참고
 * @default fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: COLOR.BLACK,
 * @example
 * ```
 * import { CustomText as Text } from '@components/common/CustomText'
 * 
 * <Text>안녕하세요!</Text>
 * <Text style={{ fontSize: 18, color: COLOR.GRAY_10}}>색상 변경</Text>
 * ```
 */

export const CustomText = ({ style, ...rest }: CustomTextProps) => {
	const customStyle = {
		fontFamily: 'Pretendard-Regular',
		fontSize: 14,
		color: COLOR.GRAY_9,
	};

	return <Text style={[customStyle, style]} {...rest} />;
};
