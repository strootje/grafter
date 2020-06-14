import { GrayMatterFile, read as GrayMatter } from 'gray-matter';
import { basename, resolve, sep } from 'path';
import { register } from 'ts-node';
import { Command } from '../../domain/Command';
import { File, FileType } from '../../domain/File';
import { FunctionFile, FunctionMatter } from '../../domain/files';
import { JsonFile } from '../../domain/files/JsonFile';
import { TagJson } from '../../domain/files/TagFile';
import { Default } from '../../types/Generic';
import { JarHelper } from '../helpers/JarHelper';
import { CommandFactory } from './CommandFactory';

interface Mutator<T extends {}> {
	(input: T): T;
}

export class FileFactory {
	public static async CreateFromFileAsync(jarHelper: JarHelper, folder: string, path: string): Promise<File[]> {
		const fullpath = resolve(folder, path);
		const parts = path.split(sep).join('/').split('/');

		const namespace = parts.shift() as string;
		const type = parts.shift() as FileType;
		const filenameWithExt = parts.join('/');
		const filename = filenameWithExt.substring(0, filenameWithExt.lastIndexOf('.'));

		if (filenameWithExt.match(/^.*\.[jt]s$/)) {
			const mutator = this.GetMutator(fullpath);
			return await this.CreateFromScriptAsync(namespace, type, filename, jarHelper, mutator);
		} else {
			const matter = GrayMatter(fullpath);
			return this.CreateFromMatter(namespace, type, filename, matter);
		}
	}

	public static async CreateFromScriptAsync(namespace: string, type: FileType, filename: string, jarHelper: JarHelper, mutator: Mutator<{}>): Promise<File[]> {
		const matches = await jarHelper.FindFilesAsync(type, filename);
		const keys = Object.keys(matches);

		if (keys.length <= 0) {
			return this.Create(namespace, type, filename, JSON.stringify(mutator({})), {});
		}

		const files: File[] = [];
		for (const key of keys) {
			const created = this.Create(namespace, type, filename.replace(basename(filename), basename(key)), JSON.stringify(mutator(matches[key])), {});
			created.forEach(p => files.push(p));
		}

		return files;
	}

	public static CreateFromMatter(namespace: string, type: FileType, filename: string, matter: GrayMatterFile<string>): File[] {
		return this.Create(namespace, type, filename, matter.content, matter.data);
	}

	public static Create(namespace: string, type: FileType, filename: string, content: string, data: {}): File[] {
		switch (type) {
			case 'functions': return this.CreateFunction(namespace, type, filename, CommandFactory.ParseAll(content.split('\n')), data);
			case 'tags': return this.CreateTag(namespace, type, filename, JSON.parse(content) as TagJson);
			case 'macros': return this.CreateMacro(namespace, type, filename, content, data);
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

	public static CreateMacro(namespace: string, filetype: FileType, filename: string, content: string, data: any): File[] {
		const files: File[] = [];

		if (!!data.item) {
			this.CreateFunction(namespace, 'functions', filename, [
				CommandFactory.CreateGive('@p', data.item as string, {}).
			], {}).forEach(p => files.push(p));
		}

		return files;
	}

	private static CreateJson<T>(namespace: string, filetype: FileType, filename: string, content: T): File[] {
		return [new JsonFile<T>(namespace, 'tags', `${filetype}/${filename}`, content)];
	}

	private static GetMutator(path: string): Mutator<{}> {
		register({ transpileOnly: true });
		delete require.cache[path];

		const mutator = (require(path) as Default<{} | Mutator<{}>>).default;
		return (typeof mutator === 'function') ? (mutator as Mutator<{}>) : () => mutator;
		// return (typeof mutator === 'function') ? mutator : (input: {}) => ({ ...input,  ...mutator });
	}
}
