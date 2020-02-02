import { debug, Debugger } from 'debug';
import { resolve } from 'path';
import { FileAddedEvent } from './events/FileAddedEvent';
import { FileChangedEvent } from './events/FileChangedEvent';
import { FileRemovedEvent } from './events/FileRemovedEvent';
import { Packable } from './Packable';
import { Targetable } from './Targetable';
import { Tracker } from './Tracker';

export abstract class WriteableBuilder implements Tracker<FileAddedEvent, FileChangedEvent, FileRemovedEvent> {
	private readonly jobs: Promise<void>[] = [];

	public async FinalizeAsync(): Promise<void> {
		await Promise.all(this.jobs);
	}

	public abstract HandleAdded(args: FileAddedEvent): void;
	public abstract HandleChanged(args: FileChangedEvent): void;
	public abstract HandleRemoved(args: FileRemovedEvent): void;

	protected AddJob(job: () => Promise<void>): void {
		this.jobs.push(job());
	}
}

const logger = debug('graft:domain:Writeable');
const tracer = debug('graft:trace:domain:Writeable');
export abstract class Writeable {
	protected readonly logger: Debugger;
	protected readonly tracer: Debugger;

	constructor(
		protected readonly pack: Packable,
		protected readonly target: Targetable
	) {
		this.logger = logger.extend(target.Name);
		this.tracer = tracer.extend(target.Name);
	}

	protected get Basepath(): string {
		return resolve(this.pack.Type === 'assets' ? this.target.FolderAssets : this.target.FolderData, this.pack.Name)
	}

	protected get Typedpath(): string {
		return resolve(this.Basepath, this.pack.Type);
	}

	public abstract Create(): WriteableBuilder;
}
