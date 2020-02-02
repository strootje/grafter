import { Debugger } from 'debug';
import { FileAddedEvent } from '../domain/events/FileAddedEvent';
import { FileChangedEvent } from '../domain/events/FileChangedEvent';
import { FileRemovedEvent } from '../domain/events/FileRemovedEvent';
import { Packable } from '../domain/Packable';
import { Targetable } from '../domain/Targetable';
import { Trackable } from '../domain/Trackable';
import { Tracker } from '../domain/Tracker';
import { CacheHelper } from './CacheHelper';
import { FileHelper } from './FileHelper';


interface Dict<TVal> {
	[key: string]: TVal;
}

export class SourceToTargetMapper extends Trackable<FileAddedEvent, FileChangedEvent, FileRemovedEvent> implements Tracker {
	private readonly jobs: Promise<void>[] = [];
	private readonly deps: Dict<Dict<boolean>> = {};

	constructor(
		private readonly logger: Debugger,
		private readonly tracer: Debugger,
		private readonly pack: Packable,
		private readonly target: Targetable
	) {
		super();
	}

	public AddJob(job: () => Promise<void>): void {
		this.jobs.push(job());
	}

	public async FinalizeAsync(): Promise<void> {
		await Promise.all(this.jobs);
	}

	public HandleAdded(sourcepath: string): void {
		this.AddJob(async () => {
			this.EnsureExists(sourcepath);
			CacheHelper.ResetScoped(sourcepath, FileHelper.ContentCacheKey);

			const content = await FileHelper.GetContentAsync(this.pack.Type, sourcepath, this.target.Profile.JarPath)

			this.logger('testing %s', sourcepath);
			this.logger('testing %s', content);
			this.tracer('testing %s', this.pack.Name);


			// this.Added$.next({
			// 	Targetpath: '',
			// 	Content: ''
			// });
		});
	}

	public HandleChanged(sourcepath: string): void {
		this.AddJob(async () => {
			this.ThrowIfNotFound(sourcepath);
			CacheHelper.ResetScoped(sourcepath, FileHelper.ContentCacheKey);

			// this.Changed$.next({
			// 	Targetpath: '',
			// 	Content: ''
			// });
		});
	}

	public HandleRemoved(sourcepath: string): void {
		this.AddJob(async () => {
			this.ThrowIfNotFound(sourcepath);

			// this.Removed$.next({
			// 	Targetpath: ''
			// });
		});
	}

	private EnsureExists(sourcepath: string): void {
		if (!this.deps[sourcepath]) {
			this.deps[sourcepath] = {};
		}
	}

	private ThrowIfNotFound(sourcepath: string): void {
		if (!this.deps[sourcepath]) {
			throw new Error('not found in deps');
		}
	}
}
