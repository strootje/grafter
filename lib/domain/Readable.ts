import { debug, Debugger } from 'debug';
import { Packable } from './Packable';
import { Trackable } from './Trackable';

const logger = debug('grafter:domain:Readable');
const tracer = debug('grafter:trace:domain:Readable');
export abstract class Readable extends Trackable {
	protected readonly logger: Debugger;
	protected readonly tracer: Debugger;

	constructor(
		protected readonly pack: Packable
	) {
		super();
		this.logger = logger.extend(this.pack.Name);
		this.tracer = tracer.extend(this.pack.Name);
	}

	public abstract ProcessFilesAsync(): Promise<void>;
}
