/* eslint-disable import/prefer-default-export */
import p5Types from 'p5';

export const CreateHoverText = (
	p5: p5Types,
	x: number,
	y: number,
	width: number,
	height: number,
	parent: string,
	text: string
) => {
	const infoElement = p5.createDiv(text);
	infoElement.parent(parent);
	infoElement.position(x, y);
	infoElement.style(
		'padding:5px; background:#282c34; font-size:12px; border-radius:10px;'
	);

	infoElement.hide();
	const hoverElement = p5.createDiv();
	hoverElement.position(x - 10, y - 10);
	hoverElement.size(width, height);
	hoverElement.parent(parent);
	hoverElement.style('cursor: help;');
	hoverElement.mouseOver(() => infoElement.show());
	hoverElement.mouseOut(() => infoElement.hide());
};
