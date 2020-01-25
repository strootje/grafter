import { Subject } from 'rxjs';

export interface FileEventNoSource {
	readonly filepath: string;
}

export interface FileEventWithSource extends FileEventNoSource {
	source: string;
	value?: string;
}

export type FileEvent = FileEventNoSource | FileEventWithSource;

export abstract class Trackable {
	private readonly added$: Subject<FileEvent>;
	private readonly changed$: Subject<FileEvent>;
	private readonly removed$: Subject<FileEvent>;

	constructor() {
		this.added$ = new Subject<FileEvent>();
		this.changed$ = new Subject<FileEvent>();
		this.removed$ = new Subject<FileEvent>();
	}

	public get Added$(): Subject<FileEvent> {
		return this.added$;
	}

	public get Changed$(): Subject<FileEvent> {
		return this.changed$;
	}

	public get Removed$(): Subject<FileEvent> {
		return this.removed$;
	}
}
