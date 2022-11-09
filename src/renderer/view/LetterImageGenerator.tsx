import NetworkData from 'main/model/NetworkData';
import p5Types from 'p5';
import Sketch from 'react-p5';

interface Props {
	size: number;
	density: number;
	textSize: {
		min: number;
		max: number;
	};
	offsetX: number;
	offsetY: number;
	rotation: number;
	letter: string;
	count: number;
	dataOutput: number[];
	setAllData: (allData: NetworkData[]) => void;
	enabled: boolean;
	disable: () => void;
}

export default function LetterImageGenerator({
	size,
	textSize,
	offsetX,
	offsetY,
	rotation,
	density,
	letter,
	count,
	dataOutput,
	setAllData,
	enabled,
	disable,
}: Props) {
	const AllData: NetworkData[] = [];

	console.log('started', enabled);

	const ToJson = (pixels: number[]) => {
		const data: NetworkData = {
			Input: [],
			Output: dataOutput,
		};

		for (let i = 0; i < size; i += density) {
			for (let j = 0; j < size; j += density) {
				let mean = 0;
				// (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
				for (let k = 0; k < density; k += 1) {
					for (let q = 0; q < density; q += 1) {
						const index = ((i + k) * size + (j + q)) * 4;
						mean +=
							(pixels[index] +
								pixels[index + 1] +
								pixels[index + 2]) /
							3;
					}
				}

				mean /= density * density;
				// vals.push(mean >= 128 ? '⬜' : '⬛');
				data.Input.push(mean >= 128 ? 0 : 1);
			}
		}

		AllData.push(data);
	};

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.pixelDensity(1);
		p5.createCanvas(size, size).parent(canvasParentRef);
		p5.textAlign('center', 'center');
		p5.textFont('Consolas');
		p5.frameRate(count > 5 ? 5 : 2);
	};

	let currentCount = 0;

	const draw = (p5: p5Types) => {
		if (!enabled) {
			currentCount = 0;
			return;
		}

		currentCount += 1;
		console.log('count', currentCount, count);
		if (currentCount > count) {
			// window.electron.ipcRenderer.invoke('sample', [AllData], () => {});
			currentCount = 0;
			setAllData(AllData);
			console.log('disable pls');
			disable();
			return;
		}

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
	};

	return (
		<div className="relative h-full w-full flex justify-center items-center">
			<div id="canvasHolder" className="absolute">
				<Sketch setup={setup} draw={draw} />
			</div>
		</div>
	);
}
