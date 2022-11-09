/* eslint-disable react/button-has-type */
import { SymmetricalHardLimit } from 'main/model/ActivationFunctions';
import HebbNetwork from 'main/model/HebbNetwork';
import { useState } from 'react';
import PrimaryButton from 'renderer/components/PrimaryButton';
import InputGridView from 'renderer/view/InputGridView';
import NetworkView from 'renderer/view/NetworkView';

export default function Project2() {
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
		<div className="grid grid-cols-2 gap-5 pb-6">
			<div className="row-span-2">
				<NetworkView
					network={hebbNetwork.CurrentNetwork}
					width={300}
					height={1000}
				/>
			</div>

			<div className="row-span-1">
				<div className="row-span-1 aspect-square">
					<p className="mb-2">Custom Input:</p>
					<InputGridView
						rows={5}
						cols={5}
						minVal={-1}
						maxVal={1}
						vals={vals}
						setVals={setVals}
					/>

					<PrimaryButton text="Evaluate" onClick={EvaluateNetwork} />
				</div>

				<div className="row-span-1 border-2">
					{/* <LetterImageGenerator
						size={5}
						density={1}
						textSize={{
							min: 15,
							max: 15,
						}}
						offsetX={0}
						offsetY={0}
						rotation={10}
						letter="x"
						count={5}
						dataOutput={[+1]}
						setAllData={(allData:)}
					/> */}
					Data
				</div>

				{/* <div className="col-span-2">
				<TrainDataTable
				TrainData={TrainData}
				Labels={Labels}
				TrainFunction={hebbNetwork.Train}
				/>
			</div> */}
			</div>
		</div>
	);
}
