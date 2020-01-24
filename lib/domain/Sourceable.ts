import { debug, Debugger } from 'debug';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Subject } from 'rxjs';
import { CacheHelper } from '../helpers/CacheHelper';
import { Packable } from './Packable';
import { WriteableBuilder, WriteableCreator } from './Writeable';

const logger = debug('graft:domain:Sourceable');
const tracer = debug('graft:trace:domain:Sourceable');
export abstract class Sourceable {
	private readonly logger: Debugger;
	private readonly tracer: Debugger;
	protected readonly addedSubject: Subject<string>;
	protected readonly changedSubject: Subject<string>;
	protected readonly removedSubject: Subject<string>;
	private readonly targets: WriteableCreator[];

	constructor(
		protected readonly pack: Packable
	) {
		this.logger = logger.extend(this.pack.Name);
		this.tracer = tracer.extend(this.pack.Name);
		this.addedSubject = new Subject<string>();
		this.changedSubject = new Subject<string>();
		this.removedSubject = new Subject<string>();
		this.targets = [];
	}

	public pipe(target: WriteableCreator): void {
		this.targets.push(target);
		this.logger('added target');
	}

	public ProcessFilesAsync(): Promise<void> {
		let ready = false;

		const WaitForTasksAsync = () => new Promise(done => {
			const timer = setTimeout(() => {
				if (!ready) { timer.refresh(); }
				else { done(); }
			}, 100);
		});

		const RunOnceAsync = () => CacheHelper.Scoped(this.pack.Name, 'process-files-promise', () => {
			return this.ProcessFilesAsyncInternal();
		});

		this.logger('creating target tasks');
		const tasks = this.targets.map(target => target.CreateAsync(async builder => {
			const addedSubscription = this.addedSubject.subscribe(this.CreateAsyncFileEventAddedEventHandler(builder));
			const changedSubscription = this.changedSubject.subscribe(this.CreateAsyncFileEventChangedEventHandler(builder));
			const removedSubscription = this.removedSubject.subscribe(this.CreateAsyncFileEventRemovedEventHandler(builder));
			this.logger('subscribed to targets');

			await WaitForTasksAsync();
			await RunOnceAsync();

			addedSubscription.unsubscribe();
			changedSubscription.unsubscribe();
			removedSubscription.unsubscribe();
			this.logger('unsubscribed from targets');
		}));


		ready = true;
		this.tracer('created %s target tasks', tasks.length);
		return Promise.all(tasks).then(() => { });
	}

	protected abstract ProcessFilesAsyncInternal(): Promise<void>;

	private CreateAsyncFileEventAddedEventHandler(builder: WriteableBuilder) {
		return (filepath: string) => {
			const fullpath = resolve(this.pack.Folder, filepath);
			this.logger('handling `added` -> `%s`', filepath);

			const data = readFileSync(fullpath, 'utf-8');
			builder.Add(filepath, data);
		}
	}

	private CreateAsyncFileEventChangedEventHandler(builder: WriteableBuilder) {
		return this.CreateAsyncFileEventAddedEventHandler(builder);
	}

	private CreateAsyncFileEventRemovedEventHandler(builder: WriteableBuilder) {
		return (filepath: string) => {
			this.logger('handling `removed` -> `%s`', filepath);
			builder.Remove(filepath);
		};
	}
}
