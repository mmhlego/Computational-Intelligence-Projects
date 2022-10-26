/* eslint-disable react/button-has-type */
import { ProjectInfo } from 'renderer/interfaces';

interface Props {
	project: ProjectInfo;
	onClick: () => void;
}

export default function Information({ project, onClick }: Props) {
	return (
		<div className="w-3/4 flex flex-col justify-center gap-6 items-center">
			<h1 className="text-4xl font-bold text-center">{project.title}</h1>
			<p>{project.description}</p>

			<div className="grid grid-cols-2 grid-rows-1 gap-4 text-center">
				<div className="border-slate-600 border-2 w-60">
					<p className="border-b-2 px-5 py-2 border-slate-600 font-bold text-lg">
						Input
					</p>
					<p className="p-5">{project.input}</p>
				</div>

				<div className="border-slate-600 border-2 w-60">
					<p className="border-b-2 px-5 py-2 border-slate-600 font-bold text-lg">
						Output
					</p>
					<p className="p-5">{project.output}</p>
				</div>
			</div>

			<button className="w-28 h-10 rounded-md bg-blue" onClick={onClick}>
				Begin
			</button>
		</div>
	);
}
