export type FileType = 'functions' | 'tags';

export interface Mergeable<T extends {}> {
	readonly Content: T;
	MergeWith(json: T): void;
}

export abstract class Watchable {
	constructor(
		protected readonly namespace: string,
		protected readonly name: string,
		protected readonly type: FileType,
		protected readonly path: string
	) {
	}
}
