import { GrayMatterFile } from 'gray-matter';
import { Packable } from '../Packable';
import { Sourceable, SourceAttributes } from '../Sourceable';
import { WriteableBuilder } from '../Writeable';

export class SourceEmpty extends Sourceable implements GrayMatterFile<string> {
	private _content: string;
	private _data: SourceAttributes;
	private _language: string;

	constructor(pack: Packable, path: string, builder: WriteableBuilder) {
		super(pack, path, builder);
		this._content = '';
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

	public Write(content: string): void {
		super.Write(content);
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
