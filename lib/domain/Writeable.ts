import { Packable } from './Packable';
import { Targetable } from './Targetable';

export abstract class Writeable {
	constructor(
		private readonly target: Targetable,
		private readonly pack: Packable
	) {
	}
}
