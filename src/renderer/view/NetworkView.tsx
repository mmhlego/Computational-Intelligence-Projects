/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
import { HardLimit } from 'main/model/ActivationFunctions';
import Edge from 'main/model/Edge';
import Network from 'main/model/Network';
import Neuron from 'main/model/Neuron';
import p5Types from 'p5';
import { useContext } from 'react';
import Sketch from 'react-p5';
import { MainContext } from 'renderer/MainContext';

interface Props {
	network: Network;
	width: number;
	height: number;
}

export default function NetworkView({ network, width, height }: Props) {
	const layerWidth = (width - 80) / (network.Size - 1);

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
		p5.text(edge.Weight.toFixed(2), x3, y3);
	};

	const drawEdges = (p5: p5Types) => {
		for (let i = 0; i < network.Size; i += 1) {
			const neurons = network.Neurons[i].length;
			const layerHeight =
				i !== network.Size - 1
					? height / (neurons + 1)
					: height / neurons;

			for (let j = 0; j < neurons; j += 1) {
				const x1 = i * layerWidth + 40;
				const y1 =
					j * layerHeight +
					layerHeight / 2 +
					(i !== network.Size - 1 ? layerHeight : 0);

				if (i > 0) {
					const x2 = (i - 1) * layerWidth + 40;
					const previousNeurons = network.Neurons[i - 1].length + 1;
					const previousLayerHeight = height / previousNeurons;

					drawEdge(
						p5,
						x1,
						y1,
						x2,
						previousLayerHeight / 2,
						network.Neurons[i][j].GetBias()
					);

					for (let k = 1; k < previousNeurons; k += 1) {
						const y2 =
							k * previousLayerHeight + previousLayerHeight / 2;
						drawEdge(
							p5,
							x1,
							y1,
							x2,
							y2,
							network.Neurons[i][j].GetEdge(k - 1)
						);
					}
				}
			}
		}
	};

	const drawNodes = (p5: p5Types) => {
		const BiasNode = new Neuron(HardLimit);
		BiasNode.SetValue(1);

		for (let i = 0; i < network.Size; i += 1) {
			const hasBias = i < network.Size - 1;
			const neurons = network.Neurons[i].length + (hasBias ? 1 : 0);
			const layerHeight = height / neurons;

			for (let j = 0; j < neurons; j += 1) {
				const x1 = i * layerWidth + 40;
				const y1 = j * layerHeight + layerHeight / 2;
				if (hasBias) {
					if (j === 0) {
						BiasNode.Draw(p5, x1, y1);
					} else {
						network.Neurons[i][j - (hasBias ? 1 : 0)].Draw(
							p5,
							x1,
							y1
						);
					}
				} else {
					network.Neurons[i][j - (hasBias ? 1 : 0)].Draw(p5, x1, y1);
				}
			}
		}
	};

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
		p5.textAlign('center', 'center');
	};

	const draw = (p5: p5Types) => {
		p5.clear();
		drawEdges(p5);
		drawNodes(p5);
	};

	const ctx = useContext(MainContext);

	return (
		<div id="canvasHolder" className="relative">
			<button
				onClick={() => {
					navigator.clipboard.writeText(
						JSON.stringify(network, null, 4)
					);
					ctx.alertHandler({
						description: 'Network copied to clipboard',
						type: 'success',
					});
				}}
				className="absolute right-1.5 top-1.5 cursor-pointer text-xs bg-[#40444D] py-1 px-3 rounded-md duration-300 hover:bg-[#555a66] outline-none border-[#4a4e59] border-[1px]"
			>
				Export
			</button>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
}
