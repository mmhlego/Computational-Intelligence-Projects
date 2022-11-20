import { Linear } from './ActivationFunctions';
import Network from './Network';
import NetworkData from './NetworkData';
import NetworkInterface from './NetworkInterface';

export default class PerceptronNetwork implements NetworkInterface {
	public CurrentNetwork: Network;

	public LearningRate: number;

	public Theta: number;

	constructor(
		inputNeurons: number,
		outputNeurons: number,
		learningRate: number,
		theta: number,
		defaultEdgeValue: number | 'random' = 'random'
	) {
		this.CurrentNetwork = new Network(
			[inputNeurons, outputNeurons],
			Linear,
			Linear,
			defaultEdgeValue
		);
		this.LearningRate = learningRate;
		this.Theta = theta;
	}

	Train = (data: NetworkData) => {
		let MaxChanged = 0;

		this.Evaluate(data.Input);

		const inputNeurons = this.CurrentNetwork.Neurons[0].length;
		const outputNeurons = this.CurrentNetwork.Neurons[1].length;

		for (let i = 0; i < outputNeurons; i += 1) {
			// Check if output is not desired
			if (this.CurrentNetwork.Neurons[1][i].Value !== data.Output[i]) {
				// Update bias
				const db = this.LearningRate * data.Output[i];
				this.CurrentNetwork.Neurons[1][i].ConnectedEdges[0].AddWeight(
					db
				);

				MaxChanged = Math.max(MaxChanged, Math.abs(db));

				// Update other connected edges
				for (let j = 0; j < inputNeurons; j += 1) {
					const dw =
						this.LearningRate *
						data.Output[i] *
						this.CurrentNetwork.Neurons[0][j].Value;

					this.CurrentNetwork.Neurons[1][i].ConnectedEdges[
						j + 1
					].AddWeight(dw);

					MaxChanged = Math.max(MaxChanged, Math.abs(dw));
				}
			}
		}

		return MaxChanged;
	};

	Evaluate = (data: number[]) => {
		this.CurrentNetwork.Evaluate(data);

		const outputNeurons = this.CurrentNetwork.Neurons[1].length;

		for (let i = 0; i < outputNeurons; i += 1) {
			const sum = this.CurrentNetwork.Neurons[1][i].Value;

			if (sum > this.Theta) {
				this.CurrentNetwork.Neurons[1][i].SetValue(1);
			} else if (sum >= -this.Theta) {
				this.CurrentNetwork.Neurons[1][i].SetValue(0);
			} else {
				this.CurrentNetwork.Neurons[1][i].SetValue(-1);
			}
		}
	};
}
