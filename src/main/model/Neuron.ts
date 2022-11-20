import p5Types from 'p5';
import { ActivationFunctionType } from './ActivationFunctions';
import Edge from './Edge';

export default class Neuron {
	// The output value of the neuron
	public Value: number = 0;

	// w_0 w_1 ... w_n
	// w_0 represents the bias value and the others represent the weight between the weight between the current and the ith neuron on the previous layer
	public ConnectedEdges: Edge[] = [];

	// Neurons activation function
	private ActivationFunction: ActivationFunctionType;

	private IsActive: boolean = false;

	// Constructor
	constructor(
		activationFunction: ActivationFunctionType,
		connectedNeurons = 0,
		defaultEdgeValue: number | 'random' = 0
	) {
		if (connectedNeurons < 0)
			throw new Error(
				`Number of connected neurons must be greater or equal to zero. (found ${connectedNeurons})`
			);

		this.ActivationFunction = activationFunction;

		if (connectedNeurons > 0) {
			for (let i = 0; i < connectedNeurons + 1; i += 1) {
				this.ConnectedEdges.push(new Edge(defaultEdgeValue));
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

		this.IsActive = true;

		let sum = 1 * this.ConnectedEdges[0].Weight;

		for (let i = 0; i < neurons.length; i += 1) {
			sum += neurons[i].Value * this.ConnectedEdges[i + 1].Weight;
		}

		this.Value = this.ActivationFunction(sum);
	};

	SetValue = (value: number) => {
		this.Value = value;
		this.SetActive(true);
	};

	SetActive = (active: boolean) => {
		this.IsActive = active;
	};

	GetEdge = (node: number) => {
		return this.ConnectedEdges[1 + node];
	};

	GetBias = () => {
		return this.ConnectedEdges[0];
	};

	Draw = (p5: p5Types, x: number, y: number) => {
		// CreateHoverText(p5, x, y, 20, 20, '#canvasHolder', JSON.stringify(this));

		p5.fill(255);
		p5.stroke(255);
		p5.ellipse(x, y, 30);

		p5.fill(50);
		p5.stroke(255);
		p5.textSize(20);
		p5.text(this.IsActive ? this.Value : '', x, y);
	};
}
