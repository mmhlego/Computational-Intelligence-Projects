/* eslint-disable react/require-default-props */
import Network from 'main/model/Network';
import NetworkData from 'main/model/NetworkData';
import p5Types from 'p5';
import { useEffect, useState } from 'react';
import Sketch from 'react-p5';
import { MyP5 } from 'renderer/p5utils';

interface Props {
	width: number;
	height: number;
	data: NetworkData[];
	network: Network;
	theta?: number;
}

export default function CartesianView({
	width,
	height,
	data,
	network,
	theta,
}: Props) {
	// y = slope * x + cross
	const [slope, setSlope] = useState(Infinity);
	const [cross, setCross] = useState(Infinity);

	if (network.Size !== 2) return <p>Network size is invalid.</p>;
	if (network.Neurons[0].length !== 2)
		return <p>Input layer size is invalid.</p>;
	if (network.Neurons[1].length !== 1)
		return <p>Output layer size is invalid.</p>;
	if (data[0].Input.length !== 2) return <p>Data input size is invalid.</p>;
	if (data[0].Output.length !== 1) return <p>Data output size is invalid.</p>;

	const xRange = { from: data[0].Input[0] - 1, to: data[0].Input[0] + 1 };
	const yRange = { from: data[0].Input[1] - 1, to: data[0].Input[1] + 1 };

	data.forEach((d) => {
		xRange.from = Math.min(d.Input[0] - 1, xRange.from);
		xRange.to = Math.max(d.Input[0] + 1, xRange.to);

		yRange.from = Math.min(d.Input[1] - 1, yRange.from);
		yRange.to = Math.max(d.Input[1] + 1, yRange.to);
	});

	const widthUnit = width / (xRange.to - xRange.from);
	const heightUnit = height / (yRange.to - yRange.from);

	const updateGraph = () => {
		const b = network.Neurons[1][0].ConnectedEdges[0].Weight;
		const w1 = network.Neurons[1][0].ConnectedEdges[1].Weight;
		const w2 = network.Neurons[1][0].ConnectedEdges[2].Weight;
		// x2 = (-w1 / w2)*x1 + (-b / w2)

		if (w2 === 0 && w1 === 0) {
			setSlope(Infinity);
			setCross(Infinity);
			return;
		}

		if (w2 === 0) {
			setSlope(Infinity);
			setCross(-b / w1);
			return;
		}

		if (w1 === 0) {
			setSlope(0);
			setCross(-b / w2);
			return;
		}

		setSlope(-w1 / w2);
		setCross(-b / w2);
	};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		console.log(network);
	}, [network]);

	// let mP5: MyP5;

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
		p5.textAlign('center', 'center');
		p5.frameRate(5);

		// mP5 = new MyP5(p5, xRange, yRange, widthUnit, heightUnit);
	};

	const draw = (p5: p5Types) => {
		const mP5 = new MyP5(p5, xRange, yRange, widthUnit, heightUnit);

		updateGraph();

		p5.clear();
		mP5.DrawAxis();

		data.forEach((d) => {
			mP5.DrawPoint(
				d.Input[0],
				d.Input[1],
				String(d.Output[0]),
				d.Output[0] === -1
					? p5.color(250, 100, 50)
					: p5.color(100, 250, 50)
			);
		});

		if (cross !== Infinity) {
			mP5.DrawChart(slope, cross, p5.color(50, 250, 100));

			if (theta) {
				const w2 = network.Neurons[1][0].ConnectedEdges[2].Weight;
				mP5.DrawChart(
					slope,
					cross + theta / w2,
					p5.color(200, 150, 80)
				);
				mP5.DrawChart(
					slope,
					cross - theta / w2,
					p5.color(200, 150, 80)
				);
			}
		}

		console.log(slope, cross);
	};

	return (
		<div id="cartesianHolder" className="relative">
			<Sketch setup={setup} draw={draw} />
		</div>
	);
}
