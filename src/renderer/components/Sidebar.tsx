import { ProjectInfo, Projects } from 'renderer/interfaces';
import MenuItem from './MenuItem';

interface Props {
	selectedProject: ProjectInfo | undefined;
	onItemClicked: (project: ProjectInfo) => void;
}

export default function Sidebar({ selectedProject, onItemClicked }: Props) {
	return (
		<div className="w-1/4 h-screen shadow-white-md bg-[#282c34] box-border p-2">
			{Projects.map((item) => (
				<MenuItem
					key={item.menuTitle}
					selected={selectedProject === item}
					project={item}
					onClick={() => {
						onItemClicked(item);
					}}
				/>
			))}
		</div>
	);
}
