import { debug } from 'debug';
import { existsSync } from 'fs';
import { resolve, sep } from 'path';
import { FileType } from '../domain/Changeable';
import { SourceEmpty } from '../domain/core/SourceEmpty';
import { SourceFile } from '../domain/core/SourceFile';
import { InvalidFileTypeError } from '../domain/errors/InvalidFileTypeError';
import { Function } from '../domain/pack/data/Function';
import { Tag } from '../domain/pack/data/Tag';
import { Packable } from '../domain/Packable';
import { Sourceable } from '../domain/Sourceable';
import { WriteableBuilder } from '../domain/Writeable';

const logger = debug('graft:factories:File');
export class FileFactory {
	public static Create(filepath: string, pack: Packable, builder: WriteableBuilder) {
		const [filenamespace, filename, filetype] = this.ParseFileNameAndType(filepath);
		const source = this.GetSource(filepath, pack, builder);

		switch (filetype) {
			case 'functions': return new Function(source, filenamespace, filetype, filename);
			case 'tags': return new Tag(source, filenamespace, filetype, filename);
			default: throw new InvalidFileTypeError(filetype);
		}
	}

	private static ParseFileNameAndType(filepath: string): [string, string, FileType] {
		const parts = filepath.split(sep).join('/').split('/');
		logger('parsing %o', parts);

		const filenamespace = parts.shift() as string;
		const filetype = parts.shift() as FileType;
		const [filename] = parts.join('/').split(':');

		return [filenamespace, filename, filetype];
	}

	private static GetSource(filepath: string, pack: Packable, builder: WriteableBuilder): Sourceable {
		const fullpath = resolve(pack.Folder, filepath);

		if (existsSync(fullpath)) {
			return new SourceFile(pack, filepath, builder);
		} else {
			return new SourceEmpty(pack, filepath, builder);
		}
	}
}
