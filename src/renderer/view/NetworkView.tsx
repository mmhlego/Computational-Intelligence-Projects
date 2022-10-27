import Edge from 'main/model/Edge';
import Network from 'main/model/Network';
import p5Types from 'p5';
import Sketch from 'react-p5';

interface Props {
	network: Network;
	width: number;
	height: number;
}

export default function NetworkView({ network, width, height }: Props) {
	console.log(network);

	const drawEdge = (
		p5: p5Types,
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		edge: Edge
	) => {
		p5.stroke(200);
		p5.strokeWeight(1);
		p5.line(x1, y1, x2, y2);

		const textPos = 1 / 4;
		const x3 = x2 + (x1 - x2) * textPos;
		const y3 = y2 + (y1 - y2) * textPos;

		p5.fill(255);
		p5.stroke(51);
		p5.strokeWeight(2);
		p5.textSize(14);
		p5.text(edge.Weight, x3, y3);
	};

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
		p5.textAlign('center', 'center');

		const layerWidth = (width - 80) / (network.Size - 1);
		for (let i = 0; i < network.Size; i += 1) {
			const neurons = network.Neurons[i].length;
			const layerHeight = height / neurons;

			for (let j = 0; j < neurons; j += 1) {
				const x1 = i * layerWidth + 40;
				const y1 = j * layerHeight + layerHeight / 2;

				if (i > 0) {
					const previousNeurons = network.Neurons[i - 1].length;
					const previousLayerHeight = height / previousNeurons;

					for (let k = 0; k < previousNeurons; k += 1) {
						const x2 = (i - 1) * layerWidth + 40;
						const y2 =
							k * previousLayerHeight + previousLayerHeight / 2;
						drawEdge(
							p5,
							x1,
							y1,
							x2,
							y2,
							network.Neurons[i][j].GetEdge(k)
						);
					}
				}
			}
		}

		for (let i = 0; i < network.Size; i += 1) {
			const neurons = network.Neurons[i].length;
			const layerHeight = height / neurons;

			for (let j = 0; j < neurons; j += 1) {
				const x1 = i * layerWidth + 40;
				const y1 = j * layerHeight + layerHeight / 2;
				network.Neurons[i][j].Draw(p5, x1, y1);
			}
		}
	};

	const draw = (p5: p5Types) => {};

	return (
		<div id="canvasHolder" className="relative">
			<Sketch setup={setup} draw={draw} />
		</div>
	);
}
