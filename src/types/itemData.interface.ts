export interface ItemDatatypes {
	[key: string]: ItemDatatypes[] | any;
	id: string;
	category: string;
	svg: JSX.Element;
	color?: string;
	canvasHeight: number;
	canvasWidth: number;
	canvasX: number;
	canvasY: number;
	zIndex: number;
	isDefault?: boolean;
	isVisible?: boolean;
}

export interface RenderItemProps {
	item: ItemDatatypes;
}
