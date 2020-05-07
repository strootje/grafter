export abstract class Command {
	public constructor(
		private readonly name: string
	) {
	}

	public get Name(): string { return this.name; }
	public abstract get Args(): string[];
	public get CommandText(): string { return [this.Name, ...this.Args].join(' '); };
}
