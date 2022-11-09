/* eslint-disable react/button-has-type */
import { XoData } from 'main/data/Xo_1';
import { SymmetricalHardLimit } from 'main/model/ActivationFunctions';
import HebbNetwork from 'main/model/HebbNetwork';
import { useState } from 'react';
import PrimaryButton from 'renderer/components/PrimaryButton';
import Table from 'renderer/components/Table';
import InputGridView from 'renderer/view/InputGridView';
import NetworkView from 'renderer/view/NetworkView';

export default function HebbXo() {
	const [vals, setVals] = useState<number[]>(Array(5 * 5).fill(-1));

	const [hebbNetwork, setHebbNetwork] = useState(
		new HebbNetwork(25, SymmetricalHardLimit)
	);

	const ResetNetwork = () => {
		setHebbNetwork(new HebbNetwork(25, SymmetricalHardLimit));
	};

	const EvaluateNetwork = () => {
		hebbNetwork.Evaluate(vals);
	};

	const [trainedIndex, setTrainedIndex] = useState(-1);

	// eslint-disable-next-line promise/param-names
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	const TrainAll = async () => {
		for (let i = 0; i < XoData.length; i += 1) {
			hebbNetwork.Train(XoData[i]);
			setTrainedIndex(i);

			// eslint-disable-next-line no-await-in-loop
			await sleep(70);
		}
	};

	return (
		<div className="flex flex-row gap-5 pb-6">
			<div className="w-1/2">
				<NetworkView
					network={hebbNetwork.CurrentNetwork}
					width={500}
					height={1200}
				/>
			</div>
			<div className="w-1/2">
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
					<PrimaryButton text="Evaluate" onClick={EvaluateNetwork} />

					<PrimaryButton
						text="Clear Board"
						onClick={() => setVals(Array(25).fill(-1))}
					/>
				</div>

				<PrimaryButton
					text="Reset Network"
					onClick={ResetNetwork}
					className="mb-5"
				/>

				<Table
					Labels={[
						'Input',
						'Output',
						<PrimaryButton
							text="Train All"
							onClick={TrainAll}
							className="max-h-[30px]"
						/>,
					]}
					AllData={XoData.map((data, index) => [
						data.Input,
						data.Output[0] === -1 ? 'O' : 'X',
						<PrimaryButton
							text="Train"
							onClick={() => {
								setTrainedIndex(index);
								hebbNetwork.Train(data);
							}}
							className="max-h-[30px]"
						/>,
					])}
					SelectedIndexes={[trainedIndex]}
				/>
			</div>
		</div>
	);
}
