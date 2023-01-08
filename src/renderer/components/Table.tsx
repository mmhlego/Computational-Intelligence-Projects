/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
interface Props {
	Labels: any[];
	AllData: any[][];
	SelectedIndexes: number[];
	className?: string;
}

export default function Table({
	AllData,
	Labels,
	SelectedIndexes,
	className,
}: Props) {
	return (
		<div
			className={`overflow-hidden rounded-md border-[#ffffff20] border-[1px] ${className}`}
		>
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
					</tr>
				</thead>
				<tbody>
					{AllData.map((rowData, index) => (
						<tr
							key={index}
							className={`border-b ease-in-out duration-200 last:border-b-0 ${
								SelectedIndexes?.includes(index)
									? 'bg-[#22c55e]'
									: ''
							}`}
						>
							<td
								key={index}
								className="px-6 py-4 whitespace-nowrap text-sm font-medium"
							>
								{index + 1}
							</td>

							{rowData.map((d, i) => (
								<td
									key={i}
									className="text-sm font-light px-6 py-4 whitespace-nowrap"
								>
									{d}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
