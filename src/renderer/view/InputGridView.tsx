/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { Dispatch, SetStateAction } from 'react';

interface Props {
	rows: number;
	cols: number;
	minVal: number;
	maxVal: number;
	vals: number[];
	setVals: Dispatch<SetStateAction<number[]>>;
}

export default function InputGridView({
	rows,
	cols,
	minVal,
	maxVal,
	vals,
	setVals,
}: Props) {
	const ToggleValue = (index: number) => {
		setVals((prev) =>
			prev.map((v, i) => {
				return i !== index ? v : v === minVal ? maxVal : minVal;
			})
		);
	};

	return (
		<div className="h-full w-full border-[1px] rounded-md">
			<table className="text-center h-full w-full">
				<tbody>
					{Array(rows)
						.fill(1)
						.map((_, indexI) => (
							<tr key={indexI}>
								{Array(cols)
									.fill(1)
									.map((__, indexJ) => (
										<td
											key={indexJ}
											className="border-[1px] border-slate-500"
										>
											<div
												className={`w-full h-full text-sm font-light ease-in-out duration-200 cursor-pointer ${
													vals[
														indexI * cols + indexJ
													] === maxVal
														? 'bg-green'
														: ''
												}`}
												onClick={() => {
													ToggleValue(
														indexI * cols + indexJ
													);
												}}
											/>
										</td>
									))}
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
