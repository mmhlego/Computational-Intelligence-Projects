/* eslint-disable import/no-cycle */
import DataGenerator from './pages/DataGenerator';
import HebbAnd from './pages/Hebb_And';
import HebbXo from './pages/Hebb_Xo';
import MLPThyroid from './pages/MLP_Thyroid';
import PerceptronAnd from './pages/Perceptron_And';
import PerceptronXo from './pages/Perceptron_Xo';
import PerceptronXo2 from './pages/Perceptron_Xo_D';

export type AlertTypes = 'warning' | 'success' | 'error' | 'info';
// this interface indicates the props which is used inside the components
export interface AlertInterface {
	type: AlertTypes;
	description: string;
	onClick?: () => void;
}

export interface ProjectInfo {
	menuTitle: string;
	title: string;
	description: string;
	algorithm?: string;
	input?: string;
	output?: string;
	children: React.ReactNode;
}

export const Projects: ProjectInfo[] = [
	{
		menuTitle: 'AND Gate - Hebb Network',
		title: 'AND Gate with Hebb network',
		description:
			"Simulation of the training process of AND gate neural network, implemented with hebb network. This network has 2 neurons as its input and a single neuron as its output which defines the AND value of the inputs. Input and output values are in 'Bipolar' form which can acquire on of the values -1 or +1.",
		algorithm: 'Hebb Algorithm',
		input: '2 Input neurons',
		output: '1 Output neuron',
		children: <HebbAnd />,
	},
	{
		menuTitle: 'X/O Recognition - Hebb Network',
		title: 'X/O Character recognition with Hebb network',
		description:
			"Simulation of the training process of X/O character recognition network, implemented with hebb network. This network gets a 5x5 bipolar image as its input and determines which character it more similar to, 'X' or 'O'. Input and output values are in 'Bipolar' form which means they can acquire on of the values -1 or +1. Also the output of +1 describes the character 'X' and the  output -1 describes the character 'O'.",
		algorithm: 'Hebb Algorithm',
		input: '25 Input neurons',
		output: '1 Output neuron',
		children: <HebbXo />,
	},
	{
		menuTitle: 'AND Gate - Perceptron Network',
		title: 'AND Gate with Perceptron network',
		description:
			'Simulation of the training process of AND gate neural network, implemented with perceptron network.', // TODO Complete the description
		algorithm: 'Perceptron Algorithm',
		input: '2 Input nodes',
		output: '1 Output node',
		children: <PerceptronAnd />,
	},
	{
		menuTitle: 'X/O Recognition - Perceptron Network - Single Output',
		title: 'X/O Character recognition with Perceptron network',
		description: '---', // TODO Complete the description
		algorithm: 'Perceptron Algorithm',
		input: '25 Input nodes',
		output: '1 Output node',
		children: <PerceptronXo />,
	},
	{
		menuTitle: 'X/O Recognition - Perceptron Network - Dual Output',
		title: 'X/O Character recognition with Perceptron network',
		description: '---', // TODO Complete the description
		algorithm: 'Perceptron Algorithm',
		input: '25 Input nodes',
		output: '2 Output nodes',
		children: <PerceptronXo2 />,
	},
	// {
	// 	menuTitle: 'Thyroid Detection - MLP Network',
	// 	title: 'Thyroid detection using multilayer perceptron network.',
	// 	description: '---', // TODO Complete the description
	// 	algorithm: 'Multilayer Perceptron Algorithm',
	// 	input: '?',
	// 	output: '1 Output node',
	// 	children: <MLPThyroid />,
	// },
	{
		menuTitle: 'Data Generator',
		title: 'Neural Network Data Generator',
		description:
			'A simple tool to generate custom data for your neural network.', // TODO Complete the description
		children: <DataGenerator />,
	},
];
