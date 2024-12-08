import React, { SVGProps } from 'react';
import {
	CameraSVG,
	ImageSVG,
	AISVG,
	PaletteSVG,
	ReportSVG,
	ObjectSVG,
	SearchSVG,
} from '@icons/index';

const iconMap: { [key in IconName]: React.FC<SVGProps<SVGSVGElement>> } = {
	camera: CameraSVG,
	image: ImageSVG,
	AI: AISVG,
	palette: PaletteSVG,
	report: ReportSVG,
	object: ObjectSVG,
	search: SearchSVG,
};

interface SVGIconProps extends SVGProps<SVGSVGElement> {
	name?: IconName;
}

/**
 * @param {string} name camera, image, AI, palette, report
 * @reutrn SVG component
 * @example name, width, height, color가 모두 지정되어야 합니다.
```
<SVGIcon name={'camera'}
width={25} height={25}
color={COLOR.PRIMARY}
/>
```
 */
const SVGIcon = ({ name, ...rest }: SVGIconProps) => {
	const SVG = name ? iconMap[name] : null;
	return SVG ? <SVG key={name} {...rest} /> : null;
};

export default SVGIcon;
