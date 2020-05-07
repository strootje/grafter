import { join } from 'path';

export type FileType = 'functions' | 'tags';

export abstract class File {
	constructor(
		private readonly namespace: string,
		private readonly type: FileType,
		private readonly name: string
	) {
	}

	public get Namespace(): string { return this.namespace; }
	public get Type(): FileType { return this.type; }
	public get Name(): string { return this.name; }
	public get Filename(): string { return join(this.Namespace, this.Type, this.Name); }

	public get Weight(): number { return 1; }

	public abstract get Content(): string;
	public abstract get SubFiles(): File[];
}
