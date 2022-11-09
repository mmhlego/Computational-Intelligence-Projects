interface Props {
	type: 'vertical' | 'horizontal';
	size: 'full' | 'fit' | 'screen';
}

export default function Divider({ type, size }: Props) {
	return (
		<hr
			className={`bg-white ${
				type === 'vertical' ? 'w-[1px] h-' : 'h-[1px] w-'
			}${size}`}
		/>
	);
}
