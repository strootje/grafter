import { resolve } from 'path';
import { Packable } from './Packable';
import { Targetable } from './Targetable';

export type WriteableBuilderPredicate = (builder: WriteableBuilder) => Promise<void>;

export interface WriteableCreator {
	CreateAsync(predicate: WriteableBuilderPredicate): Promise<void>;
}

export interface WriteableBuilder {
	Add(path: string, content: string): void;
	Remove(path: string): void;
}

export abstract class Writeable implements WriteableCreator {
	constructor(
		protected readonly target: Targetable,
		protected readonly pack: Packable
	) {
	}

	protected get Basepath(): string {
		return resolve(this.pack.Type === 'assets' ? this.target.FolderAssets : this.target.FolderData, this.pack.Name)
	}

	protected get Typedpath(): string {
		return resolve(this.Basepath, this.pack.Type);
	}

	public abstract CreateAsync(predicate: WriteableBuilderPredicate): Promise<void>;
}
