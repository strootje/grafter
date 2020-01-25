import { debug, Debugger } from 'debug';
import { Changeable } from '../domain/Changeable';
import { SourceValue } from '../domain/core/SourceValue';
import { Packable } from '../domain/Packable';
import { FileEvent } from '../domain/Trackable';
import { WriteableBuilder } from '../domain/Writeable';
import { FileFactory } from '../factories/FileFactory';

interface Changeables {
	[key: string]: {
		file: Changeable;
		unsubscribe: () => void;
	};
}

const logger = debug('graft:helpers:ChangeTracker');
export class ChangeTracker {
	private readonly logger: Debugger;
	private readonly files: Changeables;

	public constructor(
		private readonly pack: Packable,
		public readonly builder: WriteableBuilder
	) {
		this.logger = logger.extend(this.pack.Name);
		this.files = {};
	}

	public HandleAdded(event: FileEvent): void {
		this.ThrowIfFound(event.filepath);
		this.logger('file added received (%o)', event);
		this.HandleChanged(event);
	}

	public HandleChanged(event: FileEvent): void {
		this.EnsureExists(event.filepath);
		this.logger('file changed received (%o)', event);

		if ('source' in event) {
			this.files[event.filepath].file.AddSource(event.source, new SourceValue(this.pack, event.source, this.builder, event.value || ''));
		}

		this.files[event.filepath].file.Update();
	}

	public HandleRemoved(event: FileEvent): void {
		this.ThrowIfNotFound(event.filepath);
		this.logger('file removed received (%o)', event);

		if ('source' in event) {
			this.files[event.filepath].file.RemoveSource(event.source);
			this.files[event.filepath].file.Update();
		}

		if (!this.files[event.filepath].file.HasSources || !('source' in event)) {
			this.files[event.filepath].file.Remove();
			this.files[event.filepath].unsubscribe();
			delete this.files[event.filepath];
		}
	}

	private EnsureExists(filepath: string): void {
		if (!this.files[filepath]) {
			const file = FileFactory.Create(filepath, this.pack, this.builder);
			const addedSubscription = file.Added$.subscribe(this.HandleAdded.bind(this));
			const changedSubscription = file.Changed$.subscribe(this.HandleChanged.bind(this));
			const removedSubscription = file.Removed$.subscribe(this.HandleRemoved.bind(this));

			this.files[filepath] = {
				file,
				unsubscribe: () => {
					addedSubscription.unsubscribe();
					changedSubscription.unsubscribe();
					removedSubscription.unsubscribe();
				}
			}
		}
	}

	private ThrowIfFound(filepath: string): void {
		if (!!this.files[filepath]) {
			throw new Error(`file found '${filepath}'`);
		}
	}

	private ThrowIfNotFound(filepath: string): void {
		if (!this.files[filepath]) {
			throw new Error(`file not found '${filepath}'`);
		}
	}
}
