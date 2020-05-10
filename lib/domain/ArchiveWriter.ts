import { Archiver, create as CreateArchive } from 'archiver';
import { debug } from 'debug';
import { createWriteStream } from 'fs';
import { sync as MkdirpSync } from 'mkdirp';
import { resolve } from 'path';
import { Pack } from './Pack';
import { Writer, WriterBuilder, WriterCallback } from './Writer';

const logger = debug('grafter:domain:WriteToArchive');
const tracer = debug('grafter:trace:domain:WriteToArchive');
export class ArchiveWriter extends Writer {
	public async CreateAsync(predicate: WriterCallback): Promise<void> {
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

		const builder = new ArchiveWriterBuilder(
			this.pack,
			archive
		);

		await predicate(builder);
		await archive.finalize();
	}
}

export class ArchiveWriterBuilder implements WriterBuilder {
	constructor(
		private readonly pack: Pack,
		private readonly archive: Archiver
	) {

	}

	public Add(filename: string, content: string): void {
		this.archive.append(content.trim(), {
			name: `${this.pack.Type}/${filename}`
		});
	}

	public Delete(filename: string): void {
		this.archive.append('', {
			name: `${this.pack.Type}/${filename}`
		});
	}
}
