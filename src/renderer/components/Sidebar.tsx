import { ProjectInfo, Projects } from 'renderer/interfaces';
import Home from 'renderer/pages/Home';
import MenuItem from './MenuItem';

interface Props {
	selectedProject: ProjectInfo | undefined;
	onItemClicked: (project: ProjectInfo | undefined) => void;
}

export default function Sidebar({ selectedProject, onItemClicked }: Props) {
	return (
		<div className="w-1/4 h-screen p-2">
			<div className="w-full h-full rounded-xl border-[1px] border-[#ffffff18] bg-[#282c34] box-border p-1.5 shadow-[#ffffff10] shadow-md">
				<MenuItem
					selected={selectedProject === undefined}
					project={{
						menuTitle: 'Home',
						title: 'Home',
						description: '',
						children: <Home setCurrentProject={onItemClicked} />,
					}}
					onClick={() => {
						onItemClicked(undefined);
					}}
				/>
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
