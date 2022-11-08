/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */

interface Props {
	text: string;
	onClick: () => void;
	className?: string;
}

export default function PrimaryButton({ text, onClick, className }: Props) {
	return (
		<button
			className={`w-full h-[35px] rounded-md text-sm bg-blue cursor-pointer hover:bg-transparent ease duration-200 border-lightBlue border-[1px] ${className}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
}
