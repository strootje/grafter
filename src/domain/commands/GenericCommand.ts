import { Command } from '../Command';

export class GenericCommand extends Command {
	public constructor(name: string,
		private readonly args: string[]
	) {
		super(name);
	}

	public get Args(): string[] { return this.args; }
}
