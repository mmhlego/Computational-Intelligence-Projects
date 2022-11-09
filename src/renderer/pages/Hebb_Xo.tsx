/* eslint-disable react/button-has-type */
import { SymmetricalHardLimit } from 'main/model/ActivationFunctions';
import HebbNetwork from 'main/model/HebbNetwork';
import { useState } from 'react';
import PrimaryButton from 'renderer/components/PrimaryButton';
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

	return (
		<div className="flex flex-row gap-5 pb-6">
			<div className="w-1/2">
				<NetworkView
					network={hebbNetwork.CurrentNetwork}
					width={300}
					height={1000}
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
				<PrimaryButton
					text="Evaluate"
					onClick={EvaluateNetwork}
					className="mt-5"
				/>
				{/* </div>
			<div className=""> */}
				{/* <PrimaryButton
					text="Train"
					onClick={() => {
						XoData.forEach((d) => {
							hebbNetwork.Train(d);
						});
					}}
				/> */}
				Train Table
			</div>
			{/* <div className="col-span-2">
				<TrainDataTable
					TrainData={XoData}
					Labels={[]}
					TrainFunction={hebbNetwork.Train}
				/>
			</div> */}
		</div>
	);
}
