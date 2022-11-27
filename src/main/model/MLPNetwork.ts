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
			// 'random' // TODO
			0 // TODO
		);

		this.LearningRate = learningRate;
	}

	Train = (data: NetworkData) => {
		// const MaxChanged = 0;

		this.Evaluate(data.Input);

		const layers = this.CurrentNetwork.Size;
		let currentDelta: number[] = [];
		let newDelta: number[] = [];

		for (let i = 0; i < data.Output.length; i += 1) {
			const target = data.Output[i];
			const output = this.CurrentNetwork.Neurons[layers - 1][i].Value;
			const ni = this.CurrentNetwork.Neurons[layers - 1][i].Value;

			currentDelta.push((target - output) * this.DerivativeFunction(ni));
		}

		for (let layer = layers - 1; layer > 0; layer -= 1) {
			console.log('Current Delta', currentDelta);

			const currentSize = this.CurrentNetwork.Neurons[layer].length;
			const rearSize = this.CurrentNetwork.Neurons[layer - 1].length;

			currentDelta = [...newDelta];
			newDelta = Array(rearSize).fill(0);

			console.log('New Delta', newDelta);

			for (let k = 1; k < currentSize; k += 1) {
				const delta = currentDelta[k];

				this.CurrentNetwork.Neurons[layer][
					k
				].ConnectedEdges[0].AddWeight(this.LearningRate * delta);

				for (let j = 0; j < rearSize; j += 1) {
					const zj = this.CurrentNetwork.Neurons[layer - 1][j].Value;
					const wj =
						this.CurrentNetwork.Neurons[layer][k].ConnectedEdges[
							j + 1
						].Weight;

					this.CurrentNetwork.Neurons[layer][k].ConnectedEdges[
						j + 1
					].AddWeight(this.LearningRate * delta * zj);

					newDelta[j] += delta * wj;
				}
			}

			console.log('New Delta', newDelta);
		}

		// TODO

		// return MaxChanged;
		return 0;
	};

	Evaluate = (data: number[]) => {
		this.CurrentNetwork.Evaluate(data);
	};
}
