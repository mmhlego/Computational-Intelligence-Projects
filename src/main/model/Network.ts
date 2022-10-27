import { ActivationFunctionType } from './ActivationFunctions';
import Neuron from './Neuron';

export default class Network {
	public Neurons: Neuron[][] = [];

	public Size: number = 0;

	constructor(
		neurons: number[],
		hiddenActivationFunction: ActivationFunctionType,
		outputActivationFunction: ActivationFunctionType
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
						pastLayerNodes
					)
				);
			}

			this.Neurons.push(layer);
		}
	}
}
