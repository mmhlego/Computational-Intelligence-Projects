/* eslint-disable import/no-cycle */
import { AndDataBinary, AndDataBipolar } from 'main/data/And';
import NetworkData from 'main/model/NetworkData';
import PerceptronNetwork from 'main/model/PerceptronNetwork';
import { useEffect, useState } from 'react';
import CollapsiblePanel from 'renderer/components/CollapsiblePanel';
import InputField from 'renderer/components/InputField';
import PrimaryButton from 'renderer/components/PrimaryButton';
import TrainDataTable from 'renderer/components/TrainDataTable';
import CartesianView from 'renderer/view/CartesianView';
import NetworkView from 'renderer/view/NetworkView';

export default function PerceptronAnd() {
	const [learningRate, setLearningRate] = useState(1);
	const [theta, setTheta] = useState(0.5);
	const Labels: string[] = ['x1', 'x2', 'y'];
	const TrainData: NetworkData[] = AndDataBinary;

	const [perceptronNetwork, setPerceptronNetwork] = useState(
		new PerceptronNetwork(2, 1, learningRate, theta)
	);

	const ResetNetwork = () => {
		setPerceptronNetwork(new PerceptronNetwork(2, 1, learningRate, theta));
	};

	const [x1, setX1] = useState(1);
	const [x2, setX2] = useState(1);

	const EvaluateNetwork = () => {
		perceptronNetwork.Evaluate([x1, x2]);
	};

	useEffect(() => {
		perceptronNetwork.Theta = theta;
		perceptronNetwork.LearningRate = learningRate;
		console.log(1);
	}, [theta, learningRate, perceptronNetwork]);

	return (
		<div className="grid grid-cols-2 gap-5 pb-6">
			<div className="row-span-2">
				<NetworkView
					network={perceptronNetwork.CurrentNetwork}
					width={500}
					height={500}
				/>
				<PrimaryButton text="Reset network" onClick={ResetNetwork} />

				<div className="pt-5 flex justify-between">
					<InputField
						label="x1"
						type="number"
						value={x1}
						setValue={(newVal: string) => setX1(Number(newVal))}
						placeholder="x1"
						max={+1}
						min={0}
						className="w-1/4"
					/>

					<InputField
						label="x2"
						type="number"
						value={x2}
						setValue={(newVal: string) => setX2(Number(newVal))}
						placeholder="x1"
						max={+1}
						min={0}
						className="w-1/4"
					/>

					<PrimaryButton
						text="Evaluate"
						onClick={EvaluateNetwork}
						className="w-1/4 max-h-[30px]"
					/>
				</div>

				<div className="pt-5 flex justify-evenly">
					<InputField
						label="alpha"
						type="number"
						value={learningRate}
						setValue={(newVal: string) =>
							setLearningRate(Number(newVal))
						}
						placeholder="x1"
						max={+1}
						min={0}
						className="w-1/3"
					/>

					<InputField
						label="theta"
						type="number"
						value={theta}
						setValue={(newVal: string) => setTheta(Number(newVal))}
						placeholder="x1"
						max={+10}
						min={0}
						className="w-1/3"
					/>
				</div>
			</div>

			<div className="row-span-2 flex justify-center items-center">
				<CartesianView
					width={500}
					height={500}
					data={TrainData}
					network={perceptronNetwork.CurrentNetwork}
					theta={theta}
				/>
			</div>

			<div className="col-span-2">
				<CollapsiblePanel Title="Train Data Table" Closed>
					<TrainDataTable
						TrainData={TrainData}
						Labels={Labels}
						TrainFunction={perceptronNetwork.Train}
					/>
				</CollapsiblePanel>
			</div>
		</div>
	);
}
