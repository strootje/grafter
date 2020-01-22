import { sep } from 'path';
import { InvalidFileTypeError } from '../domain/errors/InvalidFileTypeError';
import { Function } from '../domain/pack/data/Function';
import { Tag } from '../domain/pack/data/Tag';
import { FileType, Watchable } from '../domain/Watchable';

export class FileFactory {
	public static Create(filepath: string): Watchable {
		const [filenamespace, filename, filetype] = this.ParseFileNameAndType(filepath);

		switch (filetype) {
			case 'functions': return new Function(filenamespace, filename, filetype, filepath);
			case 'tags': return new Tag(filenamespace, filename, filetype, filepath);
			default: throw new InvalidFileTypeError(filetype);
		}
	}

	private static ParseFileNameAndType(filepath: string): [string, string, FileType] {
		const parts = filepath.split(sep).join('/').split('/');

		const filenamespace = parts.shift() as string;
		const filetype = parts.shift() as FileType;
		const filename = parts.join('/');

		return [filenamespace, filename, filetype];
	}
}
