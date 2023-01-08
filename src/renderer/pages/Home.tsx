import PrimaryButton from 'renderer/components/PrimaryButton';
import Table from 'renderer/components/Table';
import { ProjectInfo, Projects } from 'renderer/interfaces';

interface Props {
	setCurrentProject: (pi: ProjectInfo) => void;
}

export default function Home({ setCurrentProject }: Props) {
	return (
		<div className="w-2/3 h-full flex flex-col items-center justify-center gap-4 text-center">
			<h1>Computational Intelligence Projects</h1>
			<h3 className="italic underline">By Mohammad Mahdi Hejazi</h3>
			<p className="">
				This application contains a set of projects related to
				&quot;Computational Intelligence&quot; lesson presented by{' '}
				<a
					href="https://scholar.google.com/citations?user=_xA7MDwAAAAJ&hl=en"
					className="text-blue whitespace-nowrap"
				>
					Dr Koohestani
				</a>{' '}
				in{' '}
				<a
					href="https://tabrizu.ac.ir/"
					className="text-blue whitespace-nowrap"
				>
					University of Tabriz
				</a>
				.
			</p>

			<p>List of available projects:</p>
			<Table
				Labels={['Project Name', 'Network Type', '']}
				AllData={[
					[
						'AND Gate',
						'Hebb Network',
						<PrimaryButton
							text="Go to Project"
							onClick={() => setCurrentProject(Projects[0])}
							className="px-3"
						/>,
					],
					[
						'X/O Recognition',
						'Hebb Network',
						<PrimaryButton
							text="Go to Project"
							onClick={() => setCurrentProject(Projects[1])}
							className="px-3"
						/>,
					],
					[
						'AND Gate',
						'Perceptron Network',
						<PrimaryButton
							text="Go to Project"
							onClick={() => setCurrentProject(Projects[2])}
							className="px-3"
						/>,
					],
					[
						'X/O Recognition - Single Output',
						'Perceptron Network',
						<PrimaryButton
							text="Go to Project"
							onClick={() => setCurrentProject(Projects[3])}
							className="px-3"
						/>,
					],
					[
						'X/O Recognition - Dual Output',
						'Perceptron Network',
						<PrimaryButton
							text="Go to Project"
							onClick={() => setCurrentProject(Projects[4])}
							className="px-3"
						/>,
					],
					[
						'Data Generator',
						'-',
						<PrimaryButton
							text="Go to Project"
							onClick={() => setCurrentProject(Projects[5])}
							className="px-3"
						/>,
					],
				]}
				SelectedIndexes={[]}
			/>
		</div>
	);
}
