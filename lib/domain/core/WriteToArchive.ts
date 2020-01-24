import { Archiver, create as CreateArchive } from 'archiver';
import { debug } from 'debug';
import { createWriteStream } from 'fs';
import { sync as MkdirpSync } from 'mkdirp';
import { resolve } from 'path';
import { Packable } from '../Packable';
import { Writeable, WriteableBuilder, WriteableBuilderPredicate } from '../Writeable';

const logger = debug('graft:domain:WriteToArchive');
const tracer = debug('graft:trace:domain:WriteToArchive');
export class WriteToArchive extends Writeable {
	public async CreateAsync(predicate: WriteableBuilderPredicate): Promise<void> {
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
			this.pack,
			archive
		);

		await predicate(builder);
		await archive.finalize();
	}
}

export class WriterToArchiveBuilder implements WriteableBuilder {
	constructor(
		private readonly pack: Packable,
		private readonly archive: Archiver
	) {

	}

	public Add(path: string, content: string): void {
		this.archive.append(content, {
			name: `${this.pack.Type}/${path}`
		});
	}

	public Remove(path: string): void {
		this.archive.append('', {
			name: `${this.pack.Type}/${path}`
		});
	}
}
