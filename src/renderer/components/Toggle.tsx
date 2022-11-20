/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import { useState } from 'react';

interface Props {
	LeftVal: string;
	RightVal: string;
	onLeft: () => void;
	onRight: () => void;
	className?: string;
}

export default function Toggle({
	LeftVal,
	RightVal,
	onLeft,
	onRight,
	className,
}: Props) {
	const [leftSelected, setLeftSelected] = useState(true);

	const ToggleValue = () => {
		setLeftSelected((prev) => {
			if (prev) onRight();
			if (!prev) onLeft();
			return !prev;
		});
	};

	return (
		<div
			className={`h-[30px] w-fit bg-[#333741] rounded-md text-center border-[#626977] border-[1px] relative cursor-pointer ${className}`}
			onClick={ToggleValue}
		>
			<div
				className={`w-1/2 h-full bg-blue rounded-md absolute duration-500 top-0 ${
					leftSelected ? 'left-0' : 'left-1/2'
				}`}
			/>

			<div className="h-full w-fit grid grid-cols-2 grid-row-1 gap-3 px-2 items-center text-sm">
				<p className="col-span-1 z-10">{LeftVal}</p>
				<p className="col-span-1 z-10 drop-shadow-[0_35px_35px_rgb(255,255,255)]">
					{RightVal}
				</p>
			</div>
		</div>
	);
}
