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
	isCameraActive: boolean;
}

export interface ColorInfoProps {
	selectedColor: SeletedColor | undefined;
	parentLayout: ParentLayout;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setCameraType: Dispatch<SetStateAction<CameraPosition>>;
}

export interface CrossHairProps {
	extColor: ExtColor;
	parentLayout: ParentLayout;
}

export interface ExtColorModalProps {
	parentLayout: ParentLayout;
	extColor: ExtColor;
}
