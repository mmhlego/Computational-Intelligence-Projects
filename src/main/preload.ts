import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = string;

contextBridge.exposeInMainWorld('electron', {
	ipcRenderer: {
		sendMessage(channel: Channels, args: unknown[]) {
			ipcRenderer.send(channel, args);
		},
		on(channel: Channels, func: (...args: unknown[]) => void) {
			const subscription = (
				_event: IpcRendererEvent,
				...args: unknown[]
			) => func(...args);
			ipcRenderer.on(channel, subscription);

			return () => ipcRenderer.removeListener(channel, subscription);
		},
		once(channel: Channels, func: (...args: unknown[]) => void) {
			ipcRenderer.once(channel, (_event, ...args) => func(...args));
		},
		invoke(channel: Channels, args: unknown[], func: (arg: any) => void) {
			ipcRenderer
				.invoke(channel, args)
				.then(func)
				.catch((e) => console.log(e));
		},
	},
});
