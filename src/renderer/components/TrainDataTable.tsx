import NetworkData from 'main/model/NetworkData';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import Table from './Table';

interface Props {
	TrainData: NetworkData[];
	Labels: string[];
	TrainFunction: (data: NetworkData) => void;
}

export default function TrainDataTable({
	TrainData,
	Labels,
	TrainFunction,
}: Props) {
	const [trainedIndexes, setTrainedIndexes] = useState(-1);

	// eslint-disable-next-line promise/param-names
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	const TrainAll = async () => {
		for (let i = 0; i < TrainData.length; i += 1) {
			TrainFunction(TrainData[i]);
			setTrainedIndexes(i);

			// eslint-disable-next-line no-await-in-loop
			await sleep(200);
		}
	};

	const TrainTable = TrainData.map((data, index) => {
		return [
			...data.Input,
			...data.Output,
			<PrimaryButton
				text="Train"
				onClick={() => {
					setTrainedIndexes(index);
					TrainFunction(data);
				}}
				className="w-2/3 max-h-[30px]"
			/>,
		];
	});

	return (
		<>
			<Table
				Labels={[
					...Labels,
					<PrimaryButton
						text="Train All"
						onClick={TrainAll}
						className="w-2/3 max-h-[30px]"
					/>,
				]}
				AllData={TrainTable}
				SelectedIndexes={[trainedIndexes]}
			/>
		</>
	);
}
