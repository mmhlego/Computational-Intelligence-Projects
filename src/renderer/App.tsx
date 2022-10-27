import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { ProjectInfo } from './interfaces';
import Project1 from './pages/Project1';
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
			{CurrentProject ? ( // TODO
				<ProjectPage project={CurrentProject} />
			) : (
				<p>Home</p>
			)}
		</div>
	);
}
