export type CommandName = 'say' | 'scoreboard';

export abstract class Command {
	public constructor(
		private readonly name: CommandName
	) {
	}

	public get Name(): CommandName { return this.name; }
	public abstract get Args(): string[];
	public get CommandText(): string { return [this.Name, ...this.Args].join(' '); };
}
