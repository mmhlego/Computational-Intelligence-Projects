import { useContext, useEffect, useState } from 'react';
import './App.css';
import AlertPopup from './components/AlertPopup';
import Sidebar from './components/Sidebar';
import { ProjectInfo } from './interfaces';
import { MainContext } from './MainContext';
import ProjectPage from './pages/ProjectPage';

export default function App() {
	const [CurrentProject, setCurrentProject] = useState<ProjectInfo>();
	const [alertVisible, setAlertVisible] = useState(false);

	const setProject = (newProject: ProjectInfo) => {
		setCurrentProject(newProject);
	};

	const ctx = useContext(MainContext);

	useEffect(() => {
		if (ctx.alert) {
			setAlertVisible(true);

			setTimeout(() => {
				setAlertVisible(false);
			}, 5000);
		}
	}, [ctx.alert]);

	return (
		<div className="w-screen h-screen flex flex-row bg-[#333741] overflow-hidden relative">
			<AlertPopup
				Alert={ctx.alert}
				Visible={alertVisible}
				Close={() => setAlertVisible(false)}
			/>

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
