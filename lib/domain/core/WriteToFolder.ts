import { debug } from 'debug';
import { sync as EmptyDirSync } from 'empty-dir';
import { rmdirSync, unlinkSync, writeFileSync } from 'fs';
import { sync as MkdirpSync } from 'mkdirp';
import { dirname, resolve } from 'path';
import { Writeable, WriteableBuilder, WriteableBuilderPredicate } from '../Writeable';

// const logger = debug('grafter:domain:WriteToFolder');
const tracer = debug('grafter:trace:domain:WriteToFolder');
export class WriteToFolder extends Writeable implements WriteableBuilder {
	public async CreateAsync(predicate: WriteableBuilderPredicate): Promise<void> {
		tracer('creating `%s`', this.Typedpath);
		MkdirpSync(this.Typedpath);

		const manifestpath = resolve(this.Basepath, 'pack.mcmeta');
		tracer('creating `%s`', manifestpath);
		writeFileSync(manifestpath, JSON.stringify(this.pack.Manifest));

		await predicate(this);
	}

	public Add(path: string, content: string): void {
		const filepath = resolve(this.Typedpath, path);
		const basepath = dirname(filepath);

		MkdirpSync(basepath);
		writeFileSync(filepath, content)
	}

	public Remove(path: string): void {
		const filepath = resolve(this.Typedpath, path);

		unlinkSync(filepath);
		this.RemoveEmptyFolder(filepath);
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
