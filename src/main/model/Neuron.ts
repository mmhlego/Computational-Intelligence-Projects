import { ActivationFunctionType } from './ActivationFunctions';
import Edge from './Edge';

export default class Neuron {
	// The output value of the neuron
	public Value: number = 0;

	// w_0 w_1 ... w_n
	// w_0 represents the bias value and the others represent the weight between the weight between the current and the ith neuron on the previous layer
	private ConnectedEdges: Edge[] = [];

	// Neurons activation function
	private ActivationFunction: ActivationFunctionType;

	// Constructor
	constructor(
		activationFunction: ActivationFunctionType,
		connectedNeurons = 0
	) {
		if (connectedNeurons < 0)
			throw new Error(
				`Number of connected neurons must be greater or equal to zero. (found ${connectedNeurons})`
			);

		this.ActivationFunction = activationFunction;

		if (connectedNeurons > 0) {
			for (let i = 0; i < connectedNeurons + 1; i += 1) {
				this.ConnectedEdges.push(new Edge());
			}
		}
	}

	Activate = (neurons: Neuron[]) => {
		if (neurons.length + 1 !== this.ConnectedEdges.length)
			throw new Error(
				`Invalid layer size. (required: ${
					this.ConnectedEdges.length - 1
				},found: ${neurons.length})`
			);

		let sum = 1 * this.ConnectedEdges[0].Weight;

		for (let i = 0; i < neurons.length; i += 1) {
			sum += neurons[i].Value * this.ConnectedEdges[i + 1].Weight;
		}

		this.Value = this.ActivationFunction(sum);
	};

	SetValue = (value: number) => {
		this.Value = value;
	};
}
