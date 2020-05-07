import { File, FileType } from '../File';

export interface TagJson {
	values: string[];
}

export class JsonFile extends File {
	constructor(namespace: string, type: FileType, name: string,
		private readonly content: string
	) {
		super(namespace, type, name);
	}

	public get Content(): string {
		return this.content;
	}

	public get SubFiles(): File[] { return []; }
}
