import { GrayMatterFile } from 'gray-matter';
import { Packable } from '../Packable';
import { Sourceable, SourceAttributes } from '../Sourceable';
import { WriteableBuilder } from '../Writeable';

export class SourceValue extends Sourceable implements GrayMatterFile<string> {
	private _content: string;
	private _data: SourceAttributes;
	private _language: string;

	constructor(pack: Packable, path: string, builder: WriteableBuilder, value: string) {
		super(pack, path, builder);
		this._content = value;
	}

	public get content(): string {
		return this._content;
	}

	public get data(): SourceAttributes {
		return this._data;
	}

	public get language(): string {
		return this._language;
	}

	public stringify(_lang: string): string {
		return this.content;
	}

	public Read(): GrayMatterFile<string> {
		return this;
	}

	public Write(): void {
	}

	public get excerpt(): string {
		return this._content;
	}

	public get orig(): string | Buffer {
		return this._content;
	}

	public get matter(): string {
		return this._content;
	}
}
