/* eslint-disable react/button-has-type */
import PrimaryButton from 'renderer/components/PrimaryButton';
import { ProjectInfo } from 'renderer/interfaces';

interface Props {
	project: ProjectInfo;
	onClick: () => void;
}

export default function Information({ project, onClick }: Props) {
	return (
		<div className="w-3/4 flex flex-col justify-center gap-6 items-center">
			<h1 className="text-4xl">{project.title}</h1>
			<p className="text-center">{project.description}</p>

			<div className="grid grid-rows-1 grid-flow-col gap-4 text-center">
				{project.input && (
					<div className="border-slate-600 border-2 w-60">
						<p className="border-b-2 px-5 py-2 border-slate-600 font-bold text-lg">
							Input
						</p>
						<p className="p-5">{project.input}</p>
					</div>
				)}

				{project.output && (
					<div className="border-slate-600 border-2 w-60">
						<p className="border-b-2 px-5 py-2 border-slate-600 font-bold text-lg">
							Output
						</p>
						<p className="p-5">{project.output}</p>
					</div>
				)}
			</div>

			<PrimaryButton
				text="Begin"
				onClick={onClick}
				className="w-28 h-10 text-[16px] border-blue"
			/>
		</div>
	);
}
