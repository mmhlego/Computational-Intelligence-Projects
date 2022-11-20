/* eslint-disable max-classes-per-file */
import { ActivationFunctionType } from './ActivationFunctions';
import Neuron from './Neuron';

export default class Network {
	public Neurons: Neuron[][] = [];

	public Size: number = 0;

	constructor(
		neurons: number[],
		hiddenActivationFunction: ActivationFunctionType,
		outputActivationFunction: ActivationFunctionType,
		defaultEdgeValue: number | 'random' = 0
	) {
		this.Size = neurons.length;

		if (this.Size <= 0) throw new Error('Network size is invalid.');

		for (let i = 0; i < this.Size; i += 1) {
			const layerSize = neurons[i];
			const layer: Neuron[] = [];

			if (layerSize <= 0)
				throw new Error(
					`Layer size is invalid. (layer: ${i}, value: ${layerSize})`
				);

			const pastLayerNodes = i === 0 ? 0 : neurons[i - 1];
			for (let j = 0; j < layerSize; j += 1) {
				layer.push(
					new Neuron(
						i === this.Size - 1
							? outputActivationFunction
							: hiddenActivationFunction,
						pastLayerNodes,
						defaultEdgeValue
					)
				);
			}

			this.Neurons.push(layer);
		}
	}

	public ClearValues = () => {
		for (let i = 0; i < this.Size; i += 1) {
			for (let j = 0; j < this.Neurons[i].length; j += 1) {
				this.Neurons[i][j].SetActive(false);
			}
		}
	};

	Evaluate = (data: number[]) => {
		for (let i = 0; i < data.length; i += 1) {
			this.Neurons[0][i].SetValue(data[i]);
		}

		for (let layer = 1; layer < this.Size; layer += 1) {
			for (let i = 0; i < this.Neurons[layer].length; i += 1) {
				this.Neurons[layer][i].Activate(this.Neurons[layer - 1]);
			}
		}
	};
}
