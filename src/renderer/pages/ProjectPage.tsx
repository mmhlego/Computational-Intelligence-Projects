import { useEffect, useState } from 'react';
import { ProjectInfo } from 'renderer/interfaces';
import Information from './Information';

interface Props {
	project: ProjectInfo;
}

export default function ProjectPage({ project }: Props) {
	const [Info, setInfo] = useState<boolean>(true);

	useEffect(() => setInfo(true), [project]);

	return (
		<div className="w-3/4 h-screen flex flex-col justify-center gap-6 items-center overflow-y-auto ">
			{Info ? (
				<Information project={project} onClick={() => setInfo(false)} />
			) : (
				<div className="min-h-screen w-full p-6">
					{project.children}
				</div>
			)}
		</div>
	);
}
