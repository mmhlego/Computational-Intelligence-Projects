import { createContext, useState } from 'react';
import { AlertInterface } from 'renderer/interfaces';

// interface of context of whole application
interface Context {
	alert: AlertInterface | null;
	alertHandler: (newAlert: AlertInterface | null) => void;
}
// props interface for accepting the child components
interface Props {
	children: JSX.Element[] | JSX.Element;
}

// creating main context with default values
export const MainContext = createContext<Context>({
	alert: null,
	alertHandler: () => {},
});

// creating context provider for wrapping HOC
export const ContextProvider = ({ children }: Props) => {
	const [alert, setAlert] = useState<AlertInterface | null>(null);
	const alertHandler = (newAlert: AlertInterface | null) => {
		setAlert(newAlert);
	};

	const ctx = {
		alert,
		alertHandler,
	};
	return <MainContext.Provider value={ctx}>{children}</MainContext.Provider>;
};
