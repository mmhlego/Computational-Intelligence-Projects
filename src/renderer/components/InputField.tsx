/* eslint-disable react/require-default-props */

interface Props {
	label?: string;
	type: string;
	value: number | string;
	setValue: (newVal: string) => void;
	placeholder: string;
	className?: string;
	max: number;
	min: number;
}

export default function InputField({
	label,
	type,
	value,
	setValue,
	placeholder,
	className,
	max,
	min,
}: Props) {
	return (
		<div
			className={`flex items-center h-[30px] bg-[#333741] rounded-md text-center border-[#ffffff20] border-[1px] ${className}`}
		>
			{label && <p className="min-w-fit w-1/2 mx-2">{`${label}`}</p>}
			<input
				value={value}
				onChange={(v) => setValue(v.target.value)}
				type={type}
				max={max}
				min={min}
				placeholder={placeholder}
				className="w-full h-full bg-[#40444D] rounded-md text-center outline-none border-[#29A9E1] focus:border-[0.5px]"
			/>
		</div>
	);
}
