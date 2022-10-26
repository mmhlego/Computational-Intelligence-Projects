/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { ProjectInfo } from 'renderer/interfaces';

interface Props {
	selected: boolean;
	project: ProjectInfo;
	onClick: () => void;
}

export default function MenuItem({ selected, project, onClick }: Props) {
	// const navigate = useNavigate();

	return (
		<div
			className={`mr-4 w-full min-h-fit rounded-md mb-2 text-sm text-center bg-${
				selected ? 'blue' : '[#404754]'
			} flex justify-center cursor-pointer hover:bg-blue ease duration-300`}
			onClick={onClick}
		>
			<p className="px-2 my-3">{project.menuTitle}</p>
		</div>
	);
}
