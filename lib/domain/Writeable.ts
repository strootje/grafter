// import { Manifest } from './pack/Manifest';
import { Packable } from './Packable';
import { Targetable } from './Targetable';

export interface WritableBuilder {
	AddAsync(path: string, content: string): Promise<void>;
	RemoveAsync(path: string): Promise<void>;
}

export type WritableBuilderPredicate = (builder: WritableBuilder) => Promise<void>

export abstract class Writeable {
	constructor(
		protected readonly target: Targetable,
		protected readonly pack: Packable
	) {
	}

	// public abstract CreateAsync(manifest: Manifest, predicate: WritableBuilderPredicate): Promise<void>
}
