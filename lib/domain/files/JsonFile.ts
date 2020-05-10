import { File, FileType } from '../File';

export class JsonFile<T extends {}> extends File {
	constructor(namespace: string, type: FileType, name: string,
		private readonly content: T
	) {
		super(namespace, type, name, 'json');
	}

	public get Content(): string {
		return JSON.stringify(this.content);
	}
}
