import { Sourceable } from "./Sourceable";

export abstract class Changeable {
	constructor(
		private readonly source: Sourceable
	) {
	}
}
