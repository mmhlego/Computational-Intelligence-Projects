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
		<div className="w-3/4 flex flex-col justify-center gap-6 items-center">
			{Info ? (
				<Information project={project} onClick={() => setInfo(false)} />
			) : (
				project.children
			)}
		</div>
	);
}
