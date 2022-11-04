import p5Types from 'p5';
import Sketch from 'react-p5';

interface Props {
	size: number;
	textSize: {
		min: number;
		max: number;
	};
	offsetX: number;
	offsetY: number;
	rotation: number;
	step: number;
	letter: string;
}

export default function LetterImageGenerator({
	size,
	textSize,
	offsetX,
	offsetY,
	rotation,
	step,
	letter,
}: Props) {
	const ToJson = (pixels: number[]) => {
		const vals: string[] = [];

		for (let i = 0; i < size; i += step) {
			for (let j = 0; j < size; j += step) {
				let mean = 0;
				// (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
				for (let k = 0; k < step; k += 1) {
					for (let q = 0; q < step; q += 1) {
						const index = ((i + k) * size + (j + q)) * 4;
						mean +=
							(pixels[index] +
								pixels[index + 1] +
								pixels[index + 2]) /
							3;
					}
				}
				// vals.push(mean >= 128 ? 0 : 1);
				mean /= step * step;
				vals.push(mean >= 128 ? ' ' : 'x');
			}
		}

		console.log(vals);
	};

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.pixelDensity(1);
		p5.createCanvas(size, size).parent(canvasParentRef);
		p5.textAlign('center', 'center');
		p5.textFont('Consolas');
	};

	const draw = (p5: p5Types) => {
		p5.background(255);
		p5.push();
		p5.translate(size / 2, size / 2);
		p5.translate(
			p5.random(-offsetX, offsetX),
			p5.random(-offsetY, offsetY)
		);
		p5.rotate((p5.random(-rotation, rotation) * p5.PI) / 180);
		p5.textSize(p5.random(textSize.min, textSize.max));
		p5.text(letter, 0, 0);
		p5.pop();
		p5.loadPixels();

		ToJson(p5.pixels);

		p5.noLoop();
	};

	return (
		<div className="relative h-[300px] w-[300px]">
			<div id="canvasHolder" className="scale-[2] absolute">
				<Sketch setup={setup} draw={draw} />
			</div>
		</div>
	);
}
