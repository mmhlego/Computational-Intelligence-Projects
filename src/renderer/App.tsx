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
		<div className="w-full h-full flex flex-row bg-[#333741]">
			<Sidebar
				onItemClicked={setProject}
				selectedProject={CurrentProject}
			/>
			{!!CurrentProject && <ProjectPage project={CurrentProject} />}
			{/* <Router>
				<Routes>
					<Route path="/" element={<p>Right</p>} />

					<Route path="/project" element={<p>Project</p>} />

					<Route path="/and-hebb" element={<p>and-hebb</p>} />

					<Route path="/xo-hebb" element={<p>xo-hebb</p>} />

					<Route
						path="/and-perceptron"
						element={<p>and-perceptron</p>}
					/>

					<Route
						path="/and-perceptron-dual"
						element={<p>and-perceptron-dual</p>}
					/>

					<Route
						path="/xo-perceptron-dual"
						element={<p>axo-perceptron-dual</p>}
					/>
				</Routes>
			</Router> */}
		</div>
	);
}
