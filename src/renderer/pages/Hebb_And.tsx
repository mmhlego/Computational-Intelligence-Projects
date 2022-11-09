/* eslint-disable react/button-has-type */
import { SymmetricalHardLimit } from 'main/model/ActivationFunctions';
import HebbNetwork from 'main/model/HebbNetwork';
import NetworkData from 'main/model/NetworkData';
import { useState } from 'react';
import InputField from 'renderer/components/InputField';
import PrimaryButton from 'renderer/components/PrimaryButton';
import TrainDataTable from 'renderer/components/TrainDataTable';
import CartesianView from 'renderer/view/CartesianView';
import NetworkView from 'renderer/view/NetworkView';

export default function HebbAnd() {
	const [hebbNetwork, setHebbNetwork] = useState(
		new HebbNetwork(2, SymmetricalHardLimit)
	);
	const Labels: string[] = ['x1', 'x2', 'y'];
	const TrainData: NetworkData[] = [
		{
			Input: [1, 1],
			Output: [1],
		},
		{
			Input: [1, -1],
			Output: [-1],
		},
		{
			Input: [-1, 1],
			Output: [-1],
		},
		{
			Input: [-1, -1],
			Output: [-1],
		},
	];

	const ResetNetwork = () => {
		setHebbNetwork(new HebbNetwork(2, SymmetricalHardLimit));
	};

	const [x1, setX1] = useState(1);
	const [x2, setX2] = useState(1);

	const EvaluateNetwork = () => {
		hebbNetwork.Evaluate([x1, x2]);
	};

	return (
		<div className="grid grid-cols-2 gap-5 pb-6">
			<div className="row-span-2">
				<NetworkView
					network={hebbNetwork.CurrentNetwork}
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
						min={-1}
						className="w-1/4"
					/>

					<InputField
						label="x2"
						type="number"
						value={x2}
						setValue={(newVal: string) => setX2(Number(newVal))}
						placeholder="x1"
						max={+1}
						min={-1}
						className="w-1/4"
					/>

					<PrimaryButton
						text="Evaluate"
						onClick={EvaluateNetwork}
						className="w-1/4 max-h-[30px]"
					/>
				</div>
			</div>

			<div className="row-span-2 flex justify-center items-center">
				<CartesianView
					width={500}
					height={500}
					data={TrainData}
					network={hebbNetwork.CurrentNetwork}
				/>
			</div>

			<div className="col-span-2">
				<TrainDataTable
					TrainData={TrainData}
					Labels={Labels}
					TrainFunction={hebbNetwork.Train}
				/>
			</div>
		</div>
	);
}
