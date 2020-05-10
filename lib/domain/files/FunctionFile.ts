import { CommandFactory } from '../../infra/factories/CommandFactory';
import { Command } from '../Command';
import { File, FileType } from '../File';

export interface FunctionMatter {
	tag?: string;
}

export class FunctionFile extends File {
	private readonly commands: Command[];

	constructor(namespace: string, type: FileType, name: string,
		content: string
	) {
		super(namespace, type, name, 'mcfunction');
		this.commands = CommandFactory.ParseAll(content.split('\n'));
	}

	public get Commands(): Command[] { return this.commands; }

	public get Content(): string {
		return this.Commands.map(p => p.CommandText).join('\n');
	}

	public AddCommand(command: Command): void {
		this.commands.push(command);
	}
}
