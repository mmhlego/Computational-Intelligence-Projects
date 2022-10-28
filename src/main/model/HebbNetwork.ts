import { ActivationFunctionType } from './ActivationFunctions';
import Network from './Network';
import NetworkData from './NetworkData';
import NetworkInterface from './NetworkInterface';

export default class HebbNetwork implements NetworkInterface {
	public CurrentNetwork: Network;

	constructor(input: number, activationFunction: ActivationFunctionType) {
		this.CurrentNetwork = new Network(
			[input, 1],
			activationFunction,
			activationFunction
		);
	}

	Train = (data: NetworkData) => {
		console.log('Training with', data);

		for (let i = 0; i < data.Input.length; i += 1) {
			this.CurrentNetwork.Neurons[0][i].SetValue(data.Input[i]);
		}

		this.CurrentNetwork.Neurons[1][0].SetValue(data.Output[0]);

		const inputNeurons = this.CurrentNetwork.Neurons[0].length;

		this.CurrentNetwork.Neurons[1][0].ConnectedEdges[0].AddWeight(
			data.Output[0]
		);
		for (let i = 0; i < inputNeurons; i += 1) {
			this.CurrentNetwork.Neurons[1][0].ConnectedEdges[i + 1].AddWeight(
				data.Input[i] * data.Output[0]
			);
		}
	};

	Evaluate = (data: number[]) => {
		this.CurrentNetwork.Evaluate(data);
	};
}
