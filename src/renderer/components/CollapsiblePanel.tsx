/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export interface Props {
	Title: string;
	Closed?: boolean;
	children: React.ReactNode;
	className?: string;
}

export default function CollapsiblePanel({
	Title,
	Closed,
	children,
	className,
}: Props) {
	const [closed, setClosed] = useState<boolean>(Closed || false);
	const ToggleClose = () => setClosed((prev) => !prev);

	return (
		<div className={`w-full flex flex-col duration-300 ${className}`}>
			<div
				className="w-full flex justify-center items-center gap-2 py-3 rounded-md border-[#ffffff20] border-[1px] cursor-pointer"
				onClick={ToggleClose}
			>
				<h3>{Title}</h3>
				<MdOutlineKeyboardArrowDown
					className={`duration-300 ${
						closed ? 'scale-y-[-1]' : 'scale-y-1'
					}`}
				/>
			</div>
			<div
				className={`duration-500 ease-in-out overflow-hidden ${
					closed ? 'h-0' : `h-fit`
				}`}
			>
				{children}
			</div>
		</div>
	);
}
