import { ProjectInfo, Projects } from 'renderer/interfaces';
import MenuItem from './MenuItem';

interface Props {
	selectedProject: ProjectInfo | undefined;
	onItemClicked: (project: ProjectInfo) => void;
}

export default function Sidebar({ selectedProject, onItemClicked }: Props) {
	return (
		<div className="w-1/4 h-screen p-2">
			<div className="w-full h-full rounded-xl border-[1px] border-[#ffffff18] bg-[#282c34] box-border p-1.5 shadow-[#ffffff10] shadow-md">
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
		</div>
	);
}
