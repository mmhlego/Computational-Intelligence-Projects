import Network from './Network';
import NetworkData from './NetworkData';

export default interface NetworkInterface {
	CurrentNetwork: Network;
	Train: (data: NetworkData) => number; // Maximum value of weight change (Δw)
	Evaluate: (data: number[]) => void;
}
