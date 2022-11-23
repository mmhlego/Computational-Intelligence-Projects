import { ActivationFunctionType } from './ActivationFunctions';
import Network from './Network';
import NetworkData from './NetworkData';
import NetworkInterface from './NetworkInterface';

export default class MLPNetwork implements NetworkInterface {
	public CurrentNetwork: Network;

	public LearningRate: number;

	constructor(
		neurons: number[],
		activationFunction: ActivationFunctionType,
		learningRate: number,
		defaultEdgeValue: number | 'random' = 'random'
	) {
		this.CurrentNetwork = new Network(
			neurons,
			activationFunction,
			activationFunction,
			defaultEdgeValue
		);
		this.LearningRate = learningRate;
	}

	Train = (data: NetworkData) => {
		const MaxChanged = 0;

		const inputNeurons = this.CurrentNetwork.Neurons[0].length;
		const outputNeurons = this.CurrentNetwork.Neurons[1].length;

		// TODO

		return MaxChanged;
	};

	Evaluate = (data: number[]) => {
		this.CurrentNetwork.Evaluate(data);
	};
}
