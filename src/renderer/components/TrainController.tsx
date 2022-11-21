/* eslint-disable react/require-default-props */
import NetworkData from 'main/model/NetworkData';
import NetworkInterface from 'main/model/NetworkInterface';
import { useEffect, useState } from 'react';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';
import Table from './Table';

interface Props {
	// MaxTime: number;
	ValidateData: NetworkData[];
	TrainData: NetworkData[];
	Network: NetworkInterface;
	Reset: boolean;
	DelayBetweenEpochs?: boolean;
	className?: string;
}

export default function TrainController({
	ValidateData,
	TrainData,
	Network,
	Reset,
	DelayBetweenEpochs = true,
	className,
}: Props) {
	const [currentEpoch, setCurrentEpoch] = useState(0);
	const [currentChange, setCurrentChange] = useState(0);
	const [currentAccuracy, setCurrentAccuracy] = useState(0);
	const [started, setStarted] = useState(false);

	const [maxEpochs, setMaxEpochs] = useState(10);
	const [maxValueChange, setMaxValueChange] = useState(0.5);
	const [minAccuracy, setMinAccuracy] = useState(0.95);

	const [trainedIndex, setTrainedIndex] = useState(-1);

	useEffect(() => {
		setCurrentEpoch(0);
		setCurrentChange(0);
		setCurrentAccuracy(0);
	}, [Reset]);

	// eslint-disable-next-line promise/param-names
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	const TrainAll = async () => {
		setStarted(true);

		for (let epoch = currentEpoch + 1; epoch <= maxEpochs; epoch += 1) {
			if (epoch > maxEpochs) break;

			let maxChange = 0;
			let accuracy = 0;

			for (let i = 0; i < TrainData.length; i += 1) {
				const change = Network.Train(TrainData[i]);
				setTrainedIndex(i);

				maxChange = Math.max(maxChange, change);
			}

			for (let i = 0; i < ValidateData.length; i += 1) {
				Network.Evaluate(ValidateData[i].Input);
				const output: number[] = Network.CurrentNetwork.Neurons[
					Network.CurrentNetwork.Size - 1
				].map((n) => n.Value);

				if (
					JSON.stringify(output) ===
					JSON.stringify(ValidateData[i].Output)
				) {
					accuracy += 1;
				}
				console.log(output, ValidateData[i].Output);
			}
			accuracy = (accuracy * 100) / ValidateData.length;

			setCurrentEpoch(epoch);
			setCurrentChange(maxChange);
			setCurrentAccuracy(accuracy);

			if (maxChange < maxValueChange) {
				break;
			}

			if (accuracy / 100 >= minAccuracy) {
				break;
			}

			if (DelayBetweenEpochs) {
				// eslint-disable-next-line no-await-in-loop
				await sleep(200);
			}
		}

		setStarted(false);
	};

	return (
		<>
			<div className="my-3 rounded-md border-[#ffffff20] border-[1px]">
				<div className={`w-full grid gap-3 p-3 ${className}`}>
					<InputField
						label="Max Epochs"
						type="number"
						value={maxEpochs}
						setValue={(newVal: string) =>
							setMaxEpochs(Number(newVal))
						}
						placeholder=""
						max={100}
						min={1}
						className="w-full text-sm"
					/>
					<InputField
						label="Accuracy"
						type="number"
						value={minAccuracy}
						setValue={(newVal: string) =>
							setMinAccuracy(Number(newVal))
						}
						placeholder=""
						max={1}
						min={0}
						className="w-full text-sm"
					/>
					<InputField
						label="Max Change"
						type="number"
						value={maxValueChange}
						setValue={(newVal: string) =>
							setMaxValueChange(Number(newVal))
						}
						placeholder=""
						max={5}
						min={1}
						className="w-full text-sm"
					/>
					{/* Max Time //TODO */}
					<PrimaryButton
						text="Start Training"
						onClick={TrainAll}
						className="max-h-[30px] col-span-3"
					/>
				</div>

				<div className="w-full px-3 pb-3 grid grid-cols-3 text-center text-sm">
					<p
						className={`duration-300 ${
							started ? 'text-white' : 'text-[#ffffff50]'
						}`}
					>
						Current Epochs: {currentEpoch}
					</p>
					<p
						className={`duration-300 ${
							started ? 'text-white' : 'text-[#ffffff50]'
						}`}
					>
						Current Accuracy: {currentAccuracy.toFixed(0)}%
					</p>
					<p
						className={`duration-300 ${
							started ? 'text-white' : 'text-[#ffffff50]'
						}`}
					>
						Max Δw: {currentChange}
					</p>
				</div>
			</div>

			<Table
				Labels={['Input', 'Output']}
				AllData={TrainData.map((data) => [
					`Array(${data.Input.length})`,
					data.Output.join(', '),
				])}
				SelectedIndexes={[trainedIndex]}
			/>
		</>
	);
}
