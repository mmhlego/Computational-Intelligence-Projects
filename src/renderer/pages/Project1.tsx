import { SymmetricalHardLimit } from 'main/model/ActivationFunctions';
import Network from 'main/model/Network';
import NetworkView from 'renderer/view/NetworkView';

export default function Project1() {
	const network = new Network(
		[2, 3, 1],
		SymmetricalHardLimit,
		SymmetricalHardLimit
	);

	return (
		<div>
			<NetworkView network={network} width={500} height={500} />
		</div>
	);
}
