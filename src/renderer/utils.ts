import {
	ActivationFunctionType,
	Linear,
	Sigmoid,
	SigmoidBipolar,
} from 'main/model/ActivationFunctions';

export default function ShuffleArray(array: any[]) {
	console.log('shuffle');
	const result = array;
	for (let i = result.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return array;
}

export function GetDerivativeFunction(
	func: ActivationFunctionType
): ActivationFunctionType | undefined {
	if (func === Sigmoid)
		return (input) => Sigmoid(input) * (1 - Sigmoid(input));

	if (func === SigmoidBipolar)
		return (input) =>
			((1 + SigmoidBipolar(input)) * (1 - SigmoidBipolar(input))) / 2;

	if (func === Linear) return (input) => 1;

	return undefined;
}
