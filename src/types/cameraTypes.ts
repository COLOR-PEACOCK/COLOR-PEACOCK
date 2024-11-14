import { Dispatch, SetStateAction } from 'react';
import { CameraPosition } from 'react-native-vision-camera';

export interface ExtColor {
	bgColor: string;
	hexColor: string;
	engName: string;
	korName: string;
}

export interface ParentLayout {
	height: number;
	width: number;
}

export interface SeletedColor {
	rgb: string;
	hex: string;
	engName: string;
	korName: string;
}

export interface CameraRenderProps {
	extColor: (color: ExtColor) => void;
	cameraType: CameraPosition;
	zoomLevel?: number;
	isActive: boolean;
}

export interface ColorInfoProps {
	selectedColor: SeletedColor | undefined;
	parentlayout: ParentLayout;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setCameraType: Dispatch<SetStateAction<CameraPosition>>;
}

export interface CrossHairProps {
	extColor: ExtColor;
	parentlayout: ParentLayout;
}

export interface ExtColorModalProps {
	parentlayout: ParentLayout;
	extColor: ExtColor;
}
