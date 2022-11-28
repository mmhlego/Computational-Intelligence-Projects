/* eslint-disable import/no-cycle */
import { SigmoidBipolar } from 'main/model/ActivationFunctions';
import MLPNetwork from 'main/model/MLPNetwork';
import NetworkData from 'main/model/NetworkData';
import { useEffect, useState } from 'react';
import CollapsiblePanel from 'renderer/components/CollapsiblePanel';
import InputField from 'renderer/components/InputField';
import PrimaryButton from 'renderer/components/PrimaryButton';
import TrainController from 'renderer/components/TrainController';
import NetworkView from 'renderer/view/NetworkView';

export default function MLPThyroid() {
	const [learningRate, setLearningRate] = useState(0.2);
	const [reset, setReset] = useState(true);
	const [mlpNetwork, setMlpNetwork] = useState(
		new MLPNetwork([3, 2, 2], SigmoidBipolar, learningRate)
	);

	const ResetNetwork = () => {
		setReset((prev) => !prev);
		setMlpNetwork(new MLPNetwork([3, 2, 2], SigmoidBipolar, learningRate));
	};

	const trainData: NetworkData = {
		Input: [-1, 1, 1],
		Output: [-1, 1],
	};

	useEffect(() => {
		mlpNetwork.LearningRate = learningRate;
	}, [learningRate, mlpNetwork]);

	return (
		<div className="grid grid-cols-2 gap-5 pb-6">
			<div className="col-span-2 row-span-2">
				<NetworkView
					network={mlpNetwork.CurrentNetwork}
					width={800}
					height={500}
				/>
			</div>

			<div className="flex justify-center">
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
					className="w-1/4 h-[35px]"
				/>
			</div>

			<PrimaryButton text="Reset network" onClick={ResetNetwork} />

			<div className="col-span-2 row-span-2">
				<CollapsiblePanel Title="Train Data Table" Closed>
					<TrainController
						TrainData={[trainData]}
						ValidateData={[trainData]}
						Network={mlpNetwork}
						Reset={reset}
						className="grid-cols-3"
						DelayBetweenEpochs={false}
					/>
				</CollapsiblePanel>
			</div>
		</div>
	);
}
