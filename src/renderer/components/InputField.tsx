/* eslint-disable react/require-default-props */

interface Props {
	type: string;
	value: number | string;
	setValue: (newVal: string) => void;
	placeholder: string;
	className?: string;
	max: number;
	min: number;
}

export default function InputField({
	type,
	value,
	setValue,
	placeholder,
	className,
	max,
	min,
}: Props) {
	return (
		<>
			<input
				value={value}
				onChange={(v) => setValue(v.target.value)}
				type={type}
				max={max}
				min={min}
				placeholder={placeholder}
				className={`w-full bg-[#ffffff10] rounded-md text-center border-[#ffffff40] border-[1px] h-[30px] outline-none ${className}`}
			/>
		</>
	);
}
