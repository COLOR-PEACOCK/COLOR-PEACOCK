declare module '*.svg' {
	import React from 'react';
	import { SvgProps } from 'react-native-svg';
	const content: React.FC<SvgProps>;
	export default content;
}
declare module '*.png' {
	import { ImageSourcePropType, ImageURISource } from 'react-native';

	const content: ImageSourcePropType & ImageURISource;
	export default content;
}
