import { sync as EmptyDirSync } from 'empty-dir';
import { existsSync, rmdirSync, unlinkSync, writeFileSync } from 'fs';
import { sync as MkdirpSync } from 'mkdirp';
import { dirname, resolve } from 'path';
import { Writer, WriterBuilder, WriterCallback } from './Writer';

export class FolderWriter extends Writer implements WriterBuilder {
	public CreateAsync(callback: WriterCallback): Promise<void> {
		MkdirpSync(this.Typedpath);

		const manifestpath = resolve(this.Basepath, 'pack.mcmeta');
		this.Add(manifestpath, JSON.stringify(this.pack.Manifest));

		return callback(this);
	}

	public Add(filename: string, content: string): void {
		const filepath = resolve(this.Typedpath, filename);
		const basepath = dirname(filepath);

		MkdirpSync(basepath);
		writeFileSync(filepath, content)
	}

	public Delete(filename: string): void {
		const filepath = resolve(this.Typedpath, filename);

		if (existsSync(filepath)) {
			unlinkSync(filepath);
		}

		this.DeleteEmptyFolder(filepath);
	}

	private DeleteEmptyFolder(path: string): void {
		const basepath = dirname(path);

		if (!EmptyDirSync(basepath)) {
			return;
		}

		rmdirSync(basepath);
		this.DeleteEmptyFolder(basepath);
	}
}
