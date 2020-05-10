import { Command, CommandName } from '../Command';

export class GenericCommand extends Command {
	public constructor(name: CommandName,
		private readonly args: string[]
	) {
		super(name);
	}

	public get Args(): string[] { return this.args; }
}
