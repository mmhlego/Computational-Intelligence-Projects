import NetworkData from 'main/model/NetworkData';

export const AndDataBipolar: NetworkData[] = [
	{
		Input: [1, 1],
		Output: [1],
	},
	{
		Input: [1, -1],
		Output: [-1],
	},
	{
		Input: [-1, 1],
		Output: [-1],
	},
	{
		Input: [-1, -1],
		Output: [-1],
	},
];

export const AndDataBinary: NetworkData[] = [
	{
		Input: [1, 1],
		Output: [1],
	},
	{
		Input: [1, 0],
		Output: [-1],
	},
	{
		Input: [0, 1],
		Output: [-1],
	},
	{
		Input: [0, 0],
		Output: [-1],
	},
];
