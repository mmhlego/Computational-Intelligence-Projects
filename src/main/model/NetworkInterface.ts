import Network from './Network';
import NetworkData from './NetworkData';

export default interface NetworkInterface {
	CurrentNetwork: Network;
	Train: (data: NetworkData) => void;
	Evaluate: (data: number[]) => void;
}
