import { resolve } from 'path';
import { Pack } from './Pack';
import { Target } from './Target';

export type WriterType = 'archive' | 'folder';

export interface WriterBuilder {
	Add(filename: string, content: string): void;
	Delete(filename: string): void;
}

export interface WriterCallback {
	(writer: WriterBuilder): Promise<void>
}

export abstract class Writer {
	constructor(
		protected readonly target: Target,
		protected readonly pack: Pack
	) {
	}

	protected get Basepath(): string {
		return resolve(this.pack.Type === 'assets' ? this.target.FolderAssets : this.target.FolderData, this.pack.Name)
	}

	protected get Typedpath(): string {
		return resolve(this.Basepath, this.pack.Type);
	}

	public abstract CreateAsync(callback: WriterCallback): Promise<void>;
}
