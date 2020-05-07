import { GrayMatterFile, read as GrayMatter } from 'gray-matter';
import { resolve, sep } from 'path';
import { File, FileType } from '../../domain/File';
import { FunctionFile, JsonFile } from '../../domain/files';
import { TagJson } from '../../domain/files/JsonFile';

export class FileFactory {
	public static CreateFromFile(folder: string, path: string): File {
		const fullpath = resolve(folder, path);
		const parts = path.split(sep).join('/').split('/');

		const namespace = parts.shift() as string;
		const type = parts.shift() as FileType;
		const filename = parts.join('/');

		const matter = GrayMatter(fullpath);

		return this.CreateFromMatter(namespace, type, filename, matter);
	}

	public static CreateFromMatter(namespace: string, type: FileType, filename: string, matter: GrayMatterFile<string>): File {
		return this.Create(namespace, type, filename, matter.data, matter.content);
	}

	public static Create(namespace: string, type: FileType, filename: string, data: {}, content: string): File {
		switch (type) {
			case 'functions': return new FunctionFile(namespace, type, filename, data, content);
			default: return new JsonFile(namespace, type, filename, content);
		}
	}

	public static CreateTag(namespace: string, filename: string, content: TagJson): File {
		return new JsonFile(namespace, 'tags', filename, JSON.stringify(content));
	}
}
