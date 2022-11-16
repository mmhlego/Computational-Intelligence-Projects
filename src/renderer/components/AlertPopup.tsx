/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { AlertInterface } from 'renderer/interfaces';
import { MdClose } from 'react-icons/md';
import { BiError, BiCheckCircle, BiInfoCircle } from 'react-icons/bi';
import { RiCloseCircleLine } from 'react-icons/ri';

interface Props {
	Alert: AlertInterface | null;
	Visible: boolean;
	Close: () => void;
}

export default function AlertPopup({ Alert, Visible, Close }: Props) {
	const GetIcon = (type: 'warning' | 'success' | 'error' | 'info') => {
		if (type === 'error')
			return <RiCloseCircleLine color="#ef5154" size={20} />;
		if (type === 'warning') return <BiError color="#ed8c31" size={20} />;
		if (type === 'success')
			return <BiCheckCircle color="#1a9e70" size={20} />;
		return <BiInfoCircle color="#0b8dff" size={20} />;
	};

	return (
		<div
			className={`absolute right-1/2 top-4 z-50 translate-x-1/2 w-80 min-h-[50px] p-3 cursor-pointer rounded-xl transition-all duration-300 bg-[#282b33] shadow-[0_0_10px_-2px_rgba(150,150,150,0.5)] hover:shadow-[0_0_15px_0px_rgba(150,150,150,0.6)] ${
				Visible ? '' : 'translate-y-[-150%]'
			} flex flex-row gap-2 items-center`}
			onClick={() => {
				if (Alert?.onClick) Alert.onClick();
				Close();
			}}
		>
			<MdClose
				className="absolute top-1 right-1"
				color="#ffffff80"
				size={14}
			/>
			{Alert && GetIcon(Alert.type)}
			<div className="flex items-center w-4/5">
				{Alert && (
					<p className="text-sm font-light">{Alert.description}</p>
				)}
			</div>
		</div>
	);
}
