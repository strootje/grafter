import { CommandFactory } from '../../infra/factories/CommandFactory';
import { FileFactory } from '../../infra/factories/FileFactory';
import { Command } from '../Command';
import { File, FileType } from '../File';

export interface FunctionGrayMatter {
	tag?: string;
}

export class FunctionFile extends File {
	private readonly commands: Command[];

	constructor(namespace: string, type: FileType, name: string,
		private readonly data: FunctionGrayMatter,
		content: string
	) {
		super(namespace, type, name);
		this.commands = CommandFactory.ParseAll(content.split('\n'));
	}

	public get Content(): string {
		return this.commands.map(p => p.CommandText).join('\n');
	}

	public get SubFiles(): File[] {
		const files: File[] = [];

		if (this.data.tag) {
			const [namespace, name] = this.data.tag.split(':');
			files.push(FileFactory.CreateTag(namespace, `${name}.json`, {
				values: [`${this.Namespace}:${this.Name.split('.')[0]}`]
			}));
		}

		return files;
	}
}
