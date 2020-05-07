import { Command } from '../Command';

export class SayCommand extends Command {
	public constructor(
		private readonly args: string[]
	) {
		super('say');
	}

	public get Args(): string[] { return this.args; }
}
