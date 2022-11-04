import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { ProjectInfo } from './interfaces';
import ProjectPage from './pages/ProjectPage';

export default function App() {
	const [CurrentProject, setCurrentProject] = useState<ProjectInfo>();

	const setProject = (newProject: ProjectInfo) => {
		setCurrentProject(newProject);
	};

	return (
		<div className="w-screen h-screen flex flex-row bg-[#333741] overflow-hidden">
			<Sidebar
				onItemClicked={setProject}
				selectedProject={CurrentProject}
			/>
			{CurrentProject ? (
				<ProjectPage project={CurrentProject} />
			) : (
				<div className="w-3/4 h-full flex justify-center items-center">
					<p>Home</p>
				</div>
			)}
		</div>
	);
}
