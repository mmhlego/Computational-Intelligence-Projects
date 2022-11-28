/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-continue */
import P5Types from 'p5';

export interface P5Point {
	x: number;
	y: number;
}

export interface P5Range {
	from: number;
	to: number;
}

export class MyP5 {
	private p5: P5Types;

	private color: P5Types.Color;

	private xRange: P5Range;

	private yRange: P5Range;

	private widthUnit: number;

	private heightUnit: number;

	constructor(p5: P5Types, xr: P5Range, yr: P5Range, wu: number, hu: number) {
		this.p5 = p5;
		this.color = p5.color(255, 255, 255);
		this.xRange = xr;
		this.yRange = yr;
		this.widthUnit = wu;
		this.heightUnit = hu;
	}

	private GetPos = (x: number, y: number): P5Point => {
		return {
			x: (x - this.xRange.from) * this.widthUnit,
			y: (this.yRange.to - y) * this.heightUnit,
		};
	};

	DrawLine = (
		p1: P5Point,
		p2: P5Point,
		color: P5Types.Color = this.color
	) => {
		this._DrawLine(this.GetPos(p1.x, p1.y), this.GetPos(p2.x, p2.y), color);
	};

	private _DrawLine = (
		p1: P5Point,
		p2: P5Point,
		color: P5Types.Color = this.color
	) => {
		this.p5.stroke(color);
		this.p5.strokeWeight(1);
		this.p5.line(p1.x, p1.y, p2.x, p2.y);
	};

	DrawArrow = (from: P5Point, to: P5Point) => {
		this._DrawLine(from, to);
		const angle = this.p5.atan2(from.y - to.y, from.x - to.x);
		const size = 6;

		this.p5.fill(this.color);
		this.p5.stroke(this.color);
		this.p5.push();
		this.p5.translate(to.x, to.y);
		this.p5.rotate(angle);
		this.p5.triangle(0, 0, size, -0.8 * size, size, 0.8 * size);
		this.p5.pop();
	};

	DrawAxis = () => {
		this.DrawArrow(
			this.GetPos(this.xRange.from, 0),
			this.GetPos(this.xRange.to, 0)
		);
		this.DrawArrow(
			this.GetPos(0, this.yRange.from),
			this.GetPos(0, this.yRange.to)
		);

		this.p5.textAlign('center');
		this.p5.fill(this.color);
		this.p5.stroke(this.color);
		this.p5.strokeWeight(1);

		for (let i = this.xRange.from + 1; i < this.xRange.to; i += 1) {
			if (i === 0) continue;
			this._DrawLine(this.GetPos(i, 0.02), this.GetPos(i, -0.02));
			const p = this.GetPos(i, -0.1);
			this.p5.text(String(i), p.x, p.y);
		}

		for (let i = this.yRange.from + 1; i < this.yRange.to; i += 1) {
			if (i === 0) continue;
			this._DrawLine(this.GetPos(0.02, i), this.GetPos(-0.02, i));
			const p = this.GetPos(0.08, i);
			this.p5.text(String(i), p.x, p.y);
		}
	};

	DrawChart = (
		slope: number,
		cross: number,
		color: P5Types.Color = this.color
	) => {
		// y = slope * x + cross

		if (slope === Infinity) return;

		const getY = (x: number) => x * slope + cross;

		this.DrawLine(
			{
				x: this.xRange.from,
				y: getY(this.xRange.from),
			},
			{
				x: this.xRange.to,
				y: getY(this.xRange.to),
			},
			color
		);
	};

	DrawPoint = (
		x: number,
		y: number,
		text = '',
		color: P5Types.Color = this.color
	) => {
		const pos = this.GetPos(x, y);

		this.p5.fill(color);
		this.p5.stroke(color);
		this.p5.strokeWeight(1);
		this.p5.ellipse(pos.x, pos.y, 15);

		this.p5.fill(51);
		this.p5.stroke(51);
		this.p5.textAlign('center');
		this.p5.text(text, pos.x, pos.y);
	};
}

export const CreateHoverText = (
	p5: P5Types,
	x: number,
	y: number,
	width: number,
	height: number,
	parent: string,
	text: string
) => {
	const infoElement = p5.createDiv();
	infoElement.parent(parent);
	infoElement.position(x, y);
	infoElement.style(
		'padding:5px; background:#282c34; font-size:12px; border-radius:10px; word-wrap: break-word; display:flex: flex-direction:col;'
	);

	const lines = text.split('\n');
	for (const t of lines) {
		p5.createP(t).parent(infoElement);
	}

	infoElement.hide();
	const hoverElement = p5.createDiv();
	hoverElement.position(x - width / 2, y - height / 2);
	hoverElement.size(width, height);
	hoverElement.parent(parent);
	hoverElement.style('cursor: help;');
	hoverElement.mouseOver(() => infoElement.show());
	hoverElement.mouseOut(() => infoElement.hide());
};
