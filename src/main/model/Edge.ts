export default class Edge {
	// Weight of the current edge
	public Weight: number;

	constructor(defaultWeight: number | 'random' = 0) {
		if (defaultWeight === 'random') {
			this.Weight = Math.random() * 2 - 1;
		} else {
			this.Weight = defaultWeight;
		}
	}

	public SetWeight = (newWeight: number) => {
		this.Weight = newWeight;
	};

	public AddWeight = (add: number) => {
		this.SetWeight(this.Weight + add);
	};
}
