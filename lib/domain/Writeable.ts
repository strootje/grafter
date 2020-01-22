import { Packable } from './Packable';
import { Targetable } from './Targetable';

export interface WriteableCreator {
	CreateAsync(predicate: WriteableBuilderPredicate): Promise<void>;
}

export interface WriteableBuilder {
	AddAsync(path: string, content: string): Promise<void>;
	RemoveAsync(path: string): Promise<void>;
}

export type WriteableBuilderPredicate = (builder: WriteableBuilder) => Promise<void>

export abstract class Writeable implements WriteableCreator {
	constructor(
		protected readonly target: Targetable,
		protected readonly pack: Packable
	) {
	}

	public abstract CreateAsync(predicate: WriteableBuilderPredicate): Promise<void>;
}
