export function HardLimit(input: number): number {
	return input >= 0 ? 1 : 0;
}

export function SymmetricalHardLimit(input: number): number {
	return input >= 0 ? 1 : -1;
}

export function Linear(input: number): number {
	return input;
}

export function SaturatingLinear(input: number): number {
	if (input < 0) return 0;
	if (input > 1) return 1;
	return input;
}

export function SymmetricalSaturatingLinear(input: number): number {
	if (input < -1) return -1;
	if (input > 1) return 1;
	return input;
}

export function Sigmoid(input: number): number {
	return 1 / (1 + Math.exp(-input));
}

export type ActivationFunctionType = (input: number) => number;
