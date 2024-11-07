import React, { PropsWithChildren, SVGProps } from 'react';
import {
	CameraSVG,
	ImageSVG,
	AISVG,
	PaletteSVG,
	ReportSVG,
	ObjectSVG,
	SearchSVG,
} from '@icons/index';

export type IconName =
	| 'camera'
	| 'image'
	| 'AI'
	| 'palette'
	| 'report'
	| 'object'
	| 'search';

const iconMap: { [key in IconName]: React.FC<SVGProps<SVGSVGElement>> } = {
	camera: CameraSVG as React.FC<SVGProps<SVGSVGElement>>,
	image: ImageSVG as React.FC<SVGProps<SVGSVGElement>>,
	AI: AISVG as React.FC<SVGProps<SVGSVGElement>>,
	palette: PaletteSVG as React.FC<SVGProps<SVGSVGElement>>,
	report: ReportSVG as React.FC<SVGProps<SVGSVGElement>>,
	object: ObjectSVG as React.FC<SVGProps<SVGSVGElement>>,
	search: SearchSVG as React.FC<SVGProps<SVGSVGElement>>,
};

interface SVGIconProps extends SVGProps<SVGSVGElement> {
	name: IconName;
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
	const SVG = iconMap[name];
	return SVG ? <SVG key={name} {...rest} /> : null;
};

export default SVGIcon;
