export default class Edge {
	// Weight of the current edge
	public Weight: number;

	constructor(defaultWeight = 0) {
		this.Weight = defaultWeight;
	}

	public SetWeight = (newWeight: number) => {
		this.Weight = newWeight;
	};

	public AddWeight = (add: number) => {
		this.SetWeight(this.Weight + add);
	};
}
