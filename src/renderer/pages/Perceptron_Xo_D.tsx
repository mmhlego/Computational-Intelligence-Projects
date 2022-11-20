/* eslint-disable import/no-cycle */
import { XoData } from 'main/data/Xo';
import NetworkData from 'main/model/NetworkData';
import PerceptronNetwork from 'main/model/PerceptronNetwork';
import { useEffect, useState } from 'react';
import CollapsiblePanel from 'renderer/components/CollapsiblePanel';
import InputField from 'renderer/components/InputField';
import PrimaryButton from 'renderer/components/PrimaryButton';
import Toggle from 'renderer/components/Toggle';
import TrainController from 'renderer/components/TrainController';
import shuffleArray from 'renderer/utils';
import InputGridView from 'renderer/view/InputGridView';
import NetworkView from 'renderer/view/NetworkView';

export default function PerceptronXo2() {
	const [vals, setVals] = useState<number[]>(Array(5 * 5).fill(-1));
	const [trainData, setTrainData] = useState<NetworkData[]>([]);
	const [learningRate, setLearningRate] = useState(0.04);
	const [theta, setTheta] = useState(0.5);
	const [reset, setReset] = useState(true);
	const [edgeValue, setEdgeValue] = useState<0 | 'random'>(0);

	const [perceptronNetwork, setPerceptronNetwork] = useState(
		new PerceptronNetwork(25, 2, learningRate, theta, edgeValue)
	);

	const ResetNetwork = () => {
		setReset((prev) => !prev);
		setPerceptronNetwork(
			new PerceptronNetwork(25, 2, learningRate, theta, edgeValue)
		);
	};

	useEffect(() => {
		perceptronNetwork.Theta = theta;
		perceptronNetwork.LearningRate = learningRate;
	}, [theta, learningRate, perceptronNetwork]);

	useEffect(() => {
		const shuffled: NetworkData[] = shuffleArray(XoData);
		setTrainData(
			shuffled.map((data) => {
				return {
					Input: data.Input,
					Output: data.Output[0] === 1 ? [1, -1] : [-1, 1],
				};
			})
		);
	}, []);

	return (
		<div className="flex flex-row gap-5 pb-6">
			<div className="w-1/2">
				<NetworkView
					network={perceptronNetwork.CurrentNetwork}
					width={400}
					height={1500}
				/>
			</div>
			<div className="w-3/5">
				<div className="aspect-square">
					<p className="mb-2">Custom Input:</p>
					<InputGridView
						rows={5}
						cols={5}
						minVal={-1}
						maxVal={1}
						vals={vals}
						setVals={setVals}
					/>
				</div>

				<div className="my-5 flex flex-row gap-5">
					<PrimaryButton
						text="Evaluate"
						onClick={() => {
							perceptronNetwork.Evaluate(vals);
						}}
					/>

					<PrimaryButton
						text="Clear Board"
						onClick={() => setVals(Array(25).fill(-1))}
					/>
				</div>

				<div className="pb-5 flex justify-between">
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
						className="w-1/4"
					/>

					<InputField
						label="theta"
						type="number"
						value={theta}
						setValue={(newVal: string) => setTheta(Number(newVal))}
						placeholder="x1"
						max={+10}
						min={0}
						className="w-1/4"
					/>

					<Toggle
						LeftVal="Zero"
						RightVal="Random"
						onLeft={() => setEdgeValue(0)}
						onRight={() => setEdgeValue('random')}
						className="w-1/4"
					/>
				</div>

				<PrimaryButton
					text="Reset Network"
					onClick={ResetNetwork}
					className="mb-5"
				/>

				<CollapsiblePanel Title="Train Data Table" Closed>
					<TrainController
						TrainData={trainData}
						ValidateData={trainData}
						Network={perceptronNetwork}
						Reset={reset}
						className="grid-cols-3"
					/>
				</CollapsiblePanel>
			</div>
		</div>
	);
}
