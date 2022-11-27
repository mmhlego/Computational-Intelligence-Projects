import { Sigmoid } from 'main/model/ActivationFunctions';
import MLPNetwork from 'main/model/MLPNetwork';
import NetworkData from 'main/model/NetworkData';

export default function Home() {
	const MLP = new MLPNetwork([3, 2, 2], Sigmoid, 0.5);

	const data: NetworkData = {
		Input: [1, 1, 1],
		Output: [-1, -1],
	};

	MLP.Train(data);

	return <div>Home</div>;
}
