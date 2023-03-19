export class StableRandomizer {
	_value: number;

	constructor(seed: number) {
		this.setSeed(seed);
	}

	setSeed(seed: number) {
		if (seed < 0) {
			throw new Error("Seed must be greater than 0");
		}
		this._value = seed;
	}

	random() {
		const j = 16807;
		const m = 2147483647;
		this._value = (this._value * j) % m;
		return this._value / m;
	}
}
