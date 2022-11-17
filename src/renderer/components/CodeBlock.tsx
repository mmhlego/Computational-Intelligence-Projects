/* eslint-disable react/button-has-type */
import Highlight from 'react-highlight';

interface Props {
	language: string;
	text: string;
}

export default function CodeBlock({ language, text }: Props) {
	return (
		<div className="w-full h-fit relative rounded-lg overflow-hidden">
			<button
				onClick={() => {
					navigator.clipboard.writeText(text);
				}}
				className="absolute right-1.5 top-1.5 cursor-pointer text-sm bg-[#40444D] py-1 px-3 rounded-md duration-300 hover:bg-[#555a66] outline-none border-[#4a4e59] border-[1px]"
			>
				Copy
			</button>
			<Highlight className={language}>{text}</Highlight>
		</div>
	);
}
