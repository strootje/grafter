import { Archiver, create as CreateArchive } from 'archiver';
import { debug } from 'debug';
import { createWriteStream } from 'fs';
import { sync as MkdirpSync } from 'mkdirp';
import { resolve } from 'path';
import { FileAddedEvent } from '../events/FileAddedEvent';
import { FileChangedEvent } from '../events/FileChangedEvent';
import { FileRemovedEvent } from '../events/FileRemovedEvent';
import { Packable } from '../Packable';
import { Writeable, WriteableBuilder } from '../Writeable';

const logger = debug('grafter:domain:WriteToArchive');
const tracer = debug('grafter:trace:domain:WriteToArchive');
export class WriteToArchive extends Writeable {
	public Create(): WriteableBuilder {
		const basepath = resolve(this.pack.Type === 'assets' ? this.target.FolderAssets : this.target.FolderData);

		tracer('creating `%s`', basepath);
		MkdirpSync(basepath);

		const archivePath = resolve(basepath, `${this.pack.Name}-${this.pack.Type}.zip`);
		logger('Creating %s', archivePath);

		const writable = createWriteStream(archivePath);
		const archive = CreateArchive('zip');
		archive.pipe(writable);

		const manifestpath = 'pack.mcmeta';
		tracer('creating `%s`', manifestpath);
		archive.append(JSON.stringify(this.pack.Manifest), {
			name: manifestpath
		});

		const builder = new WriterToArchiveBuilder(
			this.pack, archive, archive.finalize
		);

		return builder;
	}
}

export class WriterToArchiveBuilder extends WriteableBuilder {
	constructor(
		private readonly pack: Packable,
		private readonly archive: Archiver,
		private readonly finalize: () => Promise<void>
	) {
		super();
	}

	public async FinalizeAsync(): Promise<void> {
		await Promise.all([
			super.FinalizeAsync(),
			this.finalize()
		]);
	}

	public HandleAdded(args: FileAddedEvent): void {
		this.HandleChanged(args);
	}

	public HandleChanged(args: FileChangedEvent): void {
		this.archive.append(args.Content, {
			name: `${this.pack.Type}/${args.Targetpath}`
		});
	}

	public HandleRemoved(args: FileRemovedEvent): void {
		this.archive.append('', {
			name: `${this.pack.Type}/${args.Targetpath}`
		});
	}
}
