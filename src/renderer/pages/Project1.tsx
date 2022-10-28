/* eslint-disable react/button-has-type */
import { SymmetricalHardLimit } from 'main/model/ActivationFunctions';
import HebbNetwork from 'main/model/HebbNetwork';
import NetworkData from 'main/model/NetworkData';
import { useState } from 'react';
import TrainDataTable from 'renderer/components/TrainDataTable';
import NetworkView from 'renderer/view/NetworkView';

export default function Project1() {
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
			Input: [-1, 1],
			Output: [-1],
		},
		{
			Input: [1, -1],
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

	const [x1, setX1] = useState(0);
	const [x2, setX2] = useState(0);

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
				<button
					className="w-full h-[30px] rounded-md text-sm bg-blue cursor-pointer hover:bg-transparent ease duration-200 border-lightBlue border-[1px]"
					onClick={ResetNetwork}
				>
					Reset Network
				</button>

				<div className="pt-5 flex justify-between">
					<input
						value={x1}
						onChange={(v) => setX1(Number(v.target.value))}
						type="number"
						max={1}
						min={-1}
						placeholder="x1"
						className="w-1/4 bg-[#ffffff10] rounded-md text-center border-[#ffffff40] border-[1px] h-[30px]"
					/>

					<input
						value={x2}
						onChange={(v) => setX2(Number(v.target.value))}
						type="number"
						max={1}
						min={-1}
						placeholder="x2"
						className="w-1/4 bg-[#ffffff10] rounded-md text-center border-[#ffffff40] border-[1px] h-[30px]"
					/>

					<button
						className="w-1/4 h-[30px] rounded-md text-sm bg-blue cursor-pointer hover:bg-transparent ease duration-200 border-lightBlue border-[1px]"
						onClick={EvaluateNetwork}
					>
						Evaluate
					</button>
				</div>
			</div>

			<div className="row-span-2 border-lightBlue border-[1px] rounded-md">
				Graph
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
