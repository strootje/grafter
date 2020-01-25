import { GrayMatterFile } from 'gray-matter';
import { Packable } from './Packable';
import { WriteableBuilder } from './Writeable';

export interface SourceAttributes {
	[key: string]: any;
}

export abstract class Sourceable {
	public constructor(
		protected readonly pack: Packable,
		protected readonly path: string,
		protected readonly builder: WriteableBuilder
	) {
	}

	protected get TargetPath(): string {
		return this.path;
	}

	public abstract Read(): GrayMatterFile<string>;

	public Write(content: string): void {
		this.builder.Add(this.TargetPath, content);
	}

	public Remove(): void {
		this.builder.Remove(this.TargetPath);
	}
}
