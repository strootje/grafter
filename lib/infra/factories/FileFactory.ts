import { GrayMatterFile, read as GrayMatter } from 'gray-matter';
import { resolve, sep } from 'path';
import { register } from 'ts-node';
import { Default } from '../../../types/Generic';
import { Command } from '../../domain/Command';
import { File, FileType } from '../../domain/File';
import { FunctionFile, FunctionMatter } from '../../domain/files';
import { JsonFile } from '../../domain/files/JsonFile';
import { TagJson } from '../../domain/files/TagFile';
import { CommandFactory } from './CommandFactory';

export class FileFactory {
	public static async CreateFromFileAsync(folder: string, path: string): Promise<File[]> {
		const fullpath = resolve(folder, path);
		const parts = path.split(sep).join('/').split('/');

		const namespace = parts.shift() as string;
		const type = parts.shift() as FileType;
		const filenameWithExt = parts.join('/');
		const filename = filenameWithExt.substring(0, filenameWithExt.lastIndexOf('.'));

		if (filenameWithExt.match(/^.*\.[jt]s$/)) {
			register({ transpileOnly: true });
			const mod = require(fullpath) as Default<any>;

			let data = mod.default;
			if (typeof data === 'function') {
				data = mod.default();
			}

			return this.Create(namespace, type, filename, JSON.stringify(data), {});
		} else {
			const matter = GrayMatter(fullpath);
			return this.CreateFromMatter(namespace, type, filename, matter);
		}
	}

	public static CreateFromMatter(namespace: string, type: FileType, filename: string, matter: GrayMatterFile<string>): File[] {
		return this.Create(namespace, type, filename, matter.content, matter.data);
	}

	public static Create(namespace: string, type: FileType, filename: string, content: string, data: {}): File[] {
		switch (type) {
			case 'functions': return this.CreateFunction(namespace, type, filename, CommandFactory.ParseAll(content.split('\n')), data);
			case 'tags': return this.CreateTag(namespace, type, filename, JSON.parse(content) as TagJson);
			default: return [new JsonFile<{}>(namespace, type, filename, JSON.parse(content))];
		}
	}

	public static CreateFunction(namespace: string, filetype: FileType, filename: string, content: Command[], data: FunctionMatter): File[] {
		const files: File[] = [];

		const func = new FunctionFile(namespace, filetype, filename, '');
		content.forEach(p => func.AddCommand(p));
		files.push(func);

		if (data.tag) {
			const [tagNamespace, tagName] = data.tag.split(':');
			this.CreateTag(tagNamespace, 'functions', tagName, {
				values: [`${namespace}:${func.Name}`]
			}).map(file => files.push(file));
		}

		return files;
	}

	public static CreateTag(namespace: string, filetype: FileType, filename: string, content: TagJson): File[] {
		return this.CreateJson(namespace, filetype, filename, content);
	}

	private static CreateJson<T>(namespace: string, filetype: FileType, filename: string, content: T): File[] {
		return [new JsonFile<T>(namespace, 'tags', `${filetype}/${filename}`, content)];
	}
}
