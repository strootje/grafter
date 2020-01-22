import { debug } from 'debug';
import { Packable } from './Packable';
import { Watchable } from './Watchable';
import { WriteableBuilder, WriteableCreator } from './Writeable';

const logger = debug('graft:domain:Sourceable');
export abstract class Sourceable {
	constructor(
		protected readonly pack: Packable,
		protected readonly target: WriteableCreator
	) {
	}

	public ProcessFilesAsync(): Promise<void> {
		return this.target.CreateAsync(builder => {
			return this.ProcessFilesAsyncInternal(builder);
		});
	}

	protected abstract ProcessFilesAsyncInternal(builder: WriteableBuilder): Promise<void>;

	protected CreateAsyncFileEventAddedEventHandler(_builder: WriteableBuilder) {
		return async (file: Watchable): Promise<void> => {
			logger('added', file);
		};
	}

	protected CreateAsyncFileEventChangedEventHandler(_builder: WriteableBuilder) {
		return async (file: Watchable): Promise<void> => {
			logger('changed', file);
		};
	}

	protected CreateAsyncFileEventRemovedEventHandler(_builder: WriteableBuilder) {
		return async (file: Watchable): Promise<void> => {
			logger('removed', file);
		};
	}
}
