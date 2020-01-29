import { debug, Debugger } from 'debug';
import { CacheHelper } from '../helpers/CacheHelper';
import { ChangeTracker } from '../helpers/ChangeTracker';
import { Packable } from './Packable';
import { Trackable } from './Trackable';
import { WriteableCreator } from './Writeable';

const logger = debug('grafter:domain:Readable');
const tracer = debug('grafter:trace:domain:Readable');
export abstract class Readable extends Trackable {
	private readonly logger: Debugger;
	private readonly tracer: Debugger;
	private readonly targets: WriteableCreator[];

	constructor(
		protected readonly pack: Packable
	) {
		super();
		this.logger = logger.extend(this.pack.Name);
		this.tracer = tracer.extend(this.pack.Name);
		this.targets = [];
	}

	public pipe(target: WriteableCreator): void {
		this.targets.push(target);
		this.logger('added target');
	}

	public async ProcessFilesAsync(): Promise<void> {
		let ready = false;

		const WaitForTasksAsync = () => new Promise(done => {
			const timer = setTimeout(() => {
				if (!ready) {
					timer.refresh();
					return;
				}

				done();
			}, 100);
		});

		const RunOnceAsync = () => CacheHelper.Scoped(this.pack.Name, 'promise', () => {
			return this.ProcessFilesAsyncInternal();
		});

		this.logger('creating target tasks');
		const tasks = this.targets.map(target => target.CreateAsync(async builder => {
			const tracker = new ChangeTracker(this.pack, builder);
			const addedSubscription = this.Added$.subscribe(tracker.HandleAdded.bind(tracker));
			const changedSubscription = this.Changed$.subscribe(tracker.HandleChanged.bind(tracker));
			const removedSubscription = this.Removed$.subscribe(tracker.HandleRemoved.bind(tracker));
			this.logger('subscribed to targets');

			await WaitForTasksAsync();
			await RunOnceAsync();

			this.Added$.complete();
			this.Changed$.complete();
			this.Removed$.complete();
			addedSubscription.unsubscribe();
			changedSubscription.unsubscribe();
			removedSubscription.unsubscribe();
			this.logger('unsubscribed from targets');
		}));


		ready = true;
		this.tracer('created %s target tasks', tasks.length);
		await Promise.all(tasks);
	}

	protected abstract ProcessFilesAsyncInternal(): Promise<void>;
}
