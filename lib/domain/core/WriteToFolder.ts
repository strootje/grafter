import { debug } from 'debug';
import { sync as EmptyDirSync } from 'empty-dir';
import { rmdirSync, unlinkSync, writeFileSync } from 'fs';
import { sync as MkdirpSync } from 'mkdirp';
import { dirname, resolve } from 'path';
import { FileAddedEvent } from '../events/FileAddedEvent';
import { FileChangedEvent } from '../events/FileChangedEvent';
import { FileRemovedEvent } from '../events/FileRemovedEvent';
import { Writeable, WriteableBuilder } from '../Writeable';

// const logger = debug('grafter:domain:WriteToFolder');
const tracer = debug('grafter:trace:domain:WriteToFolder');
export class WriteToFolder extends Writeable {
	public Create(): WriteableBuilder {
		tracer('creating `%s`', this.Typedpath);
		MkdirpSync(this.Typedpath);

		const manifestpath = resolve(this.Basepath, 'pack.mcmeta');
		tracer('creating `%s`', manifestpath);
		writeFileSync(manifestpath, JSON.stringify(this.pack.Manifest));

		const builder = new WriteToFolderBuilder(
			this.Typedpath
		);

		return builder;
	}

	public FinalizeAsync(): Promise<void> {
		return Promise.resolve();
	}
}

export class WriteToFolderBuilder extends WriteableBuilder {
	constructor(
		private readonly Typedpath: string
	) {
		super();
	}

	public HandleAdded(args: FileAddedEvent): void {
		this.HandleChanged(args);
	}

	public HandleChanged(args: FileChangedEvent): void {
		this.AddJob(async () => {
			const filepath = resolve(this.Typedpath, args.Targetpath);
			const basepath = dirname(filepath);

			MkdirpSync(basepath);
			writeFileSync(filepath, args.Content);
		});
	}

	public HandleRemoved(args: FileRemovedEvent): void {
		this.AddJob(async () => {
			const filepath = resolve(this.Typedpath, args.Targetpath);

			unlinkSync(filepath);
			this.RemoveEmptyFolder(filepath);
		});
	}

	private RemoveEmptyFolder(path: string): void {
		const basepath = dirname(path);

		if (!EmptyDirSync(basepath)) {
			return;
		}

		rmdirSync(basepath);
		this.RemoveEmptyFolder(basepath);
	}
}
