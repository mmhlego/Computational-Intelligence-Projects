/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import NetworkData from 'main/model/NetworkData';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';

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
	const [trainedIndex, setTrainedIndex] = useState(-1);

	// eslint-disable-next-line promise/param-names
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	const TrainAll = async () => {
		for (let i = 0; i < TrainData.length; i += 1) {
			TrainFunction(TrainData[i]);
			setTrainedIndex(i);

			// eslint-disable-next-line no-await-in-loop
			await sleep(200);
		}
	};

	return (
		<div className="overflow-hidden rounded-md border-[#ffffff20] border-[1px]">
			<table className="min-w-full text-center">
				<thead className="border-b">
					<tr className="bg-[#ffffff10]">
						{['#', ...Labels].map((label, i) => (
							<th
								key={i}
								scope="col"
								className="text-md font-semibold px-6 py-4"
							>
								{label}
							</th>
						))}

						<th>
							<PrimaryButton
								text="Train All"
								onClick={TrainAll}
								className="w-2/3 max-h-[30px]"
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					{TrainData.map((data, index) => (
						<tr
							key={index}
							className={`border-b ease-in-out duration-200 ${
								trainedIndex === index ? 'bg-[#22c55e]' : ''
							}`}
						>
							<td
								key={index}
								className="px-6 py-4 whitespace-nowrap text-sm font-medium"
							>
								{index + 1}
							</td>

							{[...data.Input, ...data.Output].map((d, i) => (
								<td
									key={i}
									className="text-sm font-light px-6 py-4 whitespace-nowrap"
								>
									{d}
								</td>
							))}

							<td>
								<PrimaryButton
									text="Train"
									onClick={() => {
										setTrainedIndex(index);
										TrainFunction(data);
									}}
									className="w-2/3 max-h-[30px]"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
