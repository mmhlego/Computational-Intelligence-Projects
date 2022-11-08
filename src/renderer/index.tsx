import { createRoot } from 'react-dom/client';
import App from './App';
import { ContextProvider } from './MainContext';
import '../../node_modules/highlight.js/styles/atom-one-dark.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
	<ContextProvider>
		<App />
	</ContextProvider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
	// eslint-disable-next-line no-console
	console.log(arg);
});
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
