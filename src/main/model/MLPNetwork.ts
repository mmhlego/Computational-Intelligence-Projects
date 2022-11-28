import { GetDerivativeFunction } from 'renderer/utils';
import { ActivationFunctionType } from './ActivationFunctions';
import Network from './Network';
import NetworkData from './NetworkData';
import NetworkInterface from './NetworkInterface';

export default class MLPNetwork implements NetworkInterface {
	public CurrentNetwork: Network;

	public LearningRate: number;

	public DerivativeFunction: ActivationFunctionType;

	constructor(
		neurons: number[],
		activationFunction: ActivationFunctionType,
		learningRate: number
	) {
		if (!GetDerivativeFunction(activationFunction)) {
			throw new Error('Activation function does not have derivative');
		}

		this.DerivativeFunction = GetDerivativeFunction(activationFunction)!;

		this.CurrentNetwork = new Network(
			neurons,
			activationFunction,
			activationFunction,
			'random'
		);

		this.LearningRate = learningRate;
	}

	Train = (data: NetworkData) => {
		let MaxChanged = 0;

		this.Evaluate(data.Input);

		const layers = this.CurrentNetwork.Size;
		let currentDelta: number[] = [];
		let newDelta: number[] = [];

		for (let i = 0; i < data.Output.length; i += 1) {
			const target = data.Output[i];
			const output = this.CurrentNetwork.Neurons[layers - 1][i].Value;
			const ni = this.CurrentNetwork.Neurons[layers - 1][i].NetInput;

			currentDelta.push((target - output) * this.DerivativeFunction(ni));
		}

		for (let layer = layers - 1; layer > 0; layer -= 1) {
			const currentSize = this.CurrentNetwork.Neurons[layer].length;
			const rearSize = this.CurrentNetwork.Neurons[layer - 1].length;

			newDelta = Array(rearSize).fill(0);

			for (let k = 0; k < currentSize; k += 1) {
				const delta = currentDelta[k];
				const db = this.LearningRate * delta;

				this.CurrentNetwork.Neurons[layer][
					k
				].ConnectedEdges[0].AddWeight(db);

				MaxChanged = Math.max(MaxChanged, db);

				for (let j = 0; j < rearSize; j += 1) {
					const zj = this.CurrentNetwork.Neurons[layer - 1][j].Value;

					const dw = this.LearningRate * delta * zj;
					this.CurrentNetwork.Neurons[layer][k].ConnectedEdges[
						j + 1
					].AddWeight(dw);

					MaxChanged = Math.max(MaxChanged, dw);

					const wj =
						this.CurrentNetwork.Neurons[layer][k].ConnectedEdges[
							j + 1
						].Weight;
					newDelta[j] += delta * wj;
				}

				for (let j = 0; j < rearSize; j += 1) {
					const ni =
						this.CurrentNetwork.Neurons[layer - 1][j].NetInput;
					newDelta[j] *= this.DerivativeFunction(ni);
				}
			}

			currentDelta = newDelta;
		}

		return MaxChanged;
	};

	Evaluate = (data: number[]) => {
		this.CurrentNetwork.Evaluate(data);
	};
}
