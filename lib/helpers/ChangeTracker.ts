import { debug, Debugger } from 'debug';
import { Subscription } from 'rxjs';
import { Packable } from '../domain/Packable';
import { Readable } from '../domain/Readable';
import { Targetable } from '../domain/Targetable';
import { Writeable } from '../domain/Writeable';
import { SourceToTargetMapper } from './SourceToTargetMapper';

const logger = debug('grafter:helpers:ChangeTracker');
const tracer = debug('grafter:trace:helpers:ChangeTracker');
export class ChangeTracker {
	private readonly logger: Debugger;
	private readonly tracer: Debugger;
	private readonly writeables: Writeable[];

	constructor(
		private readonly pack: Packable,
		private readonly target: Targetable
	) {
		this.logger = logger.extend(pack.Name);
		this.tracer = tracer.extend(pack.Name);
		this.writeables = [];
	}

	public AddWriter(writeable: Writeable): void {
		this.writeables.push(writeable);
	}

	public async ListenAsync(readable: Readable): Promise<void> {
		const writers = this.writeables.map(writeable => writeable.Create());

		const subs: Subscription[] = [];
		const mapper = new SourceToTargetMapper(this.logger, this.tracer, this.pack, this.target);
		readable.Subscribe(mapper).forEach(p => subs.push(p));
		writers.forEach(w => mapper.Subscribe(w).forEach(p => subs.push(p)));

		this.logger('start listening to reader');
		await readable.ProcessFilesAsync();
		await mapper.FinalizeAsync();

		this.tracer('completing readable & mapper')
		readable.Complete();
		mapper.Complete();

		this.tracer('unsubscribing');
		subs.forEach(p => p.unsubscribe());

		this.logger('finalizing writers');
		await Promise.all(writers.map(p => p.FinalizeAsync()));
	}
}
