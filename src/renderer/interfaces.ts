export type AlertTypes = 'warning' | 'success' | 'error' | 'info';
// this interface indicates the props which is used inside the components
export interface AlertInterface {
	type: AlertTypes;
	title: string;
	description: string;
	onClick: () => void;
}

const MenuItems: string[] = [
	'X/O Recognition - Perceptron Network - Single Output',
	'X/O Recognition - Perceptron Network - Dual Output',
];

export interface ProjectInfo {
	menuTitle: string;
	title: string;
	description: string;
	algorithm: string;
	input: string;
	output: string;
}

export const Projects: ProjectInfo[] = [
	{
		menuTitle: 'AND Gate - Hebb Network',
		title: 'AND Gate with Hebb network',
		description:
			'Simulation of the training process of AND gate neural network, implemented with hebb network.',
		algorithm: 'Hebb Algorithm',
		input: '2 Input nodes',
		output: '1 Output node',
	},
	{
		menuTitle: 'X/O Recognition - Hebb Network',
		title: 'X/O Character recognition with Hebb network',
		description:
			'Simulation of the training process of ---, implemented with hebb network.',
		algorithm: 'Hebb Algorithm',
		input: '25 Input nodes',
		output: '1 Output node',
	},
	{
		menuTitle: 'AND Gate - Perceptron Network',
		title: 'AND Gate with Perceptron network',
		description:
			'Simulation of the training process of AND gate neural network, implemented with perceptron network.',
		algorithm: 'Perceptron Algorithm',
		input: '2 Input nodes',
		output: '1 Output node',
	},
	{
		menuTitle: 'X/O Recognition - Perceptron Network - Single Output',
		title: 'X/O Character recognition with Perceptron network',
		description: '---',
		algorithm: 'Perceptron Algorithm',
		input: '25 Input nodes',
		output: '1 Output node',
	},
	{
		menuTitle: 'X/O Recognition - Perceptron Network - Dual Output',
		title: 'X/O Character recognition with Perceptron network',
		description: '---',
		algorithm: 'Perceptron Algorithm',
		input: '25 Input nodes',
		output: '2 Output nodes',
	},
];
