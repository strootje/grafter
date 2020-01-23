import { debug } from 'debug';
import { Subject } from 'rxjs';
import { Packable } from './Packable';
import { WriteableBuilder, WriteableCreator } from './Writeable';

const logger = debug('graft:domain:Sourceable');
export abstract class Sourceable {
	protected readonly addedSubject: Subject<string>;
	protected readonly changedSubject: Subject<string>;
	protected readonly removedSubject: Subject<string>;
	private readonly targets: WriteableCreator[];

	constructor(
		protected readonly pack: Packable
	) {
		this.addedSubject = new Subject<string>();
		this.changedSubject = new Subject<string>();
		this.removedSubject = new Subject<string>();
		this.targets = [];
	}

	public pipe(target: WriteableCreator): void {
		this.targets.push(target);
	}
	
	public ProcessFilesAsync(): Promise<void> {
		let completed = false;

		const complete = () => {
			logger('completing')
			this.addedSubject.complete();
			this.changedSubject.complete();
			this.removedSubject.complete();
			completed = true;
		};

		const WaitTillCompleted = () => new Promise<void>(done => {
			while (!completed) { logger('spam'); }
			done();
		});

		const tasks = this.targets.map(target => {
			return target.CreateAsync(builder => {
				logger('created');
				const addedSubscription = this.addedSubject.subscribe(this.CreateAsyncFileEventAddedEventHandler(builder));
				const changedSubscription = this.changedSubject.subscribe(this.CreateAsyncFileEventChangedEventHandler(builder));
				const removedSubscription = this.removedSubject.subscribe(this.CreateAsyncFileEventRemovedEventHandler(builder));

				WaitTillCompleted().finally(() => {
					logger('finished');
					addedSubscription.unsubscribe();
					changedSubscription.unsubscribe();
					removedSubscription.unsubscribe();
				});

				return Promise.resolve();
			});
		});
		
		return Promise.all(tasks).then(this.ProcessFilesAsyncInternal).then(complete).then(() => logger('done'));
	}

	public ProcessFilesAsync_Old1(): Promise<void> {
		let completed = false;

		const complete = () => {
			this.addedSubject.complete();
			this.changedSubject.complete();
			this.removedSubject.complete();
			completed = true;
		};
		
		const WaitTillCompleted = () => new Promise<void>(done => {
			while (!completed) { /* nothing */}
			logger('waittillcompleted - done');
			done();
		});

		const tasks = this.targets.map(target => {
			const listener = target.CreateAsync(builder => {
				const addedSubscription = this.addedSubject.subscribe(this.CreateAsyncFileEventAddedEventHandler(builder));
				const changedSubscription = this.changedSubject.subscribe(this.CreateAsyncFileEventChangedEventHandler(builder));
				const removedSubscription = this.removedSubject.subscribe(this.CreateAsyncFileEventRemovedEventHandler(builder));

				return WaitTillCompleted().finally(() => {
					addedSubscription.unsubscribe();
					changedSubscription.unsubscribe();
					removedSubscription.unsubscribe();
				});
			});

			// TODO: handle file reading / watching
			return this.ProcessFilesAsyncInternal().then(() => complete()).finally(() => listener);
		});

		return Promise.all(tasks).then(() => logger('-- finished --'));
	}

	protected abstract ProcessFilesAsyncInternal(): Promise<void>;

	protected CreateAsyncFileEventAddedEventHandler(_builder: WriteableBuilder) {
		return async (filepath: string): Promise<void> => {
			logger('added', filepath);
		};
	}

	protected CreateAsyncFileEventChangedEventHandler(_builder: WriteableBuilder) {
		return async (filepath: string): Promise<void> => {
			logger('changed', filepath);
		};
	}

	protected CreateAsyncFileEventRemovedEventHandler(_builder: WriteableBuilder) {
		return async (filepath: string): Promise<void> => {
			logger('removed', filepath);
		};
	}
}
